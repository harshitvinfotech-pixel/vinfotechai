# Case Study Management Guide

## Overview

The case study system is now fully dynamic and database-driven. Every case study follows the same page structure (Header > Hero > Content > Gallery > Suggestions > Footer), but the content is completely flexible and managed through Supabase.

## Page Structure (Fixed for All Case Studies)

1. **Header** - Site navigation with theme toggle
2. **Hero Section** - Full-width background image with title and description
3. **Dynamic Content Area** - Flexible content blocks (customizable per case study)
4. **Gallery Section** - Product images with lightbox
5. **Suggested Case Studies** - Related case studies (min 3)
6. **Footer** - Site footer

## Database Tables

### 1. `case_studies` (Main Table)

Core case study information:

```sql
-- Required fields
id                    UUID (auto-generated)
slug                  TEXT (unique, used in URL)
title                 TEXT
hero_image            TEXT (URL)
tags                  TEXT[] (array of tags)

-- Hero section fields
hero_description      TEXT (extended description for hero)
hero_background_image TEXT (full-width background, defaults to hero_image)

-- SEO fields
meta_title            TEXT (defaults to title)
meta_description      TEXT
og_image              TEXT (social media sharing image)

-- Additional fields
subtitle              TEXT
industry              TEXT
display_order         INTEGER
```

### 2. `case_study_content_blocks`

Flexible content blocks that appear between hero and gallery:

```sql
id              UUID
case_study_id   UUID (references case_studies)
block_type      TEXT (see Block Types below)
content         JSONB (block-specific data)
display_order   INTEGER (controls order of appearance)
```

#### Block Types:

**a) text** - Rich HTML content with optional heading
```json
{
  "heading": "Section Title",
  "content": "<p>HTML content here</p>",
  "alignment": "left|center|right"
}
```

**b) image** - Single image with caption
```json
{
  "image_url": "https://...",
  "caption": "Image description",
  "alt_text": "Accessibility text",
  "size": "full|large|medium|small"
}
```

**c) phone_mockup** - Mobile app interface preview
```json
{
  "app_name": "App Name",
  "messages": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi there!"}
  ]
}
```

**d) diagram** - Architecture or flow diagram
```json
{
  "title": "System Architecture",
  "description": "Brief description",
  "nodes": [
    {
      "id": "unique-id",
      "label": "Node Title",
      "description": "Node description",
      "color": "linear-gradient(...)"
    }
  ]
}
```

**e) metrics** - Displays metrics from `case_study_metrics` table

**f) timeline** - Displays timeline from `case_study_timeline` table

**g) features** - Displays features from `case_study_features` table

**h) two_column** - Two-column layout with optional image
```json
{
  "left_content": "<p>Left column HTML</p>",
  "right_content": "<p>Right column HTML</p>",
  "image_url": "https://...",
  "image_position": "left|right"
}
```

### 3. `case_study_metrics`

Key statistics to display:

```sql
id              UUID
case_study_id   UUID
label           TEXT (e.g., "Manual Responses")
value           TEXT (e.g., "70% Reduction")
description     TEXT (optional details)
display_order   INTEGER
```

### 4. `case_study_features`

Feature highlights:

```sql
id              UUID
case_study_id   UUID
icon            TEXT (icon name)
title           TEXT
description     TEXT
display_order   INTEGER
```

### 5. `case_study_timeline`

Project phases:

```sql
id              UUID
case_study_id   UUID
phase           TEXT (phase name)
description     TEXT
duration        TEXT (e.g., "2 weeks")
display_order   INTEGER
```

### 6. `case_study_images`

Gallery and content images:

```sql
id              UUID
case_study_id   UUID
image_url       TEXT
caption         TEXT (optional)
type            TEXT ('gallery' or 'content')
alt_text        TEXT (for accessibility)
display_order   INTEGER
```

**Note:** Only images with `type = 'gallery'` appear in the gallery section.

## How to Create a New Case Study

### Step 1: Create the Main Case Study

```sql
INSERT INTO case_studies (
  slug,
  title,
  subtitle,
  hero_image,
  hero_description,
  hero_background_image,
  tags,
  industry,
  meta_title,
  meta_description,
  og_image,
  display_order
) VALUES (
  'my-case-study-slug',
  'My Case Study Title',
  'Brief subtitle',
  'https://images.pexels.com/photo.jpg',
  'Extended description for hero section',
  'https://images.pexels.com/hero-background.jpg',
  ARRAY['AI', 'Automation', 'Enterprise'],
  'Technology',
  'My Case Study Title | Vinfotech',
  'SEO description here',
  'https://images.pexels.com/og-image.jpg',
  1
);
```

### Step 2: Add Content Blocks

