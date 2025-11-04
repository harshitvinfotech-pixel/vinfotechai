export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  hero_image: string;
  hero_description?: string;
  hero_background_image?: string;
  overview_image_url?: string;
  problem: string;
  solution: string;
  results?: string;
  client_quote?: string;
  client_name?: string;
  client_role?: string;
  tags: string[];
  industry?: string;
  overview_bullets?: string[];
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CaseStudyMetric {
  id: string;
  case_study_id: string;
  label: string;
  value: string;
  description?: string;
  display_order?: number;
}

export interface CaseStudyTechnology {
  id: string;
  case_study_id: string;
  name: string;
  category: string;
  display_order?: number;
}

export interface CaseStudyTimeline {
  id: string;
  case_study_id: string;
  phase: string;
  description: string;
  duration: string;
  display_order?: number;
}

export interface CaseStudyFeature {
  id: string;
  case_study_id: string;
  icon: string;
  title: string;
  description: string;
  display_order?: number;
}

export interface CaseStudyImage {
  id: string;
  case_study_id: string;
  image_url: string;
  caption?: string;
  type?: 'gallery' | 'content';
  alt_text?: string;
  display_order?: number;
}

export interface CaseStudyContentBlock {
  id: string;
  case_study_id: string;
  block_type: 'text' | 'image' | 'phone_mockup' | 'diagram' | 'metrics' | 'timeline' | 'features' | 'two_column';
  content: ContentBlockData;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export type ContentBlockData =
  | TextBlockData
  | ImageBlockData
  | PhoneMockupBlockData
  | DiagramBlockData
  | TwoColumnBlockData;

export interface TextBlockData {
  heading?: string;
  content: string;
  alignment?: 'left' | 'center' | 'right';
}

export interface ImageBlockData {
  image_url: string;
  caption?: string;
  alt_text?: string;
  size?: 'full' | 'large' | 'medium' | 'small';
}

export interface PhoneMockupBlockData {
  app_name?: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export interface DiagramBlockData {
  title?: string;
  description?: string;
  nodes: Array<{
    id: string;
    label: string;
    description: string;
    icon?: string;
    color?: string;
  }>;
}

export interface TwoColumnBlockData {
  left_content: string;
  right_content: string;
  image_url?: string;
  image_position?: 'left' | 'right';
}

export interface AIFeatureItem {
  icon: string;
  title: string;
  description: string;
  order_index: number;
}

export interface AIFeaturesSection {
  title: string;
  subtitle?: string;
  items: AIFeatureItem[];
}

export interface ApproachStep {
  title: string;
  description: string;
  order_index: number;
}

export interface ApproachTimelineSection {
  title: string;
  subtitle?: string;
  steps: ApproachStep[];
}

export interface CaseStudyWithDetails extends CaseStudy {
  content_blocks?: CaseStudyContentBlock[];
  metrics?: CaseStudyMetric[];
  technologies?: CaseStudyTechnology[];
  timeline?: CaseStudyTimeline[];
  features?: CaseStudyFeature[];
  images?: CaseStudyImage[];
  gallery_images?: CaseStudyImage[];
  ai_features?: AIFeaturesSection | null;
  approach_timeline?: ApproachTimelineSection | null;
}
