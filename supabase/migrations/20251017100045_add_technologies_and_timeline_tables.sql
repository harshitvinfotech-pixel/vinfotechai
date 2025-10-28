/*
  # Add Technologies and Timeline Tables for Case Studies

  1. New Tables
    - `case_study_technologies`
      - `id` (uuid, primary key)
      - `case_study_id` (uuid, foreign key)
      - `name` (text) - Technology name
      - `category` (text) - Category (e.g., "AI", "Frontend", "Infrastructure")
      - `display_order` (integer) - Display order
      - `created_at` (timestamptz)
    
    - `case_study_timeline`
      - `id` (uuid, primary key)
      - `case_study_id` (uuid, foreign key)
      - `phase` (text) - Phase name
      - `description` (text) - Phase description
      - `duration` (text) - Duration (e.g., "2 weeks")
      - `display_order` (integer) - Display order
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on new tables
    - Add policies for public read access

  3. Data Updates
    - Insert PerfectLineup case study with detailed data
    - Add technologies and timeline for PerfectLineup
*/

-- Create case_study_technologies table
CREATE TABLE IF NOT EXISTS case_study_technologies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id uuid REFERENCES case_studies(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create case_study_timeline table
CREATE TABLE IF NOT EXISTS case_study_timeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id uuid REFERENCES case_studies(id) ON DELETE CASCADE NOT NULL,
  phase text NOT NULL,
  description text NOT NULL,
  duration text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE case_study_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_timeline ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view case study technologies"
  ON case_study_technologies FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view case study timeline"
  ON case_study_timeline FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert PerfectLineup case study
INSERT INTO case_studies (
  slug, 
  title, 
  subtitle,
  hero_image, 
  problem, 
  solution, 
  results, 
  client_quote,
  client_name,
  client_role,
  tags, 
  industry,
  display_order
)
VALUES (
  'perfectlineup-ai-cricket-analytics',
  'PerfectLineup - AI-Powered Cricket Analytics',
  'Delivering natural-language match insights through conversational AI',
  'https://images.pexels.com/photos/3886244/pexels-photo-3886244.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'Cricket data was fragmented across 15+ sources, requiring 3+ hours of manual research per match. Language barriers limited regional insights, and manual correlation of statistics with context was time-consuming and inconsistent.',
  'We developed a multilingual AI assistant featuring a hybrid retrieval system, supporting 11+ languages with real-time data updates and source citations. The system provides contextual analysis that delivers expert-level insights through simple conversational queries.',
  'Achieved 90%+ answer accuracy with response times under 2.5 seconds. The platform has garnered 500,000+ app downloads and significantly increased user engagement. Users now receive expert-level insights simply by asking questions in their native language.',
  'Our users now get expert-level insights just by asking a question.',
  'Product Team',
  'Vinfotech',
  ARRAY['Enterprise RAG', 'LLM', 'AI Agent', 'Multilingual'],
  'Sports & Entertainment',
  1
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  results = EXCLUDED.results,
  client_quote = EXCLUDED.client_quote,
  client_name = EXCLUDED.client_name,
  client_role = EXCLUDED.client_role,
  tags = EXCLUDED.tags,
  industry = EXCLUDED.industry;

-- Get the case study ID for PerfectLineup
DO $$
DECLARE
  perfectlineup_id uuid;
BEGIN
  SELECT id INTO perfectlineup_id FROM case_studies WHERE slug = 'perfectlineup-ai-cricket-analytics';
  
  IF perfectlineup_id IS NOT NULL THEN
    -- Delete existing data to avoid duplicates
    DELETE FROM case_study_metrics WHERE case_study_id = perfectlineup_id;
    DELETE FROM case_study_technologies WHERE case_study_id = perfectlineup_id;
    DELETE FROM case_study_timeline WHERE case_study_id = perfectlineup_id;
    DELETE FROM case_study_features WHERE case_study_id = perfectlineup_id;
    
    -- Insert metrics for PerfectLineup
    INSERT INTO case_study_metrics (case_study_id, label, value, description, display_order)
    VALUES
      (perfectlineup_id, 'Answer Accuracy', '90%+', 'Consistently accurate responses across diverse query types', 1),
      (perfectlineup_id, 'Response Time', '<2.5s', 'Lightning-fast insights for real-time decision making', 2),
      (perfectlineup_id, 'App Downloads', '500K+', 'Rapid user adoption and platform growth', 3),
      (perfectlineup_id, 'Languages Supported', '11+', 'Breaking language barriers for global cricket fans', 4);
    
    -- Insert technologies for PerfectLineup
    INSERT INTO case_study_technologies (case_study_id, name, category, display_order)
    VALUES
      (perfectlineup_id, 'GPT-4 Turbo', 'AI', 1),
      (perfectlineup_id, 'Mistral-7B', 'AI', 2),
      (perfectlineup_id, 'IndicBERT', 'AI', 3),
      (perfectlineup_id, 'LangChain', 'AI', 4),
      (perfectlineup_id, 'pgvector', 'AI', 5),
      (perfectlineup_id, 'Elasticsearch', 'AI', 6),
      (perfectlineup_id, 'React', 'Frontend', 7),
      (perfectlineup_id, 'NextJS', 'Frontend', 8),
      (perfectlineup_id, 'Tailwind CSS', 'Frontend', 9),
      (perfectlineup_id, 'AWS ECS', 'Infrastructure', 10),
      (perfectlineup_id, 'AWS S3', 'Infrastructure', 11),
      (perfectlineup_id, 'Redis', 'Infrastructure', 12);
    
    -- Insert timeline for PerfectLineup
    INSERT INTO case_study_timeline (case_study_id, phase, description, duration, display_order)
    VALUES
      (perfectlineup_id, 'Data Strategy', 'Designed comprehensive data aggregation strategy across 15+ cricket data sources', '2 weeks', 1),
      (perfectlineup_id, 'RAG System Implementation', 'Built hybrid retrieval system with vector and keyword search capabilities', '6 weeks', 2),
      (perfectlineup_id, 'Multilingual Integration', 'Integrated 11+ language support using specialized language models', '4 weeks', 3),
      (perfectlineup_id, 'UI/UX Design', 'Created intuitive conversational interface with real-time feedback', '3 weeks', 4),
      (perfectlineup_id, 'Production Deployment', 'Scaled infrastructure and deployed to production with monitoring', '2 weeks', 5);
    
    -- Insert features for PerfectLineup
    INSERT INTO case_study_features (case_study_id, icon, title, description, display_order)
    VALUES
      (perfectlineup_id, 'MessageSquare', 'Natural Language Queries', 'Ask questions in plain language and get instant, accurate answers from 15+ cricket data sources', 1),
      (perfectlineup_id, 'Globe', 'Multilingual Support', 'Access insights in 11+ languages including English, Hindi, Tamil, Bengali, and more', 2),
      (perfectlineup_id, 'Zap', 'Real-Time Data', 'Live match data integration with sub-2.5 second response times', 3),
      (perfectlineup_id, 'Shield', 'Source Citations', 'Every answer includes verifiable sources for complete transparency', 4);
  END IF;
END $$;