```sql
-- Text block
INSERT INTO case_study_content_blocks (case_study_id, block_type, content, display_order)
VALUES (
  (SELECT id FROM case_studies WHERE slug = 'my-case-study-slug'),
  'text',
  '{"heading": "The Challenge", "content": "<p>Your HTML content here</p>", "alignment": "left"}'::jsonb,
  1
);

-- Metrics block
INSERT INTO case_study_content_blocks (case_study_id, block_type, content, display_order)
VALUES (
  (SELECT id FROM case_studies WHERE slug = 'my-case-study-slug'),
  'metrics',
  '{}'::jsonb,
  2
);

-- Diagram block
INSERT INTO case_study_content_blocks (case_study_id, block_type, content, display_order)
VALUES (
  (SELECT id FROM case_studies WHERE slug = 'my-case-study-slug'),
  'diagram',
  '{"title": "Architecture", "nodes": [...]}'::jsonb,
  3
);
```

### Step 3: Add Metrics (if using metrics block)

```sql
INSERT INTO case_study_metrics (case_study_id, label, value, description, display_order)
VALUES
  ((SELECT id FROM case_studies WHERE slug = 'my-case-study-slug'), '70% Faster', 'Processing Time', 'Reduced processing time by 70%', 1),
  ((SELECT id FROM case_studies WHERE slug = 'my-case-study-slug'), '99.9%', 'Uptime', 'Industry-leading reliability', 2);
```

### Step 4: Add Features (if using features block)

```sql
INSERT INTO case_study_features (case_study_id, icon, title, description, display_order)
VALUES
  ((SELECT id FROM case_studies WHERE slug = 'my-case-study-slug'), 'sparkles', 'Feature 1', 'Feature description', 1),
  ((SELECT id FROM case_studies WHERE slug = 'my-case-study-slug'), 'sparkles', 'Feature 2', 'Feature description', 2);
```

### Step 5: Add Gallery Images

```sql
INSERT INTO case_study_images (case_study_id, image_url, caption, type, alt_text, display_order)
VALUES
  ((SELECT id FROM case_studies WHERE slug = 'my-case-study-slug'), 'https://...', 'Dashboard view', 'gallery', 'Dashboard interface', 1),
  ((SELECT id FROM case_studies WHERE slug = 'my-case-study-slug'), 'https://...', 'Mobile app', 'gallery', 'Mobile interface', 2);
```

## Content Block Best Practices

1. **Order Matters**: Use `display_order` to control the sequence of content blocks
2. **Mix Block Types**: Combine different block types for engaging storytelling
3. **Use Metrics Early**: Show impact metrics near the top to capture attention
4. **Balance Text and Visuals**: Alternate between text and visual blocks
5. **End with Results**: Place outcome-focused content toward the end

## Example Content Flow

```
1. Text Block - "The Challenge" (display_order: 1)
2. Metrics Block - Key statistics (display_order: 2)
3. Text Block - "Our Solution" (display_order: 3)
4. Diagram Block - System architecture (display_order: 4)
5. Features Block - Key features (display_order: 5)
6. Two Column Block - Technical details (display_order: 6)
7. Text Block - "Results & Impact" (display_order: 7)
```

## Accessing Case Studies

- **List Page**: Home page, scroll to Case Studies section
- **Detail Page**: `/case-studies/{slug}`
- **Navigation**: Click any case study card or use "Back to Case Studies" button

## Theme Support

All components automatically support both light and dark themes using Tailwind's dark mode classes. No additional configuration needed.

## Mobile Optimization

The entire system is fully responsive:
- Hero section adjusts image and text sizing
- Content blocks stack properly on mobile
- Gallery uses touch-friendly grid layout
- Lightbox supports swipe gestures
- Navigation is mobile-optimized

## Tips for Content Management

1. **Image URLs**: Use high-quality images from Pexels or your own CDN
2. **HTML Content**: Keep HTML simple - use `<p>`, `<ul>`, `<li>`, `<strong>`, `<em>`
3. **Slugs**: Use lowercase, hyphen-separated (e.g., `my-case-study`)
4. **Tags**: Use consistent tags for better related suggestions
5. **Display Order**: Leave gaps (1, 10, 20) to easily insert content later

## Troubleshooting

### Case Study Not Showing
- Check `display_order` is set
- Verify `slug` is correct and unique
- Ensure required fields are filled

### Content Blocks Not Rendering
- Verify `case_study_id` matches parent case study
- Check `content` JSONB is valid JSON
- Ensure `block_type` is one of the supported types

### Gallery Images Not Appearing
- Confirm `type = 'gallery'` in case_study_images
- Check image URLs are accessible
- Verify `display_order` is set
