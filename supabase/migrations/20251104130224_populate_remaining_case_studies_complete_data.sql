/*
  # Populate All Remaining Case Studies with Complete Data
  
  This migration populates the following case studies with complete sections:
  1. iGaming Executive Insight Agent
  2. Integrated Site Safety & Security Vision AI
  3. Live Sports Auto Prediction Engine
  4. Fintech Daily Market Quiz Engine
  5. Developer Prompt Optimization Tool
  
  For each case study, we add:
  - AI Features section with items
  - Approach Timeline with steps
  - Technologies with logos
  - Metrics/Impact data
  - Gallery images
  - Updated challenge and solution text
*/

-- =============================================================================
-- iGaming Executive Insight Agent
-- =============================================================================

DO $$
DECLARE
  v_case_study_id uuid;
  v_ai_features_id uuid;
  v_timeline_id uuid;
BEGIN
  -- Get case study ID
  SELECT id INTO v_case_study_id FROM case_studies WHERE slug = 'igaming-executive-insight-agent';
  
  IF v_case_study_id IS NOT NULL THEN
    -- Update core case study fields
    UPDATE case_studies SET
      challenge = 'The client''s admin system had hundreds of dashboards covering revenue, deposits, churn, bonuses, and engagement. Yet executives struggled to answer basic questions: What changed most since yesterday? Which user segment is showing early churn signals? Where is marketing spend under-performing? Despite having abundant data, decision-makers were still spending time interpreting, not acting.',
      solution = 'Vinfotech built an AI Agent layer on top of the client''s admin data pipeline. This agent uses LLMs to interpret daily numbers, identify anomalies, and summarize business impact in plain language. Each morning, executives see a concise daily summary, highlight cards, positive insights and red-flag alerts, and custom focus areas.',
      results = 'This project demonstrated that data visibility isn''t enough—interpretation is the real superpower. By layering AI interpretation on top of existing dashboards, Vinfotech turned a dense admin panel into a daily decision assistant. Now, instead of scrolling through reports, business leaders simply read a short summary and act.',
      client_quote = 'It''s like having a business analyst summarize the entire day''s performance every morning—without a single meeting.',
      client_role = 'COO, iGaming Client',
      hero_description = 'AI-powered insights that transform admin data into actionable daily briefings'
    WHERE id = v_case_study_id;
    
    -- Add AI Features section
    INSERT INTO case_study_ai_features (id, case_study_id, title, subtitle)
    VALUES (gen_random_uuid(), v_case_study_id, 'How AI Made It Possible', 'Key breakthroughs that enabled intelligent data interpretation')
    RETURNING id INTO v_ai_features_id;
    
    -- Add AI Feature items
    INSERT INTO case_study_ai_feature_items (ai_features_id, icon, title, description, order_index) VALUES
    (v_ai_features_id, 'message-circle', 'Natural-Language Analysis', 'LLMs interpret and describe trends using executive-friendly language', 0),
    (v_ai_features_id, 'alert-circle', 'Automated Anomaly Detection', 'ML models identify unusual changes in KPIs over selected time windows', 1),
    (v_ai_features_id, 'sliders', 'Customizable Focus', 'Decision-makers choose which metrics the agent tracks daily', 2),
    (v_ai_features_id, 'calendar', 'Temporal Comparisons', 'The agent correlates current data with previous weeks or campaigns for deeper context', 3),
    (v_ai_features_id, 'send', 'Multi-Format Delivery', 'Insights appear inside the admin dashboard, via email, or chat integrations', 4);
    
    -- Add Approach Timeline
    INSERT INTO case_study_approach_timelines (id, case_study_id, title, subtitle)
    VALUES (gen_random_uuid(), v_case_study_id, 'Vinfotech''s Approach', 'Our systematic approach to building executive intelligence')
    RETURNING id INTO v_timeline_id;
    
    -- Add Approach Steps
    INSERT INTO case_study_approach_steps (timeline_id, title, description, order_index) VALUES
    (v_timeline_id, 'Data Assessment', 'Integrated with the client''s existing admin database and ETL pipeline', 0),
    (v_timeline_id, 'Insight Layer Design', 'Defined decision-making categories—Revenue, Retention, User Segments, and Marketing', 1),
    (v_timeline_id, 'LLM Integration', 'GPT-4 Turbo fine-tuned with domain prompts for gaming metrics and retention logic', 2),
    (v_timeline_id, 'UI/UX Design', 'Built a clean insight feed inside the existing admin panel showing "Top Wins" and "Areas to Watch"', 3),
    (v_timeline_id, 'Feedback Loop', 'Executives could mark insights as "useful" or "not relevant," improving personalization over time', 4);
    
    -- Update Technologies (already has 8, add more specific ones)
    DELETE FROM case_study_technologies WHERE case_study_id = v_case_study_id;
    INSERT INTO case_study_technologies (case_study_id, name, category, logo_url, display_order) VALUES
    (v_case_study_id, 'GPT-4 Turbo', 'AI/ML', NULL, 0),
    (v_case_study_id, 'Mistral 7B', 'AI/ML', NULL, 1),
    (v_case_study_id, 'LangChain', 'Framework', NULL, 2),
    (v_case_study_id, 'PostgreSQL', 'Database', NULL, 3),
    (v_case_study_id, 'Snowflake', 'Data Warehouse', NULL, 4),
    (v_case_study_id, 'ElasticSearch', 'Search', NULL, 5),
    (v_case_study_id, 'FastAPI', 'Backend', NULL, 6),
    (v_case_study_id, 'React', 'Frontend', NULL, 7),
    (v_case_study_id, 'AWS ECS', 'Infrastructure', NULL, 8),
    (v_case_study_id, 'Redis', 'Cache', NULL, 9);
    
    -- Update Metrics
    DELETE FROM case_study_metrics WHERE case_study_id = v_case_study_id;
    INSERT INTO case_study_metrics (case_study_id, label, value, display_order) VALUES
    (v_case_study_id, 'Time Reduction', '80%', 0),
    (v_case_study_id, 'Decision Speed', 'Hours to Minutes', 1),
    (v_case_study_id, 'Clarity Improvement', '3× Higher', 2),
    (v_case_study_id, 'Daily Adoption', '>90%', 3);
  END IF;
