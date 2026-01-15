/*
  # Fix Missing Case Study Tables

  ## Summary
  This migration creates the missing tables that are referenced in the application code
  but don't exist in the database.

  ## Tables Created
  
  ### 1. case_study_content_blocks
  - Flexible content block system for case study detail pages
  - Supports various block types (text, image, phone_mockup, etc.)
  - Uses JSONB for flexible content storage
  
  ### 2. case_study_features
  - Stores feature highlights for each case study
  - Supports icon, title, and description
  
  ### 3. case_study_images
  - Stores images associated with case studies
  - Supports both gallery and content images
  - Includes alt text for accessibility

  ## Security
  - All tables have RLS enabled
  - Public read access for published content
  - No public write access
*/

-- =====================================================
-- 1. CREATE case_study_content_blocks TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS case_study_content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id UUID NOT NULL REFERENCES case_studies(id) ON DELETE CASCADE,
  block_type TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT case_study_content_blocks_block_type_check 
    CHECK (block_type IN ('text', 'image', 'phone_mockup', 'diagram', 'metrics', 'timeline', 'features', 'two_column'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_case_study_content_blocks_display_order 
  ON case_study_content_blocks(case_study_id, display_order);

-- Enable RLS
ALTER TABLE case_study_content_blocks ENABLE ROW LEVEL SECURITY;

-- Allow public read access
DROP POLICY IF EXISTS "Content blocks are publicly readable" ON case_study_content_blocks;
CREATE POLICY "Content blocks are publicly readable"
  ON case_study_content_blocks
  FOR SELECT
  TO public
  USING (true);

-- Add updated_at trigger
DROP TRIGGER IF EXISTS update_case_study_content_blocks_updated_at ON case_study_content_blocks;
CREATE TRIGGER update_case_study_content_blocks_updated_at
  BEFORE UPDATE ON case_study_content_blocks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 2. CREATE case_study_features TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS case_study_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id UUID NOT NULL REFERENCES case_studies(id) ON DELETE CASCADE,
  icon TEXT,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_case_study_features_case_study_id 
  ON case_study_features(case_study_id, display_order);

-- Enable RLS
ALTER TABLE case_study_features ENABLE ROW LEVEL SECURITY;

-- Allow public read access
DROP POLICY IF EXISTS "Features are publicly readable" ON case_study_features;
CREATE POLICY "Features are publicly readable"
  ON case_study_features
  FOR SELECT
  TO public
  USING (true);

-- =====================================================
-- 3. CREATE case_study_images TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS case_study_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id UUID NOT NULL REFERENCES case_studies(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  alt_text TEXT,
  type TEXT DEFAULT 'gallery',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT case_study_images_type_check 
    CHECK (type IN ('gallery', 'content'))
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_case_study_images_case_study_id 
  ON case_study_images(case_study_id, display_order);

-- Enable RLS
ALTER TABLE case_study_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access
DROP POLICY IF EXISTS "Images are publicly readable" ON case_study_images;
CREATE POLICY "Images are publicly readable"
  ON case_study_images
  FOR SELECT
  TO public
  USING (true);

-- Add updated_at trigger
DROP TRIGGER IF EXISTS update_case_study_images_updated_at ON case_study_images;
CREATE TRIGGER update_case_study_images_updated_at
  BEFORE UPDATE ON case_study_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE case_study_content_blocks IS 'Flexible content blocks for case study detail pages. Each block can be of different types and contains its specific data in the JSONB content field.';
COMMENT ON TABLE case_study_features IS 'Feature highlights for each case study with icon, title, and description.';
COMMENT ON TABLE case_study_images IS 'Images associated with case studies, supporting both gallery and inline content images.';
