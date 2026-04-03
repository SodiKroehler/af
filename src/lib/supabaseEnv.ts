/**
 * Resolve Supabase env vars — supports standard names and alternate dashboard export names.
 * Server routes may use non-NEXT_PUBLIC_* URL; the browser client still needs NEXT_PUBLIC_* for URL.
 */

function pick(...candidates: (string | undefined)[]): string | undefined {
  for (const c of candidates) {
    const t = c?.trim()
    if (t) return t
  }
  return undefined
}

/** Public project URL (browser + server). */
export function getSupabasePublicUrl(): string | undefined {
  return pick(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    // Some teams use a v2-prefixed copy on the server only; expose as NEXT_PUBLIC on Vercel for the client:
    process.env.NEXT_PUBLIC_SUPABASE_v2_SUPABASE_URL,
  )
}

/** Server-only URL fallback when public URL is unset (e.g. only `SUPABASE_v2_SUPABASE_URL` in Vercel). */
export function getSupabaseUrlForServer(): string | undefined {
  return pick(getSupabasePublicUrl(), process.env.SUPABASE_URL, process.env.SUPABASE_v2_SUPABASE_URL)
}

export function getSupabaseAnonKey(): string | undefined {
  return pick(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_v2_SUPABASE_ANON_KEY,
  )
}

export function getSupabaseServiceRoleKey(): string | undefined {
  return pick(
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    process.env.SUPABASE_v2_SUPABASE_SERVICE_ROLE_KEY,
  )
}
