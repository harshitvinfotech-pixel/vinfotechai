/*
  # Populate All Case Studies with Complete Data

  This migration populates all case studies with comprehensive data for all sections:
  - Hero section (title, description, background image)
  - Overview section
  - Challenge section
  - Solution section
  - AI Features (How AI Made It Possible)
  - Approach Timeline (Vinfotech's Approach)
  - Impact Metrics
  - Technology Stack
  - Key Takeaway
  - Gallery Images
  - Client Quote

  Case Studies:
  1. Autonomous Enterprise Sales Agent
  2. Vision-Based Attendance & Productivity Monitoring
  3. Live Sports Auto-Prediction Engine
  4. Fintech Daily Market Quiz Engine
  5. Integrated Site Safety & Security Vision AI
  6. iGaming Executive Insight Agent
  7. Developer Prompt Optimization Tool
*/

-- Clear existing data to avoid duplicates
DELETE FROM case_study_gallery_images WHERE case_study_id IN (
  SELECT id FROM case_studies WHERE slug IN (
    'autonomous-enterprise-sales-agent',
    'vision-based-attendance-monitoring',
    'live-sports-auto-prediction-engine',
    'fintech-daily-market-quiz-engine',
    'integrated-site-safety-security-vision-ai',
    'igaming-executive-insight-agent',
    'developer-prompt-optimization-tool'
  )
);

DELETE FROM case_study_tech_stack WHERE case_study_id IN (
  SELECT id FROM case_studies WHERE slug IN (
    'autonomous-enterprise-sales-agent',
    'vision-based-attendance-monitoring',
    'live-sports-auto-prediction-engine',
    'fintech-daily-market-quiz-engine',
    'integrated-site-safety-security-vision-ai',
    'igaming-executive-insight-agent',
    'developer-prompt-optimization-tool'
  )
);

DELETE FROM case_study_timeline WHERE case_study_id IN (
  SELECT id FROM case_studies WHERE slug IN (
    'autonomous-enterprise-sales-agent',
    'vision-based-attendance-monitoring',
    'live-sports-auto-prediction-engine',
    'fintech-daily-market-quiz-engine',
    'integrated-site-safety-security-vision-ai',
    'igaming-executive-insight-agent',
    'developer-prompt-optimization-tool'
  )
);

DELETE FROM case_study_metrics WHERE case_study_id IN (
  SELECT id FROM case_studies WHERE slug IN (
    'autonomous-enterprise-sales-agent',
    'vision-based-attendance-monitoring',
    'live-sports-auto-prediction-engine',
    'fintech-daily-market-quiz-engine',
    'integrated-site-safety-security-vision-ai',
    'igaming-executive-insight-agent',
    'developer-prompt-optimization-tool'
  )
);

DELETE FROM case_study_features WHERE case_study_id IN (
  SELECT id FROM case_studies WHERE slug IN (
    'autonomous-enterprise-sales-agent',
    'vision-based-attendance-monitoring',
    'live-sports-auto-prediction-engine',
    'fintech-daily-market-quiz-engine',
    'integrated-site-safety-security-vision-ai',
    'igaming-executive-insight-agent',
    'developer-prompt-optimization-tool'
  )
);

DELETE FROM case_studies WHERE slug IN (
  'autonomous-enterprise-sales-agent',
  'vision-based-attendance-monitoring',
  'live-sports-auto-prediction-engine',
  'fintech-daily-market-quiz-engine',
  'integrated-site-safety-security-vision-ai',
  'igaming-executive-insight-agent',
  'developer-prompt-optimization-tool'
);

-- Case Study 1: Autonomous Enterprise Sales Agent
INSERT INTO case_studies (
  title, slug, subtitle, category, hero_image, hero_background_image, hero_description,
  problem, challenge, solution, results, client_name, client_quote, overview_image_url, published
) VALUES (
  'Autonomous Enterprise Sales Agent',
  'autonomous-enterprise-sales-agent',
  'AI-powered sales assistant providing 24/7 customer support',
  'AI Agents',
  '/ai-bot.png',
  '/AI AgentsData to Decisive Action.jpg',
  'Vinfotech built its own Autonomous AI Sales Agent that provides accurate, contextual, and cited responses instantly, available 24/7 on the website.',
  'Every day, potential clients visit the Vinfotech website with questions about pricing, timelines, integrations, technologies, or specific product capabilities. Earlier, these inquiries often required manual intervention or follow-ups from the sales team.',
  'Even for a technology company, handling complex inbound queries efficiently was difficult. Visitors asked questions that required digging through sales manuals and product PDFs, project documentation, internal spreadsheets (pricing, delivery timelines), and web pages and feature listings. Human responses were slow and inconsistent. The challenge was to automate product Q&A and pre-sales support without losing accuracy or brand tone.',
  'Vinfotech developed an Enterprise RAG-powered AI Sales Agent — an intelligent, conversational assistant trained on both structured and unstructured company knowledge. When a visitor asks a question, the agent searches across internal documents, pricing sheets, and web pages, synthesizes a verified, human-like answer with citations to the source documents, and offers relevant follow-up questions to guide the visitor deeper. The agent runs fully autonomously, providing reliable responses without needing manual approval.',
  'This internal project proved how Enterprise RAG and AI agents can revolutionize pre-sales and support. The system delivers factual, cited, and human-quality answers around the clock — allowing sales teams to focus on relationship-building rather than repetitive responses.',
  'Head of Growth, Vinfotech',
  'Our AI Sales Agent has become the most reliable member of our sales team — accurate, tireless, and always on message.',
  '/ai-bot.png',
  true
);

-- Get the case study ID for reference
DO $$
DECLARE
  sales_agent_id uuid;