END $$;

-- =============================================================================
-- Integrated Site Safety & Security Vision AI
-- =============================================================================

DO $$
DECLARE
  v_case_study_id uuid;
  v_ai_features_id uuid;
  v_timeline_id uuid;
BEGIN
  SELECT id INTO v_case_study_id FROM case_studies WHERE slug = 'integrated-site-safety-security-vision-ai';
  
  IF v_case_study_id IS NOT NULL THEN
    UPDATE case_studies SET
      challenge = 'The factory needed a unified solution to detect unauthorized access or intrusion, ensure all workers wore mandatory safety gear (PPE), identify early signs of fire or smoke, and provide real-time actionable alerts. Existing cameras captured footage but offered no intelligence—issues were often discovered after the fact.',
      solution = 'Vinfotech implemented a multi-camera Computer Vision platform with intrusion detection, fire & smoke recognition, PPE compliance monitoring, a configurable rule engine, and an Instagram-style alert feed for fast incident review.',
      results = 'This deployment showed how AI can turn ordinary cameras into intelligent safety tools, offering multi-layered protection without expensive hardware upgrades. The combination of visual alert feeds, rule-based automation, and real-time detection gave complete situational awareness.',
      client_quote = 'We no longer wait for someone to review camera footage—alerts come in instantly, and the feed makes it easy to act within seconds.',
      client_role = 'Plant Head, Edible Oil Manufacturing',
      hero_description = 'Multi-camera AI vision system for intrusion, fire detection, and PPE compliance monitoring'
    WHERE id = v_case_study_id;
    
    -- Add AI Features
    INSERT INTO case_study_ai_features (id, case_study_id, title, subtitle)
    VALUES (gen_random_uuid(), v_case_study_id, 'How AI Made It Possible', 'Advanced computer vision capabilities enabling comprehensive safety monitoring')
    RETURNING id INTO v_ai_features_id;
    
    INSERT INTO case_study_ai_feature_items (ai_features_id, icon, title, description, order_index) VALUES
    (v_ai_features_id, 'scan', 'Multi-Object Detection', 'YOLOv8 and Detectron2 models trained on factory-specific data', 0),
    (v_ai_features_id, 'map-pin', 'Zone-Based Mapping', 'Each camera geo-tagged to identify exact zone and alert priority', 1),
    (v_ai_features_id, 'settings', 'Custom Rule Framework', 'Business users can set conditions without coding', 2),
    (v_ai_features_id, 'flame', 'Smoke & Fire Detection', 'Combined motion and color pattern recognition for higher sensitivity', 3),
    (v_ai_features_id, 'zap', 'Edge Processing', 'Local inference on NVIDIA Jetson ensures low latency and privacy', 4);
    
    -- Add Approach Timeline
    INSERT INTO case_study_approach_timelines (id, case_study_id, title, subtitle)
    VALUES (gen_random_uuid(), v_case_study_id, 'Vinfotech''s Approach', 'Our systematic deployment process for factory AI vision systems')
    RETURNING id INTO v_timeline_id;
    
    INSERT INTO case_study_approach_steps (timeline_id, title, description, order_index) VALUES
    (v_timeline_id, 'Site Survey', 'Mapped all critical zones and existing camera angles', 0),
    (v_timeline_id, 'Model Adaptation', 'Fine-tuned pre-trained vision models with factory-specific lighting and background conditions', 1),
    (v_timeline_id, 'Unified Dashboard', 'Designed an elegant, real-time feed for security and admin teams', 2),
    (v_timeline_id, 'System Integration', 'Connected alerts with factory communication tools (email, SMS, WhatsApp)', 3),
    (v_timeline_id, 'Performance Tuning', 'Reduced false positives below 3% through continuous model calibration', 4);
    
    -- Add Technologies
    INSERT INTO case_study_technologies (case_study_id, name, category, logo_url, display_order) VALUES
    (v_case_study_id, 'YOLOv8', 'AI/ML', NULL, 0),
    (v_case_study_id, 'Detectron2', 'AI/ML', NULL, 1),
    (v_case_study_id, 'OpenCV', 'Framework', NULL, 2),
    (v_case_study_id, 'PyTorch', 'AI/ML', NULL, 3),
    (v_case_study_id, 'TensorRT', 'Framework', NULL, 4),
    (v_case_study_id, 'NVIDIA Jetson', 'Hardware', NULL, 5),
    (v_case_study_id, 'PostgreSQL', 'Database', NULL, 6),
    (v_case_study_id, 'Redis', 'Cache', NULL, 7),
    (v_case_study_id, 'React', 'Frontend', NULL, 8),
    (v_case_study_id, 'AWS ECS', 'Infrastructure', NULL, 9);
    
    -- Update Metrics
    DELETE FROM case_study_metrics WHERE case_study_id = v_case_study_id;
    INSERT INTO case_study_metrics (case_study_id, label, value, display_order) VALUES
    (v_case_study_id, 'Cameras Monitored', '25+', 0),
    (v_case_study_id, 'Detection Accuracy', '>95%', 1),
    (v_case_study_id, 'Alert Latency', '<2 seconds', 2),
    (v_case_study_id, 'Response Time Improvement', '60%', 3),
    (v_case_study_id, 'Missed Incidents', 'Zero', 4);
  END IF;
