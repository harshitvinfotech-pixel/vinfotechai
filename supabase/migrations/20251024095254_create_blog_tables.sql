/*
  # Create Blog System Tables

  1. New Tables
    - `blog_categories`
      - `id` (uuid, primary key)
      - `name` (text) - Category name
      - `slug` (text, unique) - URL-friendly identifier
      - `description` (text) - Category description
      - `color` (text) - Hex color for category badge
      - `display_order` (integer) - Sort order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `blogs`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL-friendly identifier
      - `title` (text) - Blog post title
      - `excerpt` (text) - Short description/preview
      - `content` (text) - Full HTML content with rich text
      - `featured_image_url` (text) - Hero image URL from storage
      - `author_name` (text) - Author's full name
      - `author_avatar_url` (text) - Author profile image URL
      - `category_id` (uuid) - Foreign key to blog_categories
      - `tags` (text[]) - Array of tag strings
      - `published_at` (timestamptz) - Publication date/time
      - `reading_time_minutes` (integer) - Estimated reading time
      - `is_published` (boolean) - Publication status
      - `display_order` (integer) - Sort order for featured posts
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to published blogs
    - Add policies for public read access to all categories

  3. Indexes
    - Index on slug for fast lookups
    - Index on published_at for sorting
    - Index on category_id for filtering
    - Index on is_published for filtering published content

  4. Triggers
    - Auto-update updated_at timestamp on record changes
*/

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  color text DEFAULT '#00B46A',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog categories are publicly readable"
  ON blog_categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  featured_image_url text NOT NULL,
  author_name text NOT NULL DEFAULT 'Vinfotech Team',
  author_avatar_url text,
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  tags text[] DEFAULT '{}',
  published_at timestamptz DEFAULT now(),
  reading_time_minutes integer DEFAULT 5,
  is_published boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blogs are publicly readable"
  ON blogs FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_category_id ON blogs(category_id);
CREATE INDEX IF NOT EXISTS idx_blogs_is_published ON blogs(is_published);
CREATE INDEX IF NOT EXISTS idx_blogs_display_order ON blogs(display_order);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
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

-- Insert default blog categories
INSERT INTO blog_categories (name, slug, description, color, display_order) VALUES
  ('AI & Machine Learning', 'ai-machine-learning', 'Insights on artificial intelligence and machine learning technologies', '#00B46A', 1),
  ('Case Studies', 'case-studies', 'Real-world success stories and project showcases', '#3B82F6', 2),
  ('Tech Insights', 'tech-insights', 'Technology trends and industry analysis', '#8B5CF6', 3),
  ('Industry News', 'industry-news', 'Latest updates and news from the tech industry', '#F59E0B', 4)
ON CONFLICT (slug) DO NOTHING;
