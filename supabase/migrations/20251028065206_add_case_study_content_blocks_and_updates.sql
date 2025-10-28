/*
  # Case Study Content Management System Migration

  ## Overview
  This migration enhances the case study system to support dynamic, flexible content management
  while maintaining a consistent page structure across all case studies.

  ## Changes Made

  ### 1. Case Studies Table Updates
  - Add `hero_description` - Extended description for hero section
  - Add `hero_background_image` - Full-width background image URL for hero
  - Add `meta_title` - SEO meta title (optional, defaults to title)
  - Add `meta_description` - SEO meta description
  - Add `og_image` - Open Graph image for social sharing

  ### 2. Case Study Images Table Enhancement
  - Add `type` column to differentiate between 'gallery' and 'content' images
  - Add `alt_text` for accessibility
  - Update to support both gallery images and inline content images

  ### 3. New Case Study Content Blocks Table
  - Creates flexible content block system
  - Supports multiple block types: text, image, phone_mockup, diagram, metrics, timeline, features, two_column
  - Uses JSONB for flexible content storage per block type
  - Ordered by display_order for custom arrangement

  ## Block Types Structure

  ### text
  ```json
  {
    "heading": "Section Title",
    "content": "<p>Rich HTML content</p>",
    "alignment": "left"
  }
  ```

  ### image
  ```json
  {
    "image_url": "https://...",
    "caption": "Image description",
    "size": "full"
  }
  ```

  ### phone_mockup
  ```json
  {
    "app_name": "App Name",
    "messages": [
      {"role": "user", "content": "Hello"},
      {"role": "assistant", "content": "Hi there!"}
    ]
  }
  ```

  ### metrics
  - Uses case_study_metrics table data

  ### timeline
  - Uses case_study_timeline table data

  ### features
  - Uses case_study_features table data

  ### two_column
  ```json
  {
    "left_content": "<p>Left column HTML</p>",
    "right_content": "<p>Right column HTML</p>",
    "image_position": "right"
  }
  ```

  ## Security
  - All new tables have RLS enabled
  - Public read access for published content
  - No public write access (admin-only via service role)
*/

-- Add new columns to case_studies table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_studies' AND column_name = 'hero_description'
  ) THEN
    ALTER TABLE case_studies ADD COLUMN hero_description TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_studies' AND column_name = 'hero_background_image'
  ) THEN
    ALTER TABLE case_studies ADD COLUMN hero_background_image TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_studies' AND column_name = 'meta_title'
  ) THEN
    ALTER TABLE case_studies ADD COLUMN meta_title TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_studies' AND column_name = 'meta_description'
  ) THEN
    ALTER TABLE case_studies ADD COLUMN meta_description TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_studies' AND column_name = 'og_image'
  ) THEN
    ALTER TABLE case_studies ADD COLUMN og_image TEXT;
  END IF;
END $$;

-- Enhance case_study_images table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_study_images' AND column_name = 'type'
  ) THEN
    ALTER TABLE case_study_images ADD COLUMN type TEXT DEFAULT 'gallery';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_study_images' AND column_name = 'alt_text'
  ) THEN
    ALTER TABLE case_study_images ADD COLUMN alt_text TEXT;
  END IF;
END $$;

-- Add constraint for type column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'case_study_images_type_check'
  ) THEN
    ALTER TABLE case_study_images 
    ADD CONSTRAINT case_study_images_type_check 
    CHECK (type IN ('gallery', 'content'));
  END IF;
END $$;

-- Create case_study_content_blocks table
CREATE TABLE IF NOT EXISTS case_study_content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id UUID NOT NULL REFERENCES case_studies(id) ON DELETE CASCADE,
  block_type TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add constraint for block_type
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'case_study_content_blocks_block_type_check'
  ) THEN
    ALTER TABLE case_study_content_blocks 
    ADD CONSTRAINT case_study_content_blocks_block_type_check 
    CHECK (block_type IN ('text', 'image', 'phone_mockup', 'diagram', 'metrics', 'timeline', 'features', 'two_column'));
  END IF;
END $$;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_case_study_content_blocks_case_study_id 
  ON case_study_content_blocks(case_study_id);

CREATE INDEX IF NOT EXISTS idx_case_study_content_blocks_display_order 
  ON case_study_content_blocks(case_study_id, display_order);

-- Enable RLS on case_study_content_blocks
ALTER TABLE case_study_content_blocks ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Content blocks are publicly readable" ON case_study_content_blocks;

-- Allow public read access to content blocks
CREATE POLICY "Content blocks are publicly readable"
  ON case_study_content_blocks
  FOR SELECT
  TO public
  USING (true);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_case_study_content_blocks_updated_at ON case_study_content_blocks;
CREATE TRIGGER update_case_study_content_blocks_updated_at
  BEFORE UPDATE ON case_study_content_blocks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update existing case_study_images to default type 'gallery'
UPDATE case_study_images 
SET type = 'gallery' 
WHERE type IS NULL;

-- Add comment for documentation
COMMENT ON TABLE case_study_content_blocks IS 'Flexible content blocks for case study detail pages. Each block can be of different types (text, image, phone_mockup, etc.) and contains its specific data in the JSONB content field.';

COMMENT ON COLUMN case_study_content_blocks.block_type IS 'Type of content block: text, image, phone_mockup, diagram, metrics, timeline, features, two_column';

COMMENT ON COLUMN case_study_content_blocks.content IS 'JSONB field containing block-specific data structure. Schema varies by block_type.';

COMMENT ON COLUMN case_study_content_blocks.display_order IS 'Order in which blocks should be displayed on the case study detail page. Lower numbers appear first.';