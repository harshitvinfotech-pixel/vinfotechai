/*
  # Add Gallery Images for All Case Studies

  1. Purpose
    - Populate gallery images for each case study with dummy placeholder images
    - Each case study gets 4-5 gallery images that can be replaced later
  
  2. Changes
    - Insert gallery images for 7 case studies (1 already has images)
    - Uses numbered images (1.1.jpg through 8.8.jpg) as placeholders
    - Images are ordered with order_index for proper display sequence
  
  3. Notes
    - These are placeholder images that can be individually replaced per case study
    - The autonomous-enterprise-sales-agent already has gallery images
*/

-- Developer Prompt Optimization Tool
INSERT INTO case_study_gallery_images (case_study_id, image_url, caption, order_index)
SELECT 
  '1aab0959-7bec-4e50-8506-92036077eb6a'::uuid,
  image_url,
  caption,
  order_index
FROM (VALUES
  ('/1.1.jpg', 'Dashboard Overview', 1),
  ('/2.2.jpg', 'Prompt Analysis', 2),
  ('/3.3.jpg', 'Optimization Results', 3),
  ('/4.4.jpg', 'Performance Metrics', 4)
) AS t(image_url, caption, order_index)
ON CONFLICT DO NOTHING;

-- Fintech Daily Market Quiz Engine
INSERT INTO case_study_gallery_images (case_study_id, image_url, caption, order_index)
SELECT 
  'a61bdd49-6d9a-4376-84dd-b8f324a84332'::uuid,
  image_url,
  caption,
  order_index
FROM (VALUES
  ('/1.1.jpg', 'Quiz Interface', 1),
  ('/2.2.jpg', 'Question Screen', 2),
  ('/3.3.jpg', 'Results Dashboard', 3),
  ('/4.4.jpg', 'Leaderboard View', 4),
  ('/5.5.jpg', 'Analytics Panel', 5)
) AS t(image_url, caption, order_index)
ON CONFLICT DO NOTHING;

-- iGaming Executive Insight Agent
INSERT INTO case_study_gallery_images (case_study_id, image_url, caption, order_index)
SELECT 
  'a6b94652-7925-4a04-a4df-e7e6b0f92296'::uuid,
  image_url,
  caption,
  order_index
FROM (VALUES
  ('/2.2.jpg', 'Executive Dashboard', 1),
  ('/3.3.jpg', 'Insights Overview', 2),
  ('/4.4.jpg', 'Player Analytics', 3),
  ('/5.5.jpg', 'Revenue Trends', 4)
) AS t(image_url, caption, order_index)
ON CONFLICT DO NOTHING;

-- Integrated Site Safety & Security Vision AI
INSERT INTO case_study_gallery_images (case_study_id, image_url, caption, order_index)
SELECT 
  'c2552a0d-9a0c-48ea-a324-3e852b2395dd'::uuid,
  image_url,
  caption,
  order_index
FROM (VALUES
  ('/3.3.jpg', 'Safety Monitoring', 1),
  ('/4.4.jpg', 'PPE Detection', 2),
  ('/5.5.jpg', 'Alert System', 3),
  ('/6.6.jpg', 'Analytics Dashboard', 4)
) AS t(image_url, caption, order_index)
ON CONFLICT DO NOTHING;

-- Live Sports Auto Prediction Engine
INSERT INTO case_study_gallery_images (case_study_id, image_url, caption, order_index)
SELECT 
  'd76853b8-b25b-4cb3-99fc-2e4a3a113163'::uuid,
  image_url,
  caption,
  order_index
FROM (VALUES
  ('/4.4.jpg', 'Prediction Interface', 1),
  ('/5.5.jpg', 'Live Match Data', 2),
  ('/6.6.jpg', 'Model Performance', 3),
  ('/7.7.jpg', 'Results Analysis', 4),
  ('/8.8.jpg', 'Historical Trends', 5)
) AS t(image_url, caption, order_index)
ON CONFLICT DO NOTHING;

-- Natural Language Match Insights
INSERT INTO case_study_gallery_images (case_study_id, image_url, caption, order_index)
SELECT 
  'a59107d8-9dc9-4aab-8872-3be469856310'::uuid,
  image_url,
  caption,
  order_index
FROM (VALUES
  ('/5.5.jpg', 'Chat Interface', 1),
  ('/6.6.jpg', 'Match Insights', 2),
  ('/7.7.jpg', 'Player Statistics', 3),
  ('/8.8.jpg', 'Team Analysis', 4)
) AS t(image_url, caption, order_index)
ON CONFLICT DO NOTHING;

-- Vision Based Attendance & Productivity Monitoring
INSERT INTO case_study_gallery_images (case_study_id, image_url, caption, order_index)
SELECT 
  '4ac491f8-796b-4316-b1bf-b87c6d5f6d49'::uuid,
  image_url,
  caption,
  order_index
FROM (VALUES
  ('/6.6.jpg', 'Attendance Dashboard', 1),
  ('/7.7.jpg', 'Camera Feeds', 2),
  ('/8.8.jpg', 'Productivity Metrics', 3),
  ('/1.1.jpg', 'Reports Overview', 4)
) AS t(image_url, caption, order_index)
ON CONFLICT DO NOTHING;