BEGIN
  SELECT id INTO sales_agent_id FROM case_studies WHERE slug = 'autonomous-enterprise-sales-agent';

  -- AI Features
  INSERT INTO case_study_ai_features (case_study_id, title, subtitle, items) VALUES (
    sales_agent_id,
    'How AI Made It Possible',
    'Traditional chatbots relied on predefined flows and couldn''t handle nuanced, domain-specific questions. This solution leveraged AI to read and reason, not just match keywords.',
    jsonb_build_array(
      jsonb_build_object('icon', 'database', 'title', 'RAG on Mixed Data Types', 'description', 'Combined website text, manuals (PDFs), spreadsheets, and live DB entries into a unified knowledge base'),
      jsonb_build_object('icon', 'search', 'title', 'Context-Preserving Retrieval', 'description', 'Used vector search + reranking for highly specific responses with accurate context'),
      jsonb_build_object('icon', 'link', 'title', 'Citation-First Policy', 'description', 'Every answer links back to a verified internal document or URL for transparency'),
      jsonb_build_object('icon', 'message-square', 'title', 'Adaptive Tone', 'description', 'Prompts tuned to match the company''s professional but approachable brand voice'),
      jsonb_build_object('icon', 'refresh-cw', 'title', 'Continuous Learning', 'description', 'New content and FAQs are automatically indexed each night for up-to-date responses')
    )
  );

  -- Approach Timeline
  INSERT INTO case_study_approach_timeline (case_study_id, title, subtitle, steps) VALUES (
    sales_agent_id,
    'Vinfotech''s Approach',
    'Our systematic approach to building enterprise-grade AI solutions',
    jsonb_build_array(
      jsonb_build_object('title', 'Knowledge Integration', 'description', 'Unified over 10 years of documentation, proposals, and website content into one searchable knowledge base'),
      jsonb_build_object('title', 'RAG Architecture', 'description', 'Built using LangChain and pgvector, connected to both PostgreSQL and Notion/Markdown sources'),
      jsonb_build_object('title', 'LLM Layer', 'description', 'GPT-4 Turbo for reasoning, fine-tuned with retrieval-grounding; backed by fallback models (Mistral 7B) for uptime'),
      jsonb_build_object('title', 'Frontend Implementation', 'description', 'Embedded a fast, search-bar-style chat interface directly on the Vinfotech homepage with streaming responses'),
      jsonb_build_object('title', 'Governance & Quality', 'description', 'All answers logged and scored against accuracy and response time metrics for weekly refinement')
    )
  );

  -- Impact Metrics
  INSERT INTO case_study_metrics (case_study_id, value, label, order_index) VALUES
    (sales_agent_id, '< 2 sec', 'Response Time', 1),
    (sales_agent_id, '94%', 'Answer Accuracy', 2),
    (sales_agent_id, '70%', 'Reduction in Manual Responses', 3),
    (sales_agent_id, '2.3×', 'Longer Sessions', 4),
    (sales_agent_id, '35%', 'More Conversions', 5),
    (sales_agent_id, '24/7', 'Availability', 6);

  -- Technology Stack
  INSERT INTO case_study_tech_stack (case_study_id, name, category, description, logo_url) VALUES
    (sales_agent_id, 'GPT-4 Turbo', 'AI/ML', 'Primary LLM', null),
    (sales_agent_id, 'Mistral 7B', 'AI/ML', 'Backup Model', null),
    (sales_agent_id, 'LangChain', 'AI/ML', 'RAG Framework', null),
    (sales_agent_id, 'pgvector', 'Database', 'Vector Search', null),
    (sales_agent_id, 'ElasticSearch', 'Search', 'Text Search', null),
    (sales_agent_id, 'React', 'Frontend', 'UI Framework', null),
    (sales_agent_id, 'Next.js', 'Frontend', 'React Framework', null),
    (sales_agent_id, 'AWS ECS', 'Infrastructure', 'Container Service', null),
    (sales_agent_id, 'Redis', 'Backend', 'Cache Layer', null);

  -- Gallery Images
  INSERT INTO case_study_gallery_images (case_study_id, image_url, caption, order_index) VALUES
    (sales_agent_id, '/1.1.jpg', 'Chat Interface', 1),
    (sales_agent_id, '/2.2.jpg', 'Response Analytics', 2),
    (sales_agent_id, '/3.3.jpg', 'Knowledge Base Dashboard', 3);
END $$;

-- Case Study 2: Vision-Based Attendance Monitoring
INSERT INTO case_studies (
  title, slug, subtitle, category, hero_image, hero_background_image, hero_description,
  problem, challenge, solution, results, client_name, client_quote, overview_image_url, published
) VALUES (
  'Vision-Based Attendance & Productivity Monitoring',
  'vision-based-attendance-monitoring',
  'AI-powered attendance and workplace analytics system',
  'Computer Vision',
  '/vinfo-img.jpeg',
  '/AI & Computer Vision for Visual Data.jpg',
  'Vinfotech implemented a Computer Vision-powered attendance and workplace analytics system that records presence, monitors zone activity, and generates automated reports—completely hands-free.',
  'In a dynamic software company with over 100 professionals across multiple departments, manual attendance tracking and productivity monitoring were both time-consuming and error-prone.',
  'The organization relied on swipe-based or biometric attendance systems. These methods caused delays during check-ins and check-outs, missed logs when employees forgot to mark attendance, no visibility into break durations or overall floor occupancy, and manual effort in reconciling attendance with payroll or shift logs. The goal was to automate attendance and understand workplace utilization without adding any friction for team members.',
  'Vinfotech deployed a real-time Computer Vision system that identifies employees through facial recognition and tracks their presence across different zones in the office. The solution included entry/exit monitoring where cameras at gates automatically mark attendance as employees walk in or out, zone tracking with cameras in work areas and meeting rooms mapping occupancy in real time, break-time analysis identifying extended idle periods and patterns, and instant alerts for unusual activity. The entire setup runs seamlessly on existing camera infrastructure.',
  'This deployment showed how Computer Vision can quietly modernize everyday workflows inside a digital workplace. By turning ordinary CCTV cameras into intelligent sensors, Vinfotech helped its own operations become more transparent, efficient, and data-driven—without compromising employee experience or privacy.',
  'Operations Head, Vinfotech',
  'Attendance just happens in the background now. What we gained is real visibility into how teams actually use their time and spaces.',
  '/vinfo-img.jpeg',
  true
);

