CREATE OR REPLACE FUNCTION create_profiles_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the profiles table exists
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles'
  ) THEN
    -- Create the profiles table
    CREATE TABLE public.profiles (
      id UUID REFERENCES auth.users(id) PRIMARY KEY,
      username TEXT UNIQUE,
      full_name TEXT,
      avatar_url TEXT,
      language_level JSONB DEFAULT '{}'::JSONB,
      study_preferences JSONB DEFAULT '{"preferred_time": [], "subjects": [], "learning_style": []}'::JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    -- Enable RLS
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Users can view their own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);

    CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

    CREATE POLICY "Users can insert their own profile" 
    ON public.profiles FOR INSERT 
    WITH CHECK (auth.uid() = id);
  END IF;
END;
$$;
