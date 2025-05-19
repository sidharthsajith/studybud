import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
})

export type Profile = {
  id: string
  username: string
  full_name: string
  avatar_url: string
  language_level: {
    [key: string]: string
  }
  study_preferences: {
    preferred_time: string[]
    subjects: string[]
    learning_style: string[]
  }
  created_at: string
}

export type StudyNote = {
  id: string
  user_id: string
  title: string
  content: string
  tags: string[]
  subject: string
}
