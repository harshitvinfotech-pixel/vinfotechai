/*
  # Add increment question clicks function

  1. Functions
    - `increment_question_clicks` - Safely increments the click_count for a suggested question

  2. Security
    - Function is accessible to anonymous users
    - Uses SECURITY DEFINER to allow anonymous users to update the counter
*/

CREATE OR REPLACE FUNCTION increment_question_clicks(question_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE suggested_questions
  SET click_count = click_count + 1
  WHERE id = question_id;
END;
$$;
