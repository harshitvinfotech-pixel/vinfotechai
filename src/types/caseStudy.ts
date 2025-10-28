export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  hero_image: string;
  problem: string;
  solution: string;
  results?: string;
  client_quote?: string;
  client_name?: string;
  client_role?: string;
  tags: string[];
  industry?: string;
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
  display_order?: number;
}

export interface CaseStudyWithDetails extends CaseStudy {
  metrics?: CaseStudyMetric[];
  technologies?: CaseStudyTechnology[];
  timeline?: CaseStudyTimeline[];
  features?: CaseStudyFeature[];
  images?: CaseStudyImage[];
}
