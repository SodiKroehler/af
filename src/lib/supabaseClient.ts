// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Non-empty placeholders allow `next build` without .env; real requests need Vercel/local env set.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
