/*
  # Add How AI Made It Possible and Vinfotech's Approach Sections

  1. New Tables
    - `case_study_ai_features`
      - `id` (uuid, primary key)
      - `case_study_id` (uuid, foreign key to case_studies)
      - `title` (text) - Section title (e.g., "How AI Made It Possible")
      - `subtitle` (text) - Optional subtitle
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `case_study_ai_feature_items`
      - `id` (uuid, primary key)
      - `ai_features_id` (uuid, foreign key to case_study_ai_features)
      - `icon` (text) - Icon identifier
      - `title` (text) - Feature title
      - `description` (text) - Feature description
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
    
    - `case_study_approach_timelines`
      - `id` (uuid, primary key)
      - `case_study_id` (uuid, foreign key to case_studies)
      - `title` (text) - Section title (e.g., "Vinfotech's Approach")
      - `subtitle` (text) - Optional subtitle
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `case_study_approach_steps`
      - `id` (uuid, primary key)
      - `timeline_id` (uuid, foreign key to case_study_approach_timelines)
      - `title` (text) - Step title (e.g., "Knowledge Integration")
      - `description` (text) - Step description (supports rich formatting)
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (authenticated users for write)
*/

-- Create case_study_ai_features table
CREATE TABLE IF NOT EXISTS case_study_ai_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id uuid REFERENCES case_studies(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL DEFAULT 'How AI Made It Possible',
  subtitle text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create case_study_ai_feature_items table
CREATE TABLE IF NOT EXISTS case_study_ai_feature_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ai_features_id uuid REFERENCES case_study_ai_features(id) ON DELETE CASCADE NOT NULL,
  icon text DEFAULT 'sparkles',
  title text NOT NULL,
  description text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create case_study_approach_timelines table
CREATE TABLE IF NOT EXISTS case_study_approach_timelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id uuid REFERENCES case_studies(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL DEFAULT 'Vinfotech''s Approach',
  subtitle text DEFAULT 'Our systematic approach to building enterprise-grade AI solutions',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create case_study_approach_steps table
CREATE TABLE IF NOT EXISTS case_study_approach_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timeline_id uuid REFERENCES case_study_approach_timelines(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE case_study_ai_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_ai_feature_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_approach_timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_approach_steps ENABLE ROW LEVEL SECURITY;

-- RLS Policies for case_study_ai_features
CREATE POLICY "Anyone can view AI features"
  ON case_study_ai_features
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for case_study_ai_feature_items
CREATE POLICY "Anyone can view AI feature items"
  ON case_study_ai_feature_items
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for case_study_approach_timelines
CREATE POLICY "Anyone can view approach timelines"
  ON case_study_approach_timelines
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for case_study_approach_steps
CREATE POLICY "Anyone can view approach steps"
  ON case_study_approach_steps
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_features_case_study ON case_study_ai_features(case_study_id);
CREATE INDEX IF NOT EXISTS idx_ai_feature_items_features ON case_study_ai_feature_items(ai_features_id);
CREATE INDEX IF NOT EXISTS idx_ai_feature_items_order ON case_study_ai_feature_items(order_index);
CREATE INDEX IF NOT EXISTS idx_approach_timelines_case_study ON case_study_approach_timelines(case_study_id);
CREATE INDEX IF NOT EXISTS idx_approach_steps_timeline ON case_study_approach_steps(timeline_id);
CREATE INDEX IF NOT EXISTS idx_approach_steps_order ON case_study_approach_steps(order_index);