DO $$
DECLARE
  attendance_id uuid;
BEGIN
  SELECT id INTO attendance_id FROM case_studies WHERE slug = 'vision-based-attendance-monitoring';

  INSERT INTO case_study_ai_features (case_study_id, title, subtitle, items) VALUES (
    attendance_id,
    'How AI Made It Possible',
    'Traditional attendance systems required manual intervention. Computer Vision made it completely hands-free.',
    jsonb_build_array(
      jsonb_build_object('icon', 'user-check', 'title', 'Face Recognition Pipeline', 'description', 'Trained on internal image data with strong privacy filters and on-device anonymization'),
      jsonb_build_object('icon', 'users', 'title', 'Multi-Camera Re-Identification', 'description', 'Matches individuals across angles and rooms using appearance embeddings and temporal logic'),
      jsonb_build_object('icon', 'server', 'title', 'Edge-Cloud Architecture', 'description', 'Low-latency recognition at the edge, with summary analytics pushed to the cloud'),
      jsonb_build_object('icon', 'activity', 'title', 'Event Analytics Layer', 'description', 'Converts raw detections into human-readable events with timestamps'),
      jsonb_build_object('icon', 'shield', 'title', 'Privacy-by-Design', 'description', 'No continuous video storage; only metadata and encoded face signatures retained')
    )
  );

  INSERT INTO case_study_approach_timeline (case_study_id, title, subtitle, steps) VALUES (
    attendance_id,
    'Vinfotech''s Approach',
    'Building a privacy-first, accurate attendance system',
    jsonb_build_array(
      jsonb_build_object('title', 'Feasibility Study', 'description', 'Evaluated camera positions, lighting conditions, and data-privacy implications'),
      jsonb_build_object('title', 'Model Training', 'description', 'Developed an in-house face-embedding model optimized for top-view and low-angle cameras typical in office setups'),
      jsonb_build_object('title', 'System Integration', 'description', 'Synced attendance data with HRMS and access-control systems'),
      jsonb_build_object('title', 'Analytics Dashboards', 'description', 'Built visual dashboards displaying live occupancy, average working hours, and productivity trends'),
      jsonb_build_object('title', 'Testing & Calibration', 'description', 'Conducted multi-week validation to fine-tune recognition confidence and reduce false matches below 1%')
    )
  );

  INSERT INTO case_study_metrics (case_study_id, value, label, order_index) VALUES
    (attendance_id, '100%', 'Hands-Free', 1),
    (attendance_id, '>95%', 'Recognition Accuracy', 2),
    (attendance_id, '60%', 'Faster Reporting', 3),
    (attendance_id, 'Real-time', 'Occupancy Analytics', 4),
    (attendance_id, '<1%', 'False Matches', 5),
    (attendance_id, '24/7', 'Monitoring', 6);

  INSERT INTO case_study_tech_stack (case_study_id, name, category, description, logo_url) VALUES
    (attendance_id, 'YOLOv8', 'AI/ML', 'Object Detection', null),
    (attendance_id, 'DeepSORT', 'AI/ML', 'Object Tracking', null),
    (attendance_id, 'FaceNet', 'AI/ML', 'Face Recognition', null),
    (attendance_id, 'OpenCV', 'AI/ML', 'Computer Vision', null),
    (attendance_id, 'TensorRT', 'AI/ML', 'GPU Acceleration', null),
    (attendance_id, 'NVIDIA Jetson', 'Infrastructure', 'Edge Device', null),
    (attendance_id, 'PostgreSQL', 'Database', 'Primary Database', null),
    (attendance_id, 'Redis', 'Backend', 'Cache Layer', null),
    (attendance_id, 'React', 'Frontend', 'Dashboard UI', null);

  INSERT INTO case_study_gallery_images (case_study_id, image_url, caption, order_index) VALUES
    (attendance_id, '/4.4.jpg', 'Live Attendance Dashboard', 1),
    (attendance_id, '/5.5.jpg', 'Zone Occupancy View', 2),
    (attendance_id, '/6.6.jpg', 'Analytics Reports', 3);
END $$;

