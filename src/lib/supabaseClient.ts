// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import { getSupabaseAnonKey, getSupabasePublicUrl } from '@lib/supabaseEnv'

// Non-empty placeholders allow `next build` without .env; real requests need env set (see supabaseEnv).
const supabaseUrl = getSupabasePublicUrl() || 'https://placeholder.supabase.co'
const supabaseAnonKey = getSupabaseAnonKey() || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
