/*
  # Create Case Studies Tables

  1. New Tables
    - `case_studies`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL-friendly identifier
      - `title` (text) - Case study title
      - `subtitle` (text) - Short tagline
      - `hero_image` (text) - Main header image URL
      - `problem` (text) - Problem statement
      - `solution` (text) - Solution description
      - `results` (text) - Outcomes and results
      - `client_quote` (text) - Optional testimonial
      - `client_name` (text) - Optional client name
      - `client_role` (text) - Optional client role
      - `tags` (text[]) - Technology/category tags
      - `industry` (text) - Industry vertical
      - `display_order` (integer) - Sort order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `case_study_metrics`
      - `id` (uuid, primary key)
      - `case_study_id` (uuid, foreign key)
      - `label` (text) - Metric label (e.g., "Response Time")
      - `value` (text) - Metric value (e.g., "50%")
      - `description` (text) - Additional context
      - `display_order` (integer)
      - `created_at` (timestamptz)
    
    - `case_study_features`
      - `id` (uuid, primary key)
      - `case_study_id` (uuid, foreign key)
      - `icon` (text) - Icon name from lucide-react
      - `title` (text) - Feature title
      - `description` (text) - Feature description
      - `display_order` (integer)
      - `created_at` (timestamptz)
    
    - `case_study_images`
      - `id` (uuid, primary key)
      - `case_study_id` (uuid, foreign key)
      - `image_url` (text) - Image URL
      - `caption` (text) - Image caption
      - `display_order` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (case studies are public content)
*/

-- Case Studies Table
CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  hero_image text NOT NULL,
  problem text NOT NULL,
  solution text NOT NULL,
  results text,
  client_quote text,
  client_name text,
  client_role text,
  tags text[] DEFAULT '{}',
  industry text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Case studies are publicly readable"
  ON case_studies FOR SELECT
  TO anon, authenticated
  USING (true);

-- Case Study Metrics Table
CREATE TABLE IF NOT EXISTS case_study_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id uuid NOT NULL REFERENCES case_studies(id) ON DELETE CASCADE,
  label text NOT NULL,
  value text NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE case_study_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Case study metrics are publicly readable"
  ON case_study_metrics FOR SELECT
  TO anon, authenticated
  USING (true);

-- Case Study Features Table
CREATE TABLE IF NOT EXISTS case_study_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id uuid NOT NULL REFERENCES case_studies(id) ON DELETE CASCADE,
  icon text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE case_study_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Case study features are publicly readable"
  ON case_study_features FOR SELECT
  TO anon, authenticated
  USING (true);

-- Case Study Images Table
CREATE TABLE IF NOT EXISTS case_study_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id uuid NOT NULL REFERENCES case_studies(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE case_study_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Case study images are publicly readable"
  ON case_study_images FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_display_order ON case_studies(display_order);
CREATE INDEX IF NOT EXISTS idx_case_study_metrics_case_study_id ON case_study_metrics(case_study_id);
CREATE INDEX IF NOT EXISTS idx_case_study_features_case_study_id ON case_study_features(case_study_id);
CREATE INDEX IF NOT EXISTS idx_case_study_images_case_study_id ON case_study_images(case_study_id);
