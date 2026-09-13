-- ============================================================================
-- CaliGym fix-registration.sql  (IDEMPOTENT — safe to re-run any number of times)
--
-- Run this once against your LIVE Supabase project:
--   Supabase Dashboard -> SQL Editor -> New query -> paste this file -> Run.
--
-- It reconciles the live database with what src/context/AuthContext.tsx
-- expects, fixing account creation:
--   1. Ensures the profiles columns used by the app exist.
--   2. Creates the missing "Users Insert Own Profile" RLS policy (this is the
--      real blocker: without it, signUp creates the auth user but the browser
--      profile insert is rejected, so the next login fails).
--   3. Ensures public.workout_logs (used by saveWorkout/getWorkouts) exists
--      with its RLS policies.
--   4. Ensures the handle_new_user() trigger auto-creates a profile row on
--      every new signup (backstop so a client-side RLS hiccup can never leave
--      an auth user without a profile).
--   5. Backfills a profile row for any EXISTING auth user who registered while
--      the database was broken (stuck accounts).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1) profiles — ensure every column AuthContext.tsx reads/writes exists.
--    (ADD COLUMN IF NOT EXISTS is additive and never drops data.)
-- ----------------------------------------------------------------------------
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS xp INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS streak INTEGER NOT NULL DEFAULT 0;

-- ----------------------------------------------------------------------------
-- 2) RLS policies on profiles — the three the app depends on.
-- ----------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Profiles Read" ON public.profiles;
CREATE POLICY "Public Profiles Read" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users Insert Own Profile" ON public.profiles;
CREATE POLICY "Users Insert Own Profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users Update Own Profile" ON public.profiles;
CREATE POLICY "Users Update Own Profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- 3) workout_logs — table + RLS policies used by AuthContext.saveWorkout /
--    getWorkout / getWorkouts and by scripts/auth-smoke.ts.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  workout_data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, date)
);

ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users Select Own Workout Logs" ON public.workout_logs;
CREATE POLICY "Users Select Own Workout Logs" ON public.workout_logs
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users Insert Own Workout Logs" ON public.workout_logs;
CREATE POLICY "Users Insert Own Workout Logs" ON public.workout_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users Update Own Workout Logs" ON public.workout_logs;
CREATE POLICY "Users Update Own Workout Logs" ON public.workout_logs
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users Delete Own Workout Logs" ON public.workout_logs;
CREATE POLICY "Users Delete Own Workout Logs" ON public.workout_logs
  FOR DELETE USING (auth.uid() = user_id);
-- ----------------------------------------------------------------------------
-- 4) handle_new_user() trigger — auto-creates a profiles row on every signup.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'username', ''),
      split_part(NEW.email, '@', 1)
    ),
    COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'name', ''),
      NULLIF(NEW.raw_user_meta_data->>'username', ''),
      split_part(NEW.email, '@', 1)
    ),
    'user'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 5) Backfill for STUCK accounts: anyone who registered while the INSERT
--    policy/trigger was missing now has an auth.users row but no profile row.
--    After the policy above exists this insert succeeds for every such user.
-- ----------------------------------------------------------------------------
INSERT INTO public.profiles (id, email, username, name, role)
SELECT
  u.id,
  u.email::text,
  COALESCE(
    NULLIF(u.raw_user_meta_data->>'username', ''),
    split_part(u.email::text, '@', 1)
  ),
  COALESCE(
    NULLIF(u.raw_user_meta_data->>'name', ''),
    NULLIF(u.raw_user_meta_data->>'username', ''),
    split_part(u.email::text, '@', 1)
  ),
  'user'
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;