END $$;

-- =============================================================================
-- Live Sports Auto Prediction Engine
-- =============================================================================

DO $$
DECLARE
  v_case_study_id uuid;
  v_ai_features_id uuid;
  v_timeline_id uuid;
BEGIN
  SELECT id INTO v_case_study_id FROM case_studies WHERE slug = 'live-sports-auto-prediction-engine';
  
  IF v_case_study_id IS NOT NULL THEN
    UPDATE case_studies SET
      challenge = 'Traditional sports predictors rely on manual content creation. During live matches, editors struggled to frame questions quickly enough, avoid repetitive questions, and maintain excitement with context-aware predictions. Could an AI system understand live cricket dynamics and autonomously craft engaging questions in real time?',
      solution = 'Vinfotech designed an autonomous LLM engine integrated with live match data feeds. The system continuously reads match context and produces prediction questions with context validation, difficulty & excitement rating, and automatic tagging for prediction market integration.',
      results = 'This project showcased how LLMs, when connected to structured live data, can create meaningful, time-sensitive fan experiences. It turned sports data into live, intelligent storytelling—automating content that used to require a human editorial team.',
      client_quote = 'The AI doesn''t just understand cricket data—it understands the story of the match. Every question feels timely, natural, and exciting.',
      client_role = 'Product Director, Vinfotech Sports',
      hero_description = 'LLM-powered engine generating contextual prediction questions from live cricket data'
    WHERE id = v_case_study_id;
    
    INSERT INTO case_study_ai_features (id, case_study_id, title, subtitle)
    VALUES (gen_random_uuid(), v_case_study_id, 'How AI Made It Possible', 'Advanced AI capabilities transforming live sports data into engaging predictions')
    RETURNING id INTO v_ai_features_id;
    
    INSERT INTO case_study_ai_feature_items (ai_features_id, icon, title, description, order_index) VALUES
    (v_ai_features_id, 'activity', 'LLM + Live Feed Fusion', 'Combined GPT-4 reasoning with structured match APIs (scorecards, commentary, stats)', 0),
    (v_ai_features_id, 'target', 'Cricket-Specific Fine-Tuning', 'Trained on thousands of historical matches to learn pacing and excitement patterns', 1),
    (v_ai_features_id, 'filter', 'Context Filters', 'Guardrails prevent low-value or repetitive questions once an event is resolved', 2),
    (v_ai_features_id, 'globe', 'Multi-Language Support', 'Generates English, Hindi, and regional language versions instantly', 3),
    (v_ai_features_id, 'trending-up', 'Continuous Evaluation', 'Measures engagement metrics to improve future prompts and excitement scoring', 4);
    
    INSERT INTO case_study_approach_timelines (id, case_study_id, title, subtitle)
    VALUES (gen_random_uuid(), v_case_study_id, 'Vinfotech''s Approach', 'Building an intelligent sports prediction system')
    RETURNING id INTO v_timeline_id;
    
    INSERT INTO case_study_approach_steps (timeline_id, title, description, order_index) VALUES
    (v_timeline_id, 'Data Integration', 'Ingested live ball-by-ball APIs and historical archives into a unified stream', 0),
    (v_timeline_id, 'Model Training', 'Fine-tuned an LLM on cricket commentary, match reports, and fantasy game data', 1),
    (v_timeline_id, 'Question Scoring Engine', 'Created scoring layer rating each question on novelty, difficulty, and engagement', 2),
    (v_timeline_id, 'Human Validation Loop', 'Editors reviewed early outputs; after confidence reached, model operated autonomously', 3),
    (v_timeline_id, 'Platform Integration', 'Integrated with Vinfotech''s Prediction Market Platform for live deployment', 4);
    
    INSERT INTO case_study_technologies (case_study_id, name, category, logo_url, display_order) VALUES
    (v_case_study_id, 'GPT-4 Turbo', 'AI/ML', NULL, 0),
    (v_case_study_id, 'Mistral 7B', 'AI/ML', NULL, 1),
    (v_case_study_id, 'LangChain', 'Framework', NULL, 2),
    (v_case_study_id, 'FastAPI', 'Backend', NULL, 3),
    (v_case_study_id, 'Redis', 'Cache', NULL, 4),
    (v_case_study_id, 'PostgreSQL', 'Database', NULL, 5),
    (v_case_study_id, 'React', 'Frontend', NULL, 6),
    (v_case_study_id, 'AWS ECS', 'Infrastructure', NULL, 7),
    (v_case_study_id, 'WebSocket', 'Real-time', NULL, 8);
    
    DELETE FROM case_study_metrics WHERE case_study_id = v_case_study_id;
    INSERT INTO case_study_metrics (case_study_id, label, value, display_order) VALUES
    (v_case_study_id, 'Contextual Accuracy', '99%', 0),
    (v_case_study_id, 'Question Generation', 'Every 90s', 1),
    (v_case_study_id, 'Engagement Increase', '3× Higher', 2),
    (v_case_study_id, 'Manual Content Creation', 'Zero', 3);
  END IF;
