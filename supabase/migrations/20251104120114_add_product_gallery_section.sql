/*
  # Add Product Gallery Section to Case Studies

  1. New Table
    - `case_study_gallery_images`
      - `id` (uuid, primary key)
      - `case_study_id` (uuid, foreign key to case_studies)
      - `image_url` (text) - URL to the gallery image
      - `caption` (text, optional) - Image caption or description
      - `order_index` (integer) - Display order in the gallery
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on the table
    - Add policy for public read access to gallery images

  3. Performance
    - Add indexes on case_study_id and order_index for efficient queries
*/

-- Create case_study_gallery_images table
CREATE TABLE IF NOT EXISTS case_study_gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id uuid REFERENCES case_studies(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  caption text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE case_study_gallery_images ENABLE ROW LEVEL SECURITY;

-- RLS Policy for public read access
CREATE POLICY "Anyone can view gallery images"
  ON case_study_gallery_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_gallery_images_case_study ON case_study_gallery_images(case_study_id);
CREATE INDEX IF NOT EXISTS idx_gallery_images_order ON case_study_gallery_images(order_index);