/*
  # Add Phone Number to Quote Submissions

  1. Changes
    - Add `phone_number` column to `quote_submissions` table
    - Phone number is required for contact purposes
    - Update existing null values to empty string for consistency
  
  2. Notes
    - This migration adds phone number support to the quote submission form
    - Budget range and timeline fields remain in the table for historical data
    - New submissions will use the simplified 5-field format
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_submissions' AND column_name = 'phone_number'
  ) THEN
    ALTER TABLE quote_submissions ADD COLUMN phone_number text NOT NULL DEFAULT '';
  END IF;
END $$;