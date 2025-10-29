/*
  # Add overview_image_url to case_studies

  1. Changes
    - Add `overview_image_url` column to `case_studies` table
    - This field allows case studies to have a custom image in the overview section
    - If not provided, the overview section will show a default chat demo interface

  2. Notes
    - Column is optional (nullable)
    - Stores a URL string pointing to the overview image
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_studies' AND column_name = 'overview_image_url'
  ) THEN
    ALTER TABLE case_studies ADD COLUMN overview_image_url text;
  END IF;
END $$;