"use client"

// Centralised Supabase client so we only create it once on the client bundle
// It attempts to read the environment variables first using the recommended
// NEXT_PUBLIC_ prefix. For backwards-compatibility with the existing `.env`
// file, it also falls back to the provided REACT_APP_ variables.
import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase environment variables are missing. Please define NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file."
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
