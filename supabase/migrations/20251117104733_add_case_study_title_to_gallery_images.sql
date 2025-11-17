/*
  # Add case study title to gallery images table

  ## Changes
  1. Add `case_study_title` column to `case_study_gallery_images` table
     - Type: text
     - Makes it clear which case study the images belong to without joining
     - Populated from the related case_study title
  
  2. Backfill existing records with case study titles
  
  3. Add index on case_study_title for faster lookups

  ## Notes
  - This is a denormalized field for improved clarity and query performance
  - The column is nullable to allow flexible data entry
*/

-- Add case_study_title column to case_study_gallery_images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_study_gallery_images' AND column_name = 'case_study_title'
  ) THEN
    ALTER TABLE case_study_gallery_images 
    ADD COLUMN case_study_title text;
  END IF;
END $$;

-- Backfill existing records with case study titles
UPDATE case_study_gallery_images csg
SET case_study_title = cs.title
FROM case_studies cs
WHERE csg.case_study_id = cs.id
  AND csg.case_study_title IS NULL;

-- Add index for faster lookups by case study title
CREATE INDEX IF NOT EXISTS idx_case_study_gallery_images_title 
ON case_study_gallery_images(case_study_title);

-- Add comment explaining the column
COMMENT ON COLUMN case_study_gallery_images.case_study_title IS 'Denormalized case study title for clarity when viewing gallery images';