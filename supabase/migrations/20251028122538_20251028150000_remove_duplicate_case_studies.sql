/*
  # Remove Duplicate Case Studies

  ## Overview
  This migration removes duplicate case studies, keeping only the versions with
  complete content blocks.

  ## Duplicates to Remove
  - vision-attendance-productivity (old, no content blocks)
  - live-sports-auto-prediction (old, no content blocks)
  - fintech-daily-market-quiz (old, no content blocks)
  - site-safety-security-vision-ai (old, no content blocks)
  - developer-prompt-optimization (old, no content blocks)
  - natural-language-match-insights (old PerfectLineup case study)

  ## Kept Case Studies
  - autonomous-enterprise-sales-agent (complete)
  - vision-based-attendance-productivity-monitoring (new, has content blocks)
  - live-sports-auto-prediction-engine (new, has content blocks)
  - fintech-daily-market-quiz-engine (new, has content blocks)
  - integrated-site-safety-security-vision-ai (new, has content blocks)
  - igaming-executive-insight-agent (complete)
  - developer-prompt-optimization-tool (new, has content blocks)
*/

-- Delete old duplicate case studies (cascades will handle related records)
DELETE FROM case_studies WHERE slug = 'vision-attendance-productivity';
DELETE FROM case_studies WHERE slug = 'live-sports-auto-prediction';
DELETE FROM case_studies WHERE slug = 'fintech-daily-market-quiz';
DELETE FROM case_studies WHERE slug = 'site-safety-security-vision-ai';
DELETE FROM case_studies WHERE slug = 'developer-prompt-optimization';
DELETE FROM case_studies WHERE slug = 'natural-language-match-insights';

-- Verify remaining case studies
-- Should only have 7 case studies left
