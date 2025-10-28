/*
  # Clean Up Duplicate Content Blocks, Metrics, Features, and Timeline

  ## Overview
  This migration removes duplicate entries in content blocks and related tables,
  keeping only the most recently created entries for each display_order.

  ## What's Being Cleaned
  - Duplicate content blocks at same display_order
  - Duplicate metrics
  - Duplicate features
  - Duplicate timeline items
*/

-- Remove duplicate content blocks, keeping the most recent for each (case_study_id, display_order)
DELETE FROM case_study_content_blocks
WHERE id IN (
  SELECT id FROM (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY case_study_id, display_order
             ORDER BY created_at DESC
           ) as rn
    FROM case_study_content_blocks
  ) t
  WHERE rn > 1
);

-- Remove duplicate metrics, keeping the most recent for each (case_study_id, display_order)
DELETE FROM case_study_metrics
WHERE id IN (
  SELECT id FROM (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY case_study_id, label, value
             ORDER BY created_at DESC
           ) as rn
    FROM case_study_metrics
  ) t
  WHERE rn > 1
);

-- Remove duplicate features, keeping the most recent for each (case_study_id, title)
DELETE FROM case_study_features
WHERE id IN (
  SELECT id FROM (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY case_study_id, title
             ORDER BY created_at DESC
           ) as rn
    FROM case_study_features
  ) t
  WHERE rn > 1
);

-- Remove duplicate timeline items, keeping the most recent for each (case_study_id, phase)
DELETE FROM case_study_timeline
WHERE id IN (
  SELECT id FROM (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY case_study_id, phase
             ORDER BY created_at DESC
           ) as rn
    FROM case_study_timeline
  ) t
  WHERE rn > 1
);

-- Remove duplicate images, keeping the most recent for each (case_study_id, image_url)
DELETE FROM case_study_images
WHERE id IN (
  SELECT id FROM (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY case_study_id, image_url
             ORDER BY display_order, created_at DESC
           ) as rn
    FROM case_study_images
  ) t
  WHERE rn > 1
);
