// Server-side Supabase helpers. Never import service-role keys here.
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

function isPlaceholder(value: string): boolean {
  const v = (value || "").trim().toLowerCase();
  if (!v) return true;
  const tokens = ["your-project", "your-anon-key", "placeholder", "example"];
  if (tokens.some((t) => v.includes(t))) return true;
  return v.length < 10;
}

export async function getSupabaseServerClient(): Promise<SupabaseClient> {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();
  if (isPlaceholder(url) || isPlaceholder(key)) {
    throw new Error("Supabase is not configured on the server.");
  }
  const store = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (pairs) => {
        pairs.forEach(({ name, value, options }) => {
          try {
            store.set(name, value, options);
          } catch {
            // Read-only context (e.g. Server Component) — safe to ignore.
          }
        });
      },
    },
  });
}

export async function getCurrentUserId(
  supabase?: SupabaseClient
): Promise<string | null> {
  const client = supabase ?? (await getSupabaseServerClient());
  const { data } = await client.auth.getUser();
  return data?.user?.id ?? null;
}
