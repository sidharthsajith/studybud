-- Create the images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to the images bucket
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow authenticated users to upload to the images bucket
CREATE POLICY "Authenticated Users Can Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- Allow users to update and delete their own objects
CREATE POLICY "Users Can Update Their Own Objects"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'images' AND auth.uid() = owner);

CREATE POLICY "Users Can Delete Their Own Objects"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'images' AND auth.uid() = owner);

-- Create a special folder for public/anonymous uploads
CREATE POLICY "Allow Public Uploads to Public Folder"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'images' AND (storage.foldername(name))[1] = 'public');

-- Allow service role to bypass all policies
CREATE POLICY "Service Role Has Full Access"
ON storage.objects
USING (auth.role() = 'service_role');