-- Case Study 3: Live Sports Auto-Prediction Engine
INSERT INTO case_studies (
  title, slug, subtitle, category, hero_image, hero_background_image, hero_description,
  problem, challenge, solution, results, client_name, client_quote, overview_image_url, published
) VALUES (
  'Live Sports Auto-Prediction Engine',
  'live-sports-auto-prediction-engine',
  'LLM-powered real-time cricket prediction questions',
  'AI for Text & Data',
  '/vinfo-img.jpeg',
  '/AI for Unstructured Text & Data.jpg',
  'Vinfotech created an LLM-powered Auto-Prediction Engine that analyzes real-time cricket match data and instantly generates contextual, prediction-ready questions.',
  'Live sports move fast. For engagement platforms and prediction markets, keeping up with the pace of play is everything.',
  'Traditional sports predictors rely on manual content creation. During live matches, editors struggled to frame questions quickly enough for rapidly changing situations, avoid repetitive or irrelevant questions, and maintain excitement with context-aware predictions linked to real match moments. The challenge: Could an AI system understand live cricket dynamics and autonomously craft engaging, high-quality questions in real time?',
  'Vinfotech designed an autonomous LLM engine integrated directly with live match data feeds. The system continuously reads match context—overs, player form, partnerships, pitch conditions, and momentum—and produces prediction questions. Each question includes context validation, difficulty & excitement rating based on match tension, and automatic tagging for prediction market integration. The AI ensures fans see new, meaningful interactions every few minutes.',
  'This project showcased how LLMs, when connected to structured live data, can create meaningful, time-sensitive fan experiences. It turned sports data into live, intelligent storytelling—automating content that used to require a human editorial team.',
  'Product Director, Vinfotech Sports Innovation',
  'The AI doesn''t just understand cricket data—it understands the story of the match. Every question feels timely, natural, and exciting.',
  '/vinfo-img.jpeg',
  true
);

DO $$
DECLARE
  sports_id uuid;
BEGIN
  SELECT id INTO sports_id FROM case_studies WHERE slug = 'live-sports-auto-prediction-engine';

  INSERT INTO case_study_ai_features (case_study_id, title, subtitle, items) VALUES (
    sports_id,
    'How AI Made It Possible',
    'Traditional systems couldn''t understand the narrative flow of live sports. AI made real-time storytelling possible.',
    jsonb_build_array(
      jsonb_build_object('icon', 'zap', 'title', 'LLM + Live Feed Fusion', 'description', 'Combined GPT-4 reasoning with structured match APIs (scorecards, commentary, player stats)'),
      jsonb_build_object('icon', 'target', 'title', 'Cricket-Specific Fine-tuning', 'description', 'Trained on thousands of historical matches to learn pacing and excitement patterns'),
      jsonb_build_object('icon', 'filter', 'title', 'Context Filters', 'description', 'Guardrails prevent low-value or repetitive questions once an event is resolved'),
      jsonb_build_object('icon', 'globe', 'title', 'Multi-Language Support', 'description', 'Generates English, Hindi, and regional language versions instantly'),
      jsonb_build_object('icon', 'trending-up', 'title', 'Continuous Evaluation', 'description', 'Measures engagement metrics to improve future prompts and excitement scoring')
    )
  );

  INSERT INTO case_study_approach_timeline (case_study_id, title, subtitle, steps) VALUES (
    sports_id,
    'Vinfotech''s Approach',
    'Building real-time intelligence for live sports',
    jsonb_build_array(
      jsonb_build_object('title', 'Data Integration', 'description', 'Ingested live ball-by-ball APIs and historical archives into a unified stream'),
      jsonb_build_object('title', 'Model Training', 'description', 'Fine-tuned an LLM on cricket commentary and fantasy game data to teach narrative understanding'),
      jsonb_build_object('title', 'Question Scoring Engine', 'description', 'Created a scoring layer that rates each potential question on novelty, difficulty, and engagement'),
      jsonb_build_object('title', 'Human Validation Loop', 'description', 'Editors reviewed early outputs; after confidence thresholds were reached, the model operated autonomously'),
      jsonb_build_object('title', 'Platform Deployment', 'description', 'Integrated with Prediction Market Platform to push new quizzes live in seconds')
    )
  );

  INSERT INTO case_study_metrics (case_study_id, value, label, order_index) VALUES
    (sports_id, '99%', 'Contextual Accuracy', 1),
    (sports_id, '90 sec', 'Question Generation', 2),
    (sports_id, '3×', 'Higher Engagement', 3),
    (sports_id, 'Zero', 'Manual Creation', 4),
    (sports_id, '100%', 'Automated', 5),
    (sports_id, 'Real-time', 'Updates', 6);

  INSERT INTO case_study_tech_stack (case_study_id, name, category, description, logo_url) VALUES
    (sports_id, 'GPT-4 Turbo', 'AI/ML', 'Primary LLM', null),
    (sports_id, 'Mistral 7B', 'AI/ML', 'Backup Model', null),
    (sports_id, 'LangChain', 'AI/ML', 'LLM Framework', null),
    (sports_id, 'FastAPI', 'Backend', 'API Framework', null),
    (sports_id, 'Redis', 'Backend', 'Queue System', null),
    (sports_id, 'PostgreSQL', 'Database', 'Data Storage', null),
    (sports_id, 'React', 'Frontend', 'Admin Interface', null),
    (sports_id, 'AWS ECS', 'Infrastructure', 'Container Service', null),
    (sports_id, 'WebSocket', 'Backend', 'Real-time Data', null);

  INSERT INTO case_study_gallery_images (case_study_id, image_url, caption, order_index) VALUES
    (sports_id, '/7.7.jpg', 'Live Question Dashboard', 1),
    (sports_id, '/8.8.jpg', 'Prediction Interface', 2),
    (sports_id, '/1.1.jpg', 'Analytics View', 3);
END $$;

