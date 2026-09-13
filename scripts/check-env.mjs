#!/usr/bin/env node
/**
 * CaliGym environment diagnostic.
 *
 * Why this exists: the #1 cause of "Authentication is not configured" /
 * "Supabase is not responding" on this project is .env.local still holding the
 * placeholder values from .env.example. This script tells you exactly which
 * variable is bad, what a real value looks like, and where to copy it from.
 *
 * Usage:  npm run check:env       (or: node scripts/check-env.mjs)
 * Exit code 0 = everything looks real; 1 = something needs fixing.
 */
import fs from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();
const envLocalPath = path.join(cwd, '.env.local');

/** Parse KEY=value lines from .env.local (also picks up inherited process.env). */
const values = { ...process.env };
try {
  const raw = fs.readFileSync(envLocalPath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && m[1] && m[2] !== undefined) values[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch {
  console.log(`WARN: could not read ${envLocalPath} — checking process.env only.`);
}

const PLACEHOLDER = /your-|your_|placeholder|example|change-me|^xxx/i;
const looksPlaceholder = (v) => !v || v.length < 10 || PLACEHOLDER.test(v);

const checks = [
  {
    name: 'NEXT_PUBLIC_SUPABASE_URL',
    required: true,
    valid: (v) => /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(v),
    where: 'Supabase Dashboard -> Project Settings -> API -> Project URL',
    example: 'https://abcdefghijklm.supabase.co',
  },
  {
    name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    required: true,
    valid: (v) => v.length > 30 && /^eyJ/.test(v),
    where: 'Supabase Dashboard -> Project Settings -> API -> anon / publishable key',
    example: 'eyJhbGciOiJIUzI1NiIs... (long JWT starting with eyJ)',
  },
  {
    name: 'SUPABASE_SERVICE_ROLE_KEY',
    required: false,
    hint: 'Only needed for username login + scripts/seed.ts + the smoke test.',
    valid: (v) => v.length > 30 && /^eyJ/.test(v),
    where: 'Supabase Dashboard -> Project Settings -> API -> service_role key (SECRET — server-only, never ship to the browser)',
    example: 'eyJhbGciOiJIUzI1NiIs... (long JWT starting with eyJ)',
  },
  {
    name: 'GEMINI_API_KEY',
    required: false,
    hint: 'Only needed for the AI coach (/api/chat). Get one at https://aistudio.google.com/apikey',
    valid: (v) => v.length > 10 && !looksPlaceholder(v),
    where: 'https://aistudio.google.com/apikey',
    example: 'AIzaSyD... (usually starts with AIza)',
  },
];

console.log(`CaliGym env check — reading ${envLocalPath}\n`);
let failures = 0;

for (const c of checks) {
  const v = (values[c.name] || '').trim();
  const missing = !v;
  const placeholder = !missing && looksPlaceholder(v);
  const invalid = !missing && !placeholder && !c.valid(v);
  const ok = !missing && !placeholder && !invalid;

  if (ok) {
    console.log(`PASS  ${c.name} = <set:${v.length} chars>`);
  } else {
    failures += 1;
    const reasons = [
      missing ? 'MISSING' : null,
      placeholder ? 'PLACEHOLDER (still the sample value from .env.example)' : null,
      invalid ? 'INVALID FORMAT' : null,
    ].filter(Boolean);
    console.log(`FAIL  ${c.name} — ${reasons.join(', ')}`);
    if (c.hint) console.log(`        ${c.hint}`);
    console.log(`        Copy from: ${c.where}`);
    console.log(`        e.g. ${c.example}`);
  }
}

console.log('');
if (failures === 0) {
  console.log('All environment variables look real. You can now run:  npm run smoke:auth');
  process.exit(0);
}
console.error(
  `${failures} variable(s) need fixing.\n` +
    '1. Open https://supabase.com/dashboard -> your project -> Project Settings -> API.\n' +
    '2. Copy the real Project URL and anon/publishable key into .env.local.\n' +
    '3. In Vercel: Project -> Settings -> Environment Variables (Production) — do the same there,\n' +
    '   then redeploy. Local: restart `npm run dev` after editing .env.local.\n' +
    '4. After the live DB already has the policies/trigger (run supabase/fix-registration.sql in\n' +
    '   the Supabase SQL editor), verify with:  npm run smoke:auth',
);
process.exit(1);