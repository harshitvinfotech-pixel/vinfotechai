/*
  # Create Quote Submissions Table

  1. New Tables
    - `quote_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Full name of the person requesting a quote
      - `email` (text) - Contact email address
      - `company` (text) - Company name
      - `project_description` (text) - Detailed description of the project
      - `budget_range` (text) - Budget range for the project
      - `timeline` (text) - Expected timeline for project completion
      - `created_at` (timestamptz) - Timestamp when the quote was submitted
      - `status` (text) - Status of the quote (pending, reviewed, contacted)
  
  2. Security
    - Enable RLS on `quote_submissions` table
    - Add policy for inserting quote submissions (public access for form submission)
    - Add policy for authenticated admin users to view all submissions
*/

CREATE TABLE IF NOT EXISTS quote_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text DEFAULT '',
  project_description text NOT NULL,
  budget_range text DEFAULT '',
  timeline text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quote_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a quote"
  ON quote_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON quote_submissions
  FOR SELECT
  TO authenticated
  USING (true);