/*
  # Fix Quote Submissions RLS Policy

  1. Changes
    - Drop existing restrictive INSERT policy
    - Create new permissive INSERT policy that allows anonymous users to submit quotes
    - Ensure the policy properly handles all required fields
  
  2. Security
    - Allow anonymous (anon) and authenticated users to INSERT
    - Keep authenticated users able to SELECT all submissions
    - No restrictions on the data being inserted (public form submissions)
*/

DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'quote_submissions' 
    AND policyname = 'Anyone can submit a quote'
  ) THEN
    DROP POLICY "Anyone can submit a quote" ON quote_submissions;
  END IF;
END $$;

CREATE POLICY "Allow public quote submissions"
  ON quote_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);