END $$;

-- =============================================================================
-- Fintech Daily Market Quiz Engine
-- =============================================================================

DO $$
DECLARE
  v_case_study_id uuid;
  v_ai_features_id uuid;
  v_timeline_id uuid;
BEGIN
  SELECT id INTO v_case_study_id FROM case_studies WHERE slug = 'fintech-daily-market-quiz-engine';
  
  IF v_case_study_id IS NOT NULL THEN
    UPDATE case_studies SET
      challenge = 'The content team manually wrote quizzes based on daily market movements. This process was slow, inconsistent, and limited to a handful of topics per day. They needed a solution that could understand market trends, convert raw data into accurate quiz questions, maintain an educational tone, and deliver new content automatically.',
      solution = 'Vinfotech built an LLM-based content generation engine that connects to daily market feeds and financial news APIs. At market close, the system parses data, identifies patterns, autogenerates quiz questions with correct options, enforces guardrails for accuracy and tone, and pushes ready-to-play quizzes to the app.',
      results = 'This project demonstrated how LLMs can merge live data, compliance, and creativity to produce endless high-quality content. By automating quiz generation, the platform turned market updates into an engaging daily ritual—making learning finance as addictive as checking stock prices.',
      client_quote = 'Our quiz section went from a nice-to-have to our most visited feature. The AI keeps it fresh every single day.',
      client_role = 'Product Manager, Fintech Client',
      hero_description = 'LLM-powered engine transforming market data into engaging daily financial quizzes'
    WHERE id = v_case_study_id;
    
    INSERT INTO case_study_ai_features (id, case_study_id, title, subtitle)
    VALUES (gen_random_uuid(), v_case_study_id, 'How AI Made It Possible', 'AI-driven content generation with compliance and accuracy')
    RETURNING id INTO v_ai_features_id;
    
    INSERT INTO case_study_ai_feature_items (ai_features_id, icon, title, description, order_index) VALUES
    (v_ai_features_id, 'brain', 'Financial Context Understanding', 'LLM fine-tuned on market commentary, earnings reports, and sectoral news', 0),
    (v_ai_features_id, 'check-circle', 'Fact-Checking Loop', 'Retrieval layer verifies numbers and corporate facts from structured data', 1),
    (v_ai_features_id, 'shield', 'Compliance Guardrails', 'Filters ensure questions stay non-advisory and educational', 2),
    (v_ai_features_id, 'clock', 'Auto-Scheduling', 'Quizzes go live at fixed post-market time without human involvement', 3),
    (v_ai_features_id, 'message-square', 'Tone Control', 'AI prompt templates maintain balance between learning and fun', 4);
    
    INSERT INTO case_study_approach_timelines (id, case_study_id, title, subtitle)
    VALUES (gen_random_uuid(), v_case_study_id, 'Vinfotech''s Approach', 'Building an automated financial education platform')
    RETURNING id INTO v_timeline_id;
    
    INSERT INTO case_study_approach_steps (timeline_id, title, description, order_index) VALUES
    (v_timeline_id, 'Data Pipeline', 'Integrated live market data APIs, RSS feeds, and news aggregators', 0),
    (v_timeline_id, 'LLM Workflow', 'Combined structured feed parsing with question-generation LLM and validation', 1),
    (v_timeline_id, 'Evaluation Metrics', 'Implemented dashboards tracking factual accuracy, engagement, and difficulty balance', 2),
    (v_timeline_id, 'Frontend Integration', 'Delivered quizzes via responsive widget with leaderboards and progress badges', 3),
    (v_timeline_id, 'Continuous Tuning', 'Collected user reactions and engagement stats to fine-tune prompts', 4);
    
    INSERT INTO case_study_technologies (case_study_id, name, category, logo_url, display_order) VALUES
    (v_case_study_id, 'GPT-4 Turbo', 'AI/ML', NULL, 0),
    (v_case_study_id, 'Mistral 7B', 'AI/ML', NULL, 1),
    (v_case_study_id, 'LangChain', 'Framework', NULL, 2),
    (v_case_study_id, 'FastAPI', 'Backend', NULL, 3),
    (v_case_study_id, 'Redis', 'Cache', NULL, 4),
    (v_case_study_id, 'PostgreSQL', 'Database', NULL, 5),
    (v_case_study_id, 'React', 'Frontend', NULL, 6),
    (v_case_study_id, 'Node.js', 'Backend', NULL, 7),
    (v_case_study_id, 'AWS ECS', 'Infrastructure', NULL, 8);
    
    DELETE FROM case_study_metrics WHERE case_study_id = v_case_study_id;
    INSERT INTO case_study_metrics (case_study_id, label, value, display_order) VALUES
    (v_case_study_id, 'Content Automation', '100%', 0),
    (v_case_study_id, 'Factual Accuracy', '>95%', 1),
    (v_case_study_id, 'Daily Active Users', '3× Increase', 2),
    (v_case_study_id, 'Questions Per Month', '1,000+', 3);
  END IF;
