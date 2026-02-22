
-- Create saved_profiles table
CREATE TABLE public.saved_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  profile_name TEXT NOT NULL DEFAULT 'My Profile',
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  postcode TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  experience JSONB NOT NULL DEFAULT '[]'::jsonb,
  education JSONB NOT NULL DEFAULT '[]'::jsonb,
  skills TEXT NOT NULL DEFAULT '',
  certifications TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profiles"
  ON public.saved_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profiles"
  ON public.saved_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profiles"
  ON public.saved_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profiles"
  ON public.saved_profiles FOR DELETE
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_saved_profiles_updated_at
  BEFORE UPDATE ON public.saved_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