-- Case Study 4: Fintech Daily Market Quiz Engine
INSERT INTO case_studies (
  title, slug, subtitle, category, hero_image, hero_background_image, hero_description,
  problem, challenge, solution, results, client_name, client_quote, overview_image_url, published
) VALUES (
  'Fintech Daily Market Quiz Engine',
  'fintech-daily-market-quiz-engine',
  'Automated quiz generation from market data',
  'AI for Text & Data',
  '/vinfo-img.jpeg',
  '/AI for Unstructured Text & Data.jpg',
  'Vinfotech developed a Daily Market Quiz Engine powered by LLMs that automatically transforms end-of-market data and financial news into smart, engaging quiz questions.',
  'Financial platforms want to educate users while keeping them engaged every single day. But producing fresh, relevant, and compliant quiz content from fast-moving markets is a constant challenge.',
  'Before AI, the content team manually wrote quizzes based on daily market movements. This process was slow, inconsistent, and limited to a handful of topics per day. They needed a solution that could understand market trends and corporate events, convert raw data and headlines into accurate quiz questions with valid options, maintain a light educational tone suitable for all audiences, and deliver new content automatically at the end of each trading day.',
  'Vinfotech built an LLM-based content generation engine that connects directly to daily market feeds and financial news APIs. At market close, the system parses closing data and stock movements, identifies interesting educational patterns, autogenerates quiz questions with four contextually correct options, enforces guardrails for factual accuracy and tone, and pushes ready-to-play quizzes directly to the engagement app.',
  'This project demonstrated how LLMs can merge live data, compliance, and creativity to solve a real business problem: producing endless high-quality content. By automating quiz generation, the platform turned market updates into an engaging daily ritual.',
  'Product Manager, Fintech Client',
  'Our quiz section went from a nice-to-have to our most visited feature. The AI keeps it fresh every single day.',
  '/vinfo-img.jpeg',
  true
);

DO $$
DECLARE
  fintech_id uuid;
BEGIN
  SELECT id INTO fintech_id FROM case_studies WHERE slug = 'fintech-daily-market-quiz-engine';

  INSERT INTO case_study_ai_features (case_study_id, title, subtitle, items) VALUES (
    fintech_id,
    'How AI Made It Possible',
    'Turning complex financial data into engaging, educational content automatically.',
    jsonb_build_array(
      jsonb_build_object('icon', 'bar-chart', 'title', 'Financial Context Understanding', 'description', 'LLM fine-tuned on market commentary, earnings reports, and sectoral news'),
      jsonb_build_object('icon', 'check-circle', 'title', 'Fact-Checking Loop', 'description', 'Retrieval layer verifies numbers and corporate facts from structured data before generation'),
      jsonb_build_object('icon', 'shield', 'title', 'Compliance Guardrails', 'description', 'Filters ensure questions stay non-advisory and educational'),
      jsonb_build_object('icon', 'clock', 'title', 'Auto-Scheduling', 'description', 'Quizzes go live at a fixed post-market time without human involvement'),
      jsonb_build_object('icon', 'smile', 'title', 'Tone Control', 'description', 'AI prompt templates maintain a balance between learning and fun')
    )
  );

  INSERT INTO case_study_approach_timeline (case_study_id, title, subtitle, steps) VALUES (
    fintech_id,
    'Vinfotech''s Approach',
    'Building compliant, educational financial content automation',
    jsonb_build_array(
      jsonb_build_object('title', 'Data Pipeline', 'description', 'Integrated live market data APIs, RSS feeds, and news aggregators'),
      jsonb_build_object('title', 'LLM Workflow', 'description', 'Combined structured feed parsing with question-generation LLM and validation layer'),
      jsonb_build_object('title', 'Evaluation Metrics', 'description', 'Implemented daily review dashboards tracking factual accuracy and engagement'),
      jsonb_build_object('title', 'Frontend Integration', 'description', 'Delivered quizzes via responsive widget with leaderboards and progress badges'),
      jsonb_build_object('title', 'Continuous Tuning', 'description', 'Collected user reactions and engagement stats to fine-tune prompts')
    )
  );

  INSERT INTO case_study_metrics (case_study_id, value, label, order_index) VALUES
    (fintech_id, '100%', 'Automated', 1),
    (fintech_id, '>95%', 'Factual Accuracy', 2),
    (fintech_id, '3×', 'More DAU', 3),
    (fintech_id, '1000+', 'Questions/Month', 4),
    (fintech_id, 'Zero', 'Downtime', 5),
    (fintech_id, 'Daily', 'Fresh Content', 6);

  INSERT INTO case_study_tech_stack (case_study_id, name, category, description, logo_url) VALUES
    (fintech_id, 'GPT-4 Turbo', 'AI/ML', 'Question Generation', null),
    (fintech_id, 'Mistral 7B', 'AI/ML', 'Backup Model', null),
    (fintech_id, 'LangChain', 'AI/ML', 'LLM Framework', null),
    (fintech_id, 'FastAPI', 'Backend', 'API Framework', null),
    (fintech_id, 'Redis', 'Backend', 'Queue System', null),
    (fintech_id, 'PostgreSQL', 'Database', 'Data Storage', null),
    (fintech_id, 'React', 'Frontend', 'Quiz Widget', null),
    (fintech_id, 'Node.js', 'Backend', 'Server Runtime', null),
    (fintech_id, 'AWS ECS', 'Infrastructure', 'Hosting', null);

  INSERT INTO case_study_gallery_images (case_study_id, image_url, caption, order_index) VALUES
    (fintech_id, '/2.2.jpg', 'Quiz Interface', 1),
    (fintech_id, '/3.3.jpg', 'Leaderboard View', 2),
    (fintech_id, '/4.4.jpg', 'Admin Dashboard', 3);
END $$;

