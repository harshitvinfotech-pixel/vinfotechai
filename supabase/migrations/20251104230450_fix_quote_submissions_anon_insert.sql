/*
  # Fix Quote Submissions RLS Policy for Anonymous Users

  ## Summary
  This migration fixes the quote_submissions table RLS policy to allow anonymous users
  (using the anon role) to submit quote requests through the form.

  ## Changes Made

  ### 1. Drop Existing Insert Policy
  - Remove the current public insert policy

  ### 2. Create New Policy for Anonymous Role
  - Create a new policy that explicitly targets the `anon` role
  - This is the role used by Supabase client when not authenticated
  - Allows INSERT operations without restrictions

  ## Security Notes
  - INSERT-only policy for form submissions (appropriate for contact forms)
  - No SELECT policy for anon users (prevents reading other submissions)
  - Authenticated users can still view submissions via existing policy
*/

-- Drop existing insert policy
DROP POLICY IF EXISTS "Allow anonymous quote submissions" ON quote_submissions;

-- Create new policy specifically for anon role
CREATE POLICY "Enable insert for anon role"
  ON quote_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also ensure authenticated users can insert (for future admin features)
CREATE POLICY "Enable insert for authenticated users"
  ON quote_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
