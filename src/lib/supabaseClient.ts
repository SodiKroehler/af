// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Placeholders keep `next build` working without .env; real deploys need the two NEXT_PUBLIC_* vars below.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