-- Case Study 5: Integrated Site Safety & Security Vision AI
INSERT INTO case_studies (
  title, slug, subtitle, category, hero_image, hero_background_image, hero_description,
  problem, challenge, solution, results, client_name, client_quote, overview_image_url, published
) VALUES (
  'Integrated Site Safety & Security Vision AI',
  'integrated-site-safety-security-vision-ai',
  'Multi-camera AI for safety and security monitoring',
  'Computer Vision',
  '/vinfo-img.jpeg',
  '/AI & Computer Vision for Visual Data.jpg',
  'Vinfotech deployed an AI-powered Computer Vision system that continuously monitors for intrusion, fire, and PPE compliance, sending instant alerts through a visually rich dashboard.',
  'In a large edible oil manufacturing facility, ensuring safety and security across multiple zones—production floors, storage areas, and perimeters—was a constant challenge.',
  'The factory needed a unified solution to address multiple risks: detect unauthorized access or intrusion in restricted areas, ensure all workers wore mandatory safety gear (PPE) in designated zones, identify early signs of fire or smoke using regular CCTV cameras, and provide real-time, actionable alerts that were easy to review and respond to. Existing security cameras captured footage but offered no intelligence—issues were often discovered after the fact.',
  'Vinfotech implemented a multi-camera Computer Vision platform that transformed passive CCTV infrastructure into an intelligent safety network. The solution included intrusion detection with automated push alerts, fire & smoke recognition with AI models trained to identify patterns instantly, PPE compliance monitoring tracking workers continuously, a configurable rule engine for custom alert conditions, and an Instagram-style alert feed making incident review fast and intuitive.',
  'This deployment showed how AI can turn ordinary cameras into intelligent safety tools, offering multi-layered protection for factories without expensive hardware upgrades. The combination of visual alert feeds, rule-based automation, and real-time detection gave the factory complete situational awareness.',
  'Plant Head, Edible Oil Manufacturing Facility',
  'We no longer wait for someone to review camera footage—alerts come in instantly, and the feed makes it easy to act within seconds.',
  '/vinfo-img.jpeg',
  true
);

DO $$
DECLARE
  safety_id uuid;
BEGIN
  SELECT id INTO safety_id FROM case_studies WHERE slug = 'integrated-site-safety-security-vision-ai';

  INSERT INTO case_study_ai_features (case_study_id, title, subtitle, items) VALUES (
    safety_id,
    'How AI Made It Possible',
    'Turning passive cameras into active safety monitoring systems.',
    jsonb_build_array(
      jsonb_build_object('icon', 'target', 'title', 'Multi-Object Detection', 'description', 'YOLOv8 and Detectron2 models trained on factory-specific data'),
      jsonb_build_object('icon', 'map', 'title', 'Zone-Based Mapping', 'description', 'Each camera geo-tagged to identify exact zone and alert priority'),
      jsonb_build_object('icon', 'settings', 'title', 'Custom Rule Framework', 'description', 'Allowed business users to set conditions without coding'),
      jsonb_build_object('icon', 'flame', 'title', 'Smoke & Fire Detection', 'description', 'Combined motion and color pattern recognition for higher sensitivity'),
      jsonb_build_object('icon', 'zap', 'title', 'Edge Processing', 'description', 'Local inference on NVIDIA Jetson devices for low latency and privacy')
    )
  );

  INSERT INTO case_study_approach_timeline (case_study_id, title, subtitle, steps) VALUES (
    safety_id,
    'Vinfotech''s Approach',
    'Building comprehensive safety monitoring',
    jsonb_build_array(
      jsonb_build_object('title', 'Site Survey', 'description', 'Mapped all critical zones and existing camera angles'),
      jsonb_build_object('title', 'Model Adaptation', 'description', 'Fine-tuned pre-trained vision models with factory-specific lighting and conditions'),
      jsonb_build_object('title', 'Unified Dashboard', 'description', 'Designed an elegant, real-time feed for security teams to act quickly'),
      jsonb_build_object('title', 'System Integration', 'description', 'Connected alerts with email, SMS, and WhatsApp for instant notifications'),
      jsonb_build_object('title', 'Performance Tuning', 'description', 'Reduced false positives below 3% through continuous calibration')
    )
  );

  INSERT INTO case_study_metrics (case_study_id, value, label, order_index) VALUES
    (safety_id, '25+', 'Cameras Monitored', 1),
    (safety_id, '>95%', 'Detection Accuracy', 2),
    (safety_id, '< 2 sec', 'Alert Latency', 3),
    (safety_id, 'Zero', 'Missed Incidents', 4),
    (safety_id, '60%', 'Faster Response', 5),
    (safety_id, '24/7', 'Monitoring', 6);

  INSERT INTO case_study_tech_stack (case_study_id, name, category, description, logo_url) VALUES
    (safety_id, 'YOLOv8', 'AI/ML', 'Object Detection', null),
    (safety_id, 'Detectron2', 'AI/ML', 'Instance Segmentation', null),
    (safety_id, 'OpenCV', 'AI/ML', 'Computer Vision', null),
    (safety_id, 'PyTorch', 'AI/ML', 'Deep Learning', null),
    (safety_id, 'TensorRT', 'AI/ML', 'Inference Optimization', null),
    (safety_id, 'NVIDIA Jetson', 'Infrastructure', 'Edge Device', null),
    (safety_id, 'PostgreSQL', 'Database', 'Data Storage', null),
    (safety_id, 'Redis', 'Backend', 'Real-time Cache', null),
    (safety_id, 'React', 'Frontend', 'Alert Dashboard', null);

  INSERT INTO case_study_gallery_images (case_study_id, image_url, caption, order_index) VALUES
    (safety_id, '/5.5.jpg', 'Alert Feed Dashboard', 1),
    (safety_id, '/6.6.jpg', 'PPE Detection View', 2),
    (safety_id, '/7.7.jpg', 'Fire Detection Alert', 3);
END $$;

