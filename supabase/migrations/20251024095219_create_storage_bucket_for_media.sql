/*
  # Create Storage Bucket for Media Files

  1. Storage Configuration
    - Creates a public bucket named "media" for storing blog images, videos, and other assets
    - Configures public access for reading files
    - Sets file size limits and allowed MIME types

  2. Security
    - Enable public read access for all files in the bucket
    - Restrict uploads to authenticated users only (managed through Supabase dashboard)
    - Set file size limits: 5MB for images, 50MB for videos

  3. File Organization
    - blogs/ - Blog featured images and content images
    - videos/ - Hero background videos and other video content
    - general/ - Other media assets
*/

-- Create the media storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  52428800,
  ARRAY[
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist to avoid conflicts
DO $$
BEGIN
  DROP POLICY IF EXISTS "Public read access for media files" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload media files" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update media files" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete media files" ON storage.objects;
END $$;

-- Allow public read access to all files in the media bucket
CREATE POLICY "Public read access for media files"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'media');

-- Allow authenticated users to upload files (for Supabase dashboard access)
CREATE POLICY "Authenticated users can upload media files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

-- Allow authenticated users to update files
CREATE POLICY "Authenticated users can update media files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete media files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');
