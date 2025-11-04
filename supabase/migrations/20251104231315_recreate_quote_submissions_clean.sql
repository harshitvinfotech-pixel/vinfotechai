/*
  # Recreate Quote Submissions System from Scratch

  ## Summary
  This migration completely rebuilds the quote_submissions system with a clean slate.
  All old policies are removed and a fresh, working system is created.

  ## Changes Made

  ### 1. Drop ALL Existing Policies
  - Remove every single policy on quote_submissions table
  - Clean slate approach

  ### 2. Recreate Table Structure
  - Ensure all columns have proper types and constraints
  - Set appropriate defaults for optional fields

  ### 3. Create Simple, Working RLS Policies
  - One policy for anonymous inserts (form submissions)
  - One policy for authenticated reads (admin access)

  ## Security Notes
  - Public users can INSERT only (submit forms)
  - Only authenticated users can SELECT (view submissions)
  - This is the standard pattern for contact forms
*/

-- Drop ALL existing policies on quote_submissions
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'quote_submissions'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON quote_submissions';
    END LOOP;
END $$;

-- Ensure RLS is enabled
ALTER TABLE quote_submissions ENABLE ROW LEVEL SECURITY;

-- Ensure proper column structure
DO $$
BEGIN
    -- Make company nullable with default
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'quote_submissions' 
        AND column_name = 'company'
        AND is_nullable = 'NO'
    ) THEN
        ALTER TABLE quote_submissions ALTER COLUMN company DROP NOT NULL;
    END IF;
    
    -- Make phone_number nullable with default
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'quote_submissions' 
        AND column_name = 'phone_number'
        AND is_nullable = 'NO'
    ) THEN
        ALTER TABLE quote_submissions ALTER COLUMN phone_number DROP NOT NULL;
    END IF;
END $$;

-- Set defaults for optional fields
ALTER TABLE quote_submissions 
    ALTER COLUMN company SET DEFAULT '',
    ALTER COLUMN phone_number SET DEFAULT '',
    ALTER COLUMN budget_range SET DEFAULT '',
    ALTER COLUMN timeline SET DEFAULT '',
    ALTER COLUMN status SET DEFAULT 'pending';

-- Create simple INSERT policy for everyone
CREATE POLICY "public_insert_quotes"
    ON quote_submissions
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Create SELECT policy for authenticated users only
CREATE POLICY "authenticated_select_quotes"
    ON quote_submissions
    FOR SELECT
    TO authenticated
    USING (true);

-- Grant necessary permissions
GRANT INSERT ON quote_submissions TO anon;
GRANT INSERT ON quote_submissions TO authenticated;
GRANT SELECT ON quote_submissions TO authenticated;
