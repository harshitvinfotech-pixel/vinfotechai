/*
  # Add is_featured column to blogs table

  1. Changes
    - Add `is_featured` boolean column to blogs table
    - Set default value to false
    - Only one blog should be featured at a time (enforced in application logic)
  
  2. Notes
    - This column will be used to mark a blog as featured on the blog listing page
    - Frontend will query for is_featured = true to display the featured blog
*/

-- Add is_featured column to blogs table
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false NOT NULL;

-- Add index for faster queries on featured blogs
CREATE INDEX IF NOT EXISTS idx_blogs_is_featured ON blogs(is_featured) WHERE is_featured = true;