// Browser-side Supabase client (cookie-based session).
"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

function isPlaceholder(value: string): boolean {
  const v = (value || "").trim().toLowerCase();
  if (!v) return true;
  const tokens = ["your-project", "your-anon-key", "placeholder", "example"];
  if (tokens.some((t) => v.includes(t))) return true;
  return v.length < 10;
}

export function getMissingSupabaseEnv(): string[] {
  const missing: string[] = [];
  if (isPlaceholder(process.env.NEXT_PUBLIC_SUPABASE_URL || ""))
    missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (isPlaceholder(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""))
    missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return missing;
}

export function isSupabaseConfigured(): boolean {
  return getMissingSupabaseEnv().length === 0;
}

export function getSupabaseBrowserClient(): SupabaseClient {
  if (cached) return cached;
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();
  if (isPlaceholder(url) || isPlaceholder(key)) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  cached = createBrowserClient(url, key);
  return cached;
}
