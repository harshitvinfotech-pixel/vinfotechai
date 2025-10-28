/*
  # Fix Security and Performance Issues

  ## Summary
  This migration addresses security advisories and performance issues identified in the database.

  ## Changes Made

  ### 1. Add Missing Indexes for Foreign Keys
  - Add index on `case_study_technologies.case_study_id`
  - Add index on `case_study_timeline.case_study_id`
  These indexes improve JOIN performance and foreign key constraint checks.

  ### 2. Remove Unused Indexes on blogs table
  - Drop `idx_blogs_slug` (slug already has unique constraint which creates an index)
  - Drop `idx_blogs_category_id` (not actively used)
  - Drop `idx_blogs_is_published` (not actively used)
  - Drop `idx_blogs_display_order` (not actively used)

  ### 3. Fix Function Search Path Security
  - Set explicit search_path for `increment_question_clicks` function
  - Set explicit search_path for `update_updated_at_column` function
  This prevents potential security issues from search_path manipulation.

  ## Security Notes
  - Foreign key indexes improve query performance and database integrity
  - Fixed search_path prevents SQL injection via search_path manipulation
  - Removed unused indexes reduces maintenance overhead
*/

-- =====================================================
-- 1. ADD MISSING FOREIGN KEY INDEXES
-- =====================================================

-- Index for case_study_technologies foreign key
CREATE INDEX IF NOT EXISTS idx_case_study_technologies_case_study_id 
  ON case_study_technologies(case_study_id);

-- Index for case_study_timeline foreign key
CREATE INDEX IF NOT EXISTS idx_case_study_timeline_case_study_id 
  ON case_study_timeline(case_study_id);

-- =====================================================
-- 2. REMOVE UNUSED INDEXES
-- =====================================================

-- Drop unused blog indexes
DROP INDEX IF EXISTS idx_blogs_slug;
DROP INDEX IF EXISTS idx_blogs_category_id;
DROP INDEX IF EXISTS idx_blogs_is_published;
DROP INDEX IF EXISTS idx_blogs_display_order;

-- =====================================================
-- 3. FIX FUNCTION SEARCH PATH SECURITY
-- =====================================================

-- Recreate increment_question_clicks with secure search_path
DROP FUNCTION IF EXISTS increment_question_clicks(uuid);

CREATE OR REPLACE FUNCTION increment_question_clicks(question_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE suggested_questions
  SET click_count = click_count + 1
  WHERE id = question_id;
END;
$$;

-- Recreate update_updated_at_column with secure search_path
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate triggers that use update_updated_at_column
DROP TRIGGER IF EXISTS update_case_studies_updated_at ON case_studies;
CREATE TRIGGER update_case_studies_updated_at
  BEFORE UPDATE ON case_studies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_knowledge_base_updated_at ON knowledge_base;
CREATE TRIGGER update_knowledge_base_updated_at
  BEFORE UPDATE ON knowledge_base
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_categories_updated_at ON blog_categories;
CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VERIFICATION COMMENTS
-- =====================================================

/*
  Verification Steps:
  1. Foreign key indexes created for better JOIN performance
  2. Unused indexes removed to reduce maintenance overhead
  3. Functions now have explicit search_path = public, pg_temp
  4. All triggers recreated with the secure functions
  
  Note on Anonymous Access Policies:
  The anonymous access policies are intentional for the quote_submissions table
  as this is a public contact form. This is a valid use case and the warnings
  can be safely acknowledged.
*/