-- Case Study 6: iGaming Executive Insight Agent
INSERT INTO case_studies (
  title, slug, subtitle, category, hero_image, hero_background_image, hero_description,
  problem, challenge, solution, results, client_name, client_quote, overview_image_url, published
) VALUES (
  'iGaming Executive Insight Agent',
  'igaming-executive-insight-agent',
  'AI-powered business intelligence for gaming platforms',
  'AI Agents',
  '/ai-bot.png',
  '/AI AgentsData to Decisive Action.jpg',
  'Vinfotech built an AI-powered Executive Insight Agent that turns raw admin data into daily summaries, trend analysis, and decision-ready insights.',
  'Every iGaming operator has admin panels loaded with reports, KPIs, and charts. But when every metric is visible, nothing truly stands out.',
  'The client''s admin system had hundreds of dashboards covering revenue, deposits, churn, bonuses, and engagement. Yet executives struggled to answer basic questions like: What changed most since yesterday? Which user segment is showing early churn signals? Where is marketing spend under-performing? Despite having abundant data, decision-makers were still spending time interpreting, not acting.',
  'Vinfotech built an AI Agent layer on top of the admin data pipeline. This agent uses LLMs to interpret daily numbers, identify anomalies, and summarize business impact in plain language. Each morning, the executive team sees a concise daily summary, highlight cards, positive insights and red-flag alerts, and custom focus areas. The AI acts as a virtual business analyst that never sleeps.',
  'This project demonstrated that data visibility isn''t enough—interpretation is the real superpower. By layering AI interpretation on top of existing dashboards, Vinfotech turned a dense admin panel into a daily decision assistant.',
  'COO, iGaming Client',
  'It''s like having a business analyst summarize the entire day''s performance every morning—without a single meeting.',
  '/ai-bot.png',
  true
);

DO $$
DECLARE
  igaming_id uuid;
BEGIN
  SELECT id INTO igaming_id FROM case_studies WHERE slug = 'igaming-executive-insight-agent';

  INSERT INTO case_study_ai_features (case_study_id, title, subtitle, items) VALUES (
    igaming_id,
    'How AI Made It Possible',
    'Transforming overwhelming data into clear, actionable insights.',
    jsonb_build_array(
      jsonb_build_object('icon', 'message-circle', 'title', 'Natural Language Analysis', 'description', 'LLMs interpret and describe trends using executive-friendly language'),
      jsonb_build_object('icon', 'alert-circle', 'title', 'Automated Anomaly Detection', 'description', 'ML models identify unusual changes in KPIs over time windows'),
      jsonb_build_object('icon', 'sliders', 'title', 'Customizable Focus', 'description', 'Decision-makers choose which metrics the agent tracks daily'),
      jsonb_build_object('icon', 'trending-up', 'title', 'Temporal Comparisons', 'description', 'Agent correlates current data with previous weeks or campaigns for context'),
      jsonb_build_object('icon', 'mail', 'title', 'Multi-Format Delivery', 'description', 'Insights appear in dashboard, via email, or chat integrations')
    )
  );

  INSERT INTO case_study_approach_timeline (case_study_id, title, subtitle, steps) VALUES (
    igaming_id,
    'Vinfotech''s Approach',
    'Building intelligent business intelligence',
    jsonb_build_array(
      jsonb_build_object('title', 'Data Assessment', 'description', 'Integrated with existing admin database and ETL pipeline'),
      jsonb_build_object('title', 'Insight Layer Design', 'description', 'Defined decision-making categories: Revenue, Retention, User Segments, Marketing'),
      jsonb_build_object('title', 'LLM Integration', 'description', 'GPT-4 Turbo fine-tuned with domain prompts for gaming metrics'),
      jsonb_build_object('title', 'UI/UX Development', 'description', 'Built clean insight feed showing Top Wins and Areas to Watch'),
      jsonb_build_object('title', 'Feedback Loop', 'description', 'Executives mark insights as useful to improve personalization')
    )
  );

  INSERT INTO case_study_metrics (case_study_id, value, label, order_index) VALUES
    (igaming_id, '80%', 'Less Time on Dashboards', 1),
    (igaming_id, 'Minutes', 'Decision Latency', 2),
    (igaming_id, '3×', 'Higher Clarity', 3),
    (igaming_id, '>90%', 'Daily Adoption', 4),
    (igaming_id, '100%', 'Data Trust', 5),
    (igaming_id, 'Daily', 'Insights', 6);

  INSERT INTO case_study_tech_stack (case_study_id, name, category, description, logo_url) VALUES
    (igaming_id, 'GPT-4 Turbo', 'AI/ML', 'Primary LLM', null),
    (igaming_id, 'Mistral 7B', 'AI/ML', 'Backup Model', null),
    (igaming_id, 'LangChain', 'AI/ML', 'LLM Framework', null),
    (igaming_id, 'PostgreSQL', 'Database', 'Data Storage', null),
    (igaming_id, 'Snowflake', 'Database', 'Data Warehouse', null),
    (igaming_id, 'ElasticSearch', 'Search', 'Data Indexing', null),
    (igaming_id, 'FastAPI', 'Backend', 'API Framework', null),
    (igaming_id, 'React', 'Frontend', 'Admin Portal', null),
    (igaming_id, 'AWS ECS', 'Infrastructure', 'Container Service', null);

  INSERT INTO case_study_gallery_images (case_study_id, image_url, caption, order_index) VALUES
    (igaming_id, '/8.8.jpg', 'Daily Insights Dashboard', 1),
    (igaming_id, '/1.1.jpg', 'Anomaly Alerts', 2),
    (igaming_id, '/2.2.jpg', 'Executive Summary View', 3);
END $$;

