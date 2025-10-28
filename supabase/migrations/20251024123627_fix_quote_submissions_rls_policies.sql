/*
  # Fix Quote Submissions RLS Policies

  1. Changes
    - Drop all existing policies on quote_submissions table
    - Create new policy to allow public inserts (for anonymous form submissions)
    - Create policy to allow authenticated users to insert
    - Optional: Create policy to allow reading submissions for confirmation
  
  2. Security
    - Enable INSERT for both anon and authenticated roles
    - This allows the quote form to accept submissions from any user
*/

-- Drop all existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public inserts" ON quote_submissions;
DROP POLICY IF EXISTS "Allow all inserts" ON quote_submissions;
DROP POLICY IF EXISTS "Enable insert for all users" ON quote_submissions;
DROP POLICY IF EXISTS "Enable insert for anon users" ON quote_submissions;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON quote_submissions;
DROP POLICY IF EXISTS "Allow public quote submissions" ON quote_submissions;

-- Create policy to allow anonymous users to insert quote submissions
CREATE POLICY "Enable insert for anon users"
  ON quote_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to insert quote submissions
CREATE POLICY "Enable insert for authenticated users"
  ON quote_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow public users to insert (covers both anon and authenticated)
CREATE POLICY "Enable insert for public"
  ON quote_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);