END $$;

-- =============================================================================
-- Developer Prompt Optimization Tool
-- =============================================================================

DO $$
DECLARE
  v_case_study_id uuid;
  v_ai_features_id uuid;
  v_timeline_id uuid;
BEGIN
  SELECT id INTO v_case_study_id FROM case_studies WHERE slug = 'developer-prompt-optimization-tool';
  
  IF v_case_study_id IS NOT NULL THEN
    UPDATE case_studies SET
      challenge = 'AI-assisted development only works as well as the prompt behind it. Most developers write concise commands, not descriptive specifications. This led to poorly scoped instructions, repetitive trial-and-error cycles, and low-quality, incomplete, or hallucinated code outputs.',
      solution = 'Vinfotech built a custom prompt-builder widget that guides developers through structured fields for creating strong, detailed prompts. The system automatically composes a complete, optimized prompt using the right format, context, and keywords—ready for Codex, Claude, or any AI coding platform.',
      results = 'This project showed that AI performance improves dramatically when humans are guided to express intent precisely. By shifting focus from better models to better prompts, Vinfotech enabled developers to get higher-quality AI code, faster and more consistently.',
      client_quote = 'Once developers started using the prompt tool, the AI suddenly became smarter. It wasn''t magic—it was clarity.',
      client_role = 'Engineering Lead, Vinfotech',
      hero_description = 'Guided prompt builder helping developers craft high-quality AI coding instructions'
    WHERE id = v_case_study_id;
    
    INSERT INTO case_study_ai_features (id, case_study_id, title, subtitle)
    VALUES (gen_random_uuid(), v_case_study_id, 'How AI Made It Possible', 'Intelligent prompt optimization for better AI code generation')
    RETURNING id INTO v_ai_features_id;
    
    INSERT INTO case_study_ai_feature_items (ai_features_id, icon, title, description, order_index) VALUES
    (v_ai_features_id, 'lightbulb', 'Prompt Intelligence Engine', 'Trained on hundreds of successful developer prompts from internal projects', 0),
    (v_ai_features_id, 'edit', 'LLM-Powered Rewriter', 'Converts incomplete user inputs into detailed, syntactically clear AI instructions', 1),
    (v_ai_features_id, 'code', 'Context Awareness', 'Adapts prompts based on selected language or environment (Python API vs React component)', 2),
    (v_ai_features_id, 'bar-chart', 'Evaluation Mode', 'Shows estimated "prompt quality score" to help developers improve further', 3),
    (v_ai_features_id, 'bookmark', 'Memory Templates', 'Allows teams to save and reuse prompt templates for recurring use cases', 4);
    
    INSERT INTO case_study_approach_timelines (id, case_study_id, title, subtitle)
    VALUES (gen_random_uuid(), v_case_study_id, 'Vinfotech''s Approach', 'Empowering developers with intelligent prompt engineering')
    RETURNING id INTO v_timeline_id;
    
    INSERT INTO case_study_approach_steps (timeline_id, title, description, order_index) VALUES
    (v_timeline_id, 'Root-Cause Research', 'Analyzed over 1,000 AI-code prompts from real developers to identify weak patterns', 0),
    (v_timeline_id, 'UI Design', 'Created clean, form-based interface with instant preview and quality scoring', 1),
    (v_timeline_id, 'Prompt Optimization', 'Combined rule-based logic with LLM refinement for natural phrasing', 2),
    (v_timeline_id, 'Integration', 'Made tool accessible via internal dashboards and browser extensions', 3),
    (v_timeline_id, 'Continuous Learning', 'Developer feedback helps fine-tune phrasing and scoring models over time', 4);
    
    INSERT INTO case_study_technologies (case_study_id, name, category, logo_url, display_order) VALUES
    (v_case_study_id, 'GPT-4 Turbo', 'AI/ML', NULL, 0),
    (v_case_study_id, 'Mistral 7B', 'AI/ML', NULL, 1),
    (v_case_study_id, 'LangChain', 'Framework', NULL, 2),
    (v_case_study_id, 'FastAPI', 'Backend', NULL, 3),
    (v_case_study_id, 'spaCy', 'NLP', NULL, 4),
    (v_case_study_id, 'React', 'Frontend', NULL, 5),
    (v_case_study_id, 'TypeScript', 'Language', NULL, 6),
    (v_case_study_id, 'AWS ECS', 'Infrastructure', NULL, 7),
    (v_case_study_id, 'Redis', 'Cache', NULL, 8);
    
    DELETE FROM case_study_metrics WHERE case_study_id = v_case_study_id;
    INSERT INTO case_study_metrics (case_study_id, label, value, display_order) VALUES
    (v_case_study_id, 'Success Rate Improvement', '65%', 0),
    (v_case_study_id, 'Hallucination Reduction', '50%', 1),
    (v_case_study_id, 'Prompt Build Speed', '5× Faster', 2),
    (v_case_study_id, 'Team Adoption', 'Multiple Teams', 3);
  END IF;
END $$;