-- Case Study 7: Developer Prompt Optimization Tool
INSERT INTO case_studies (
  title, slug, subtitle, category, hero_image, hero_background_image, hero_description,
  problem, challenge, solution, results, client_name, client_quote, overview_image_url, published
) VALUES (
  'Developer Prompt Optimization Tool',
  'developer-prompt-optimization-tool',
  'Guided prompt builder for AI coding assistants',
  'AI for Text & Data',
  '/vinfo-img.jpeg',
  '/AI for Unstructured Text & Data.jpg',
  'Vinfotech built a Developer Prompt Optimization Tool — a guided system that helps engineers craft high-quality prompts for AI coding assistants.',
  'As AI coding tools become commonplace, developers often complain that AI doesn''t generate good code or it hallucinates. Vinfotech discovered that the problem wasn''t in the tools—it was in the prompts.',
  'AI-assisted development only works as well as the prompt behind it. Most developers are used to writing concise commands, not descriptive specifications. This led to poorly scoped or ambiguous AI instructions, repetitive trial-and-error cycles, and low-quality, incomplete, or hallucinated code outputs. The challenge: how do we help developers communicate better with AI, without slowing them down?',
  'Vinfotech built a custom prompt-builder widget that guides developers through creating strong, detailed prompts in seconds. The tool walks developers through structured fields like programming language, frameworks, input/output requirements, constraints, edge cases, and coding style. The system then automatically composes a complete, optimized prompt ready for any AI coding platform.',
  'This project showed that AI performance improves dramatically when humans are guided to express intent precisely. By shifting focus from better models to better prompts, Vinfotech enabled developers to get higher-quality AI code, faster and more consistently.',
  'Engineering Lead, Vinfotech',
  'Once developers started using the prompt tool, the AI suddenly became smarter. It wasn''t magic—it was clarity.',
  '/vinfo-img.jpeg',
  true
);

DO $$
DECLARE
  prompt_id uuid;
BEGIN
  SELECT id INTO prompt_id FROM case_studies WHERE slug = 'developer-prompt-optimization-tool';

  INSERT INTO case_study_ai_features (case_study_id, title, subtitle, items) VALUES (
    prompt_id,
    'How AI Made It Possible',
    'Helping developers communicate precisely with AI coding assistants.',
    jsonb_build_array(
      jsonb_build_object('icon', 'zap', 'title', 'Prompt Intelligence Engine', 'description', 'Trained on hundreds of successful developer prompts from internal projects'),
      jsonb_build_object('icon', 'edit', 'title', 'LLM-Powered Rewriter', 'description', 'Converts incomplete inputs into detailed, syntactically clear AI instructions'),
      jsonb_build_object('icon', 'code', 'title', 'Context Awareness', 'description', 'Adapts prompts based on selected language or environment'),
      jsonb_build_object('icon', 'check-square', 'title', 'Evaluation Mode', 'description', 'Shows estimated prompt quality score to help developers improve'),
      jsonb_build_object('icon', 'save', 'title', 'Memory Templates', 'description', 'Allows teams to save and reuse prompt templates for recurring use cases')
    )
  );

  INSERT INTO case_study_approach_timeline (case_study_id, title, subtitle, steps) VALUES (
    prompt_id,
    'Vinfotech''s Approach',
    'Building better prompts for better code',
    jsonb_build_array(
      jsonb_build_object('title', 'Root-Cause Research', 'description', 'Analyzed over 1,000 AI-code prompts to identify common weak patterns'),
      jsonb_build_object('title', 'UI Design', 'description', 'Created clean, form-based interface with instant preview and quality scoring'),
      jsonb_build_object('title', 'Optimization Engine', 'description', 'Combined rule-based logic with LLM refinement for natural phrasing'),
      jsonb_build_object('title', 'Tool Integration', 'description', 'Made accessible via internal dashboards and browser extensions'),
      jsonb_build_object('title', 'Continuous Learning', 'description', 'Developers'' feedback helps fine-tune phrasing and scoring models')
    )
  );

  INSERT INTO case_study_metrics (case_study_id, value, label, order_index) VALUES
    (prompt_id, '65%', 'Better Code Quality', 1),
    (prompt_id, '50%', 'Fewer Hallucinations', 2),
    (prompt_id, '5×', 'Faster Prompt Building', 3),
    (prompt_id, '100%', 'Standardized Quality', 4),
    (prompt_id, 'Multiple', 'Teams Adopted', 5),
    (prompt_id, 'Real-time', 'Quality Scoring', 6);

  INSERT INTO case_study_tech_stack (case_study_id, name, category, description, logo_url) VALUES
    (prompt_id, 'GPT-4 Turbo', 'AI/ML', 'Prompt Rewriter', null),
    (prompt_id, 'Mistral 7B', 'AI/ML', 'Backup Model', null),
    (prompt_id, 'LangChain', 'AI/ML', 'LLM Framework', null),
    (prompt_id, 'FastAPI', 'Backend', 'API Framework', null),
    (prompt_id, 'spaCy', 'AI/ML', 'NLP Processing', null),
    (prompt_id, 'React', 'Frontend', 'UI Framework', null),
    (prompt_id, 'TypeScript', 'Frontend', 'Type Safety', null),
    (prompt_id, 'AWS ECS', 'Infrastructure', 'Hosting', null),
    (prompt_id, 'Redis', 'Backend', 'Cache Layer', null);

  INSERT INTO case_study_gallery_images (case_study_id, image_url, caption, order_index) VALUES
    (prompt_id, '/3.3.jpg', 'Prompt Builder Interface', 1),
    (prompt_id, '/4.4.jpg', 'Quality Score View', 2),
    (prompt_id, '/5.5.jpg', 'Template Library', 3);
END $$;
