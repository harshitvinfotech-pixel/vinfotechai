/*
  # Add Overview Bullets to Case Studies

  1. Changes
    - Add `overview_bullets` column to `case_studies` table (array of text)
    - This will store key bullet points displayed in the expanded card view
    
  2. Notes
    - Uses text array for flexible bullet point storage
    - Defaults to empty array if not provided
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_studies' AND column_name = 'overview_bullets'
  ) THEN
    ALTER TABLE case_studies ADD COLUMN overview_bullets text[] DEFAULT '{}';
  END IF;
END $$;
