/*
  # Add logo_url to Technology Stack

  1. Changes
    - Add `logo_url` column to `case_study_technologies` table to store technology logos
    - Add `description` column for additional context (optional label like "LLM", "Vector DB", etc.)
  
  2. Notes
    - Uses IF NOT EXISTS to safely add columns
    - Both columns are nullable to support existing data
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_study_technologies' AND column_name = 'logo_url'
  ) THEN
    ALTER TABLE case_study_technologies ADD COLUMN logo_url text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_study_technologies' AND column_name = 'description'
  ) THEN
    ALTER TABLE case_study_technologies ADD COLUMN description text;
  END IF;
END $$;
