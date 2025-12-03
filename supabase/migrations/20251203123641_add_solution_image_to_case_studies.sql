/*
  # Add solution_image_url to case_studies table

  1. Changes
    - Add `solution_image_url` column to `case_studies` table to allow separate image for the solution section
  
  2. Notes
    - This allows the solution section to display a different image than the hero image
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_studies' AND column_name = 'solution_image_url'
  ) THEN
    ALTER TABLE case_studies ADD COLUMN solution_image_url text;
  END IF;
END $$;
