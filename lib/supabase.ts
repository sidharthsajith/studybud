import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
  created_at: string
  updated_at: string
  is_public: boolean
}

export type Flashcard = {
  id: string
  user_id: string
  front: string
  back: string
  set_id: string
  last_reviewed: string
  next_review: string
  ease_factor: number
  interval: number
  created_at: string
}

export type FlashcardSet = {
  id: string
  user_id: string
  title: string
  description: string
  subject: string
  tags: string[]
  card_count: number
  created_at: string
  updated_at: string
  is_public: boolean
}

export type StudyGroup = {
  id: string
  name: string
  description: string
  subject: string
  created_by: string
  created_at: string
  updated_at: string
  members_count: number
  is_private: boolean
}

export type StudySession = {
  id: string
  user_id: string
  subject: string
  duration: number
  start_time: string
  end_time: string
  notes: string
  productivity_rating: number
  created_at: string
}

export type LanguagePractice = {
  id: string
  user_id: string
  language: string
  content: string
  translation: string
  pronunciation_score: number
  grammar_score: number
  vocabulary_level: string
  created_at: string
}

export type ResearchPaper = {
  id: string
  user_id: string
  title: string
  authors: string[]
  publication: string
  year: string
  abstract: string
  file_url: string
  notes: string
  tags: string[]
  created_at: string
}
