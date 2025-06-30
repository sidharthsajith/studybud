-- Create flashcards table
CREATE TABLE IF NOT EXISTS public.flashcards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  note_id UUID REFERENCES public.notes(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Users can view their own flashcards" 
  ON public.flashcards
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own flashcards"
  ON public.flashcards
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own flashcards"
  ON public.flashcards
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own flashcards"
  ON public.flashcards
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_flashcards_user_id ON public.flashcards(user_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_note_id ON public.flashcards(note_id);
