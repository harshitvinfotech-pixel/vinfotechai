/*
  # Create Chat Widget Tables

  1. New Tables
    - `chat_conversations`
      - `id` (uuid, primary key) - Unique conversation identifier
      - `session_id` (text) - Browser session identifier for tracking
      - `user_question` (text) - The question asked by the user
      - `assistant_response` (text) - The response provided
      - `response_source` (text) - Either 'knowledge_base' or 'fallback'
      - `helpful` (boolean, nullable) - User feedback on response helpfulness
      - `created_at` (timestamptz) - When the conversation occurred
    
    - `suggested_questions`
      - `id` (uuid, primary key) - Unique question identifier
      - `question_text` (text) - The suggested question text
      - `category` (text) - Category like 'Services', 'Pricing', 'Technology', 'Support'
      - `display_order` (integer) - Order to display questions
      - `is_active` (boolean) - Whether to show this question
      - `click_count` (integer) - Analytics: how many times clicked
      - `created_at` (timestamptz)
    
    - `knowledge_base`
      - `id` (uuid, primary key) - Unique entry identifier
      - `keywords` (text[]) - Array of keywords to match against
      - `question_patterns` (text[]) - Common question variations
      - `response_text` (text) - The response to provide
      - `category` (text) - Category for organization
      - `priority` (integer) - Higher priority responses matched first
      - `is_active` (boolean) - Whether this entry is active
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Allow anonymous users to insert conversations (for tracking)
    - Allow anonymous users to read suggested questions and knowledge base
    - Allow anonymous users to update click counts on suggested questions
*/

-- Create chat_conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_question text NOT NULL,
  assistant_response text NOT NULL,
  response_source text DEFAULT 'knowledge_base',
  helpful boolean DEFAULT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert conversations"
  ON chat_conversations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read conversations"
  ON chat_conversations
  FOR SELECT
  TO anon
  USING (true);

-- Create suggested_questions table
CREATE TABLE IF NOT EXISTS suggested_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  category text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  click_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE suggested_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active suggested questions"
  ON suggested_questions
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Anyone can update click counts"
  ON suggested_questions
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create knowledge_base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keywords text[] NOT NULL,
  question_patterns text[] NOT NULL,
  response_text text NOT NULL,
  category text NOT NULL,
  priority integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active knowledge base entries"
  ON knowledge_base
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Insert initial suggested questions
INSERT INTO suggested_questions (question_text, category, display_order) VALUES
  ('What services do you offer?', 'Services', 1),
  ('How much does a custom app cost?', 'Pricing', 2),
  ('What technologies do you specialize in?', 'Technology', 3),
  ('How long does a typical project take?', 'Timeline', 4),
  ('Can you help with mobile app development?', 'Services', 5),
  ('Do you provide ongoing support?', 'Support', 6);

-- Insert initial knowledge base entries
INSERT INTO knowledge_base (keywords, question_patterns, response_text, category, priority) VALUES
  (
    ARRAY['services', 'offer', 'do', 'provide', 'what'],
    ARRAY['what services', 'what do you offer', 'what do you provide', 'services you offer'],
    'We offer comprehensive technology solutions including custom web application development, mobile app development (iOS and Android), cloud solutions, UI/UX design, and digital transformation consulting. Our team specializes in creating scalable, production-ready solutions tailored to your business needs.',
    'Services',
    10
  ),
  (
    ARRAY['cost', 'price', 'pricing', 'how much', 'budget', 'expensive'],
    ARRAY['how much', 'cost', 'pricing', 'price range', 'budget'],
    'Project costs vary based on scope, complexity, and requirements. Custom web applications typically start from $15,000, while mobile apps start from $25,000. We offer flexible engagement models including fixed-price projects, time & materials, and dedicated teams. Contact us for a detailed quote tailored to your specific needs.',
    'Pricing',
    10
  ),
  (
    ARRAY['technologies', 'tech', 'stack', 'specialize', 'use', 'work with'],
    ARRAY['what technologies', 'tech stack', 'technologies you use', 'what do you use'],
    'We specialize in modern technologies including React, Node.js, TypeScript, Python, React Native, Flutter, AWS, Azure, and Supabase. We focus on production-ready, scalable solutions using industry-standard best practices. Our tech stack is chosen based on your project requirements to ensure optimal performance and maintainability.',
    'Technology',
    10
  ),
  (
    ARRAY['timeline', 'how long', 'duration', 'time', 'take', 'complete'],
    ARRAY['how long', 'timeline', 'duration', 'how much time', 'when'],
    'Project timelines vary based on complexity and scope. A typical web application takes 8-16 weeks, while mobile apps take 12-20 weeks. We follow an agile methodology with regular milestones and demos every 2 weeks, ensuring transparency and allowing for iterative feedback throughout the development process.',
    'Timeline',
    10
  ),
  (
    ARRAY['mobile', 'app', 'ios', 'android', 'development'],
    ARRAY['mobile app', 'ios app', 'android app', 'mobile development'],
    'Yes! We excel at mobile app development for both iOS and Android platforms. We can build native apps or use cross-platform frameworks like React Native and Flutter to create beautiful, performant mobile applications. Our mobile solutions include custom apps, enterprise mobility solutions, and app modernization.',
    'Services',
    9
  ),
  (
    ARRAY['support', 'maintenance', 'ongoing', 'after', 'help'],
    ARRAY['ongoing support', 'maintenance', 'after launch', 'post-launch'],
    'Absolutely! We provide comprehensive ongoing support and maintenance services including bug fixes, performance monitoring, security updates, feature enhancements, and 24/7 technical support. We offer flexible support packages to ensure your application continues to perform optimally and stays current with evolving technology standards.',
    'Support',
    9
  ),
  (
    ARRAY['contact', 'reach', 'talk', 'call', 'email', 'get in touch'],
    ARRAY['contact you', 'reach you', 'get in touch', 'talk to someone'],
    'We would love to hear from you! You can reach us by clicking the "Get a Quote" button to fill out our contact form, or email us directly. Our team typically responds within 24 hours. Feel free to share your project details, and we will schedule a consultation to discuss how we can help bring your vision to life.',
    'Contact',
    8
  );
