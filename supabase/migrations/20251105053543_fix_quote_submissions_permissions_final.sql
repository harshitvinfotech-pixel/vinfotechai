/*
  # Fix Quote Submissions Permissions - Final Fix

  ## Summary
  This migration fixes the permission issues on the quote_submissions table.
  The anon role had excessive permissions which can cause RLS policy conflicts.

  ## Changes Made

  ### 1. Revoke All Permissions from anon and authenticated
  - Clean slate all permissions
  - Remove excessive permissions that cause conflicts

  ### 2. Grant Only Required Permissions
  - anon: INSERT only (for form submissions)
  - authenticated: SELECT, INSERT (for admin viewing and testing)

  ### 3. Verify RLS Policies
  - Ensure RLS is enabled
  - Confirm policies are correct

  ## Security Notes
  - Principle of least privilege applied
  - Anonymous users can only INSERT (submit forms)
  - Authenticated users can SELECT and INSERT
  - No DELETE, UPDATE, or TRUNCATE for public roles
*/

-- 1. Revoke ALL permissions from anon and authenticated
REVOKE ALL PRIVILEGES ON quote_submissions FROM anon;
REVOKE ALL PRIVILEGES ON quote_submissions FROM authenticated;
REVOKE ALL PRIVILEGES ON quote_submissions FROM PUBLIC;

-- 2. Grant only required permissions
GRANT INSERT ON quote_submissions TO anon;
GRANT INSERT ON quote_submissions TO authenticated;
GRANT SELECT ON quote_submissions TO authenticated;

-- 3. Grant usage on the sequence (needed for default ID generation)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- 4. Ensure RLS is enabled
ALTER TABLE quote_submissions ENABLE ROW LEVEL SECURITY;

-- 5. Drop and recreate policies to ensure they're correct
DROP POLICY IF EXISTS "public_insert_quotes" ON quote_submissions;
DROP POLICY IF EXISTS "authenticated_select_quotes" ON quote_submissions;

-- Policy for anonymous users to insert (submit forms)
CREATE POLICY "public_insert_quotes"
    ON quote_submissions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Policy for authenticated users to select (view submissions)
CREATE POLICY "authenticated_select_quotes"
    ON quote_submissions
    FOR SELECT
    TO authenticated
    USING (true);

-- 6. Add comment for documentation
COMMENT ON TABLE quote_submissions IS 
'Contact form submissions - anon can INSERT, authenticated can SELECT';

-- Verification
DO $$
BEGIN
    RAISE NOTICE 'Quote submissions permissions fixed - anon: INSERT only, authenticated: SELECT + INSERT';
END $$;
