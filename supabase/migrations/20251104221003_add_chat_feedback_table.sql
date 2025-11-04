/*
  # Add Chat Feedback Table

  1. New Tables
    - `chat_feedback`
      - `id` (uuid, primary key) - Unique identifier for the feedback
      - `session_id` (text) - Session ID from chat conversation
      - `message_index` (integer) - Index of the message in the conversation
      - `message_text` (text) - The actual message content that was rated
      - `feedback_type` (text) - Either 'positive' or 'negative'
      - `created_at` (timestamptz) - When the feedback was submitted
      - `user_agent` (text, optional) - Browser user agent for analytics
      - `ip_address` (text, optional) - IP address for spam prevention

  2. Security
    - Enable RLS on `chat_feedback` table
    - Add policy for anonymous users to insert their own feedback
    - Add policy for authenticated users to read feedback (for analytics)

  3. Indexes
    - Index on `session_id` for faster lookups
    - Index on `created_at` for time-based queries
*/

-- Create the chat_feedback table
CREATE TABLE IF NOT EXISTS chat_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  message_index integer NOT NULL,
  message_text text NOT NULL,
  feedback_type text NOT NULL CHECK (feedback_type IN ('positive', 'negative')),
  created_at timestamptz DEFAULT now(),
  user_agent text,
  ip_address text
);

-- Enable Row Level Security
ALTER TABLE chat_feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to insert feedback
CREATE POLICY "Anyone can submit feedback"
  ON chat_feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can read all feedback (for admin/analytics)
CREATE POLICY "Authenticated users can read feedback"
  ON chat_feedback
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_feedback_session_id ON chat_feedback(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_feedback_created_at ON chat_feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_feedback_type ON chat_feedback(feedback_type);

-- Add a unique constraint to prevent duplicate feedback on same message
CREATE UNIQUE INDEX IF NOT EXISTS idx_chat_feedback_unique 
  ON chat_feedback(session_id, message_index);