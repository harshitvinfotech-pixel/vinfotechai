/*
  # Fix RLS Policy for Quote Submissions

  1. Changes
    - Drop existing INSERT policy
    - Create new policy that explicitly allows anonymous insertions
    - Ensure anon role can insert without restrictions
  
  2. Security
    - Allow anonymous users to submit quotes (public form)
    - Keep SELECT restricted to authenticated users only
*/

-- Drop existing insert policy
DROP POLICY IF EXISTS "Allow public quote submissions" ON quote_submissions;

-- Create a new policy that allows anonymous insertions
CREATE POLICY "Enable insert for anon users"
  ON quote_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow authenticated users to insert
CREATE POLICY "Enable insert for authenticated users"
  ON quote_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);