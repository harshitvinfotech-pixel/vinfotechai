import type { CaseStudy, CaseStudyWithDetails } from '../types/caseStudy';
import { caseStudiesData } from '../data/caseStudiesData';
import { supabase } from './supabase';

let caseStudiesCache: CaseStudy[] | null = null;
let caseStudyDetailsCache: Map<string, CaseStudyWithDetails> = new Map();

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  if (caseStudiesCache) {
    return caseStudiesCache;
  }
  try {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching case studies:', error);
      caseStudiesCache = caseStudiesData;
      return caseStudiesData;
    }

    caseStudiesCache = data || caseStudiesData;
    return caseStudiesCache;
  } catch (err) {
    console.error('Error fetching case studies:', err);
    return caseStudiesData;
  }
}

export function getAllCaseStudiesSync(): CaseStudy[] {
  return caseStudiesData;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyWithDetails | null> {
  if (caseStudyDetailsCache.has(slug)) {
    return caseStudyDetailsCache.get(slug)!;
  }

  try {
    const { data: caseStudy, error: caseStudyError } = await supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (caseStudyError || !caseStudy) {
      console.error('Error fetching case study:', caseStudyError);
      const fallbackStudy = caseStudiesData.find(cs => cs.slug === slug);
      if (!fallbackStudy) return null;
      return {
        ...fallbackStudy,
        content_blocks: [],
        metrics: [],
        technologies: [],
        timeline: [],
        features: [],
        images: [],
        gallery_images: [],
        ai_features: null,
        approach_timeline: null
      };
    }

    const [
      { data: contentBlocks },
      { data: metrics },
      { data: technologies },
      { data: timeline },
      { data: features },
      { data: images },
      { data: aiFeatures },
      { data: approachTimeline },
      { data: galleryImages }
    ] = await Promise.all([
      supabase
        .from('case_study_content_blocks')
        .select('*')
        .eq('case_study_id', caseStudy.id)
        .order('display_order', { ascending: true }),
      supabase
        .from('case_study_metrics')
        .select('*')
        .eq('case_study_id', caseStudy.id)
        .order('display_order', { ascending: true }),
      supabase
        .from('case_study_technologies')
        .select('*')
        .eq('case_study_id', caseStudy.id)
        .order('display_order', { ascending: true }),
      supabase
        .from('case_study_timeline')
        .select('*')
        .eq('case_study_id', caseStudy.id)
        .order('display_order', { ascending: true }),
      supabase
        .from('case_study_features')
        .select('*')
        .eq('case_study_id', caseStudy.id)
        .order('display_order', { ascending: true }),
      supabase
        .from('case_study_images')
        .select('*')
        .eq('case_study_id', caseStudy.id)
        .order('display_order', { ascending: true }),
      supabase
        .from('case_study_ai_features')
        .select(`
          *,
          items:case_study_ai_feature_items(*)
        `)
        .eq('case_study_id', caseStudy.id)
        .maybeSingle(),
      supabase
        .from('case_study_approach_timelines')
        .select(`
          *,
          steps:case_study_approach_steps(*)
        `)
        .eq('case_study_id', caseStudy.id)
        .maybeSingle(),
      supabase
        .from('case_study_gallery_images')
        .select('*')
        .eq('case_study_id', caseStudy.id)
        .order('order_index', { ascending: true })
    ]);

    const aiFeatureItems = aiFeatures?.items
      ? (aiFeatures.items as any[]).sort((a, b) => a.order_index - b.order_index)
      : [];

    const approachSteps = approachTimeline?.steps
      ? (approachTimeline.steps as any[]).sort((a, b) => a.order_index - b.order_index)
      : [];

    const fullCaseStudy = {
      ...caseStudy,
      content_blocks: contentBlocks || [],
      metrics: metrics || [],
      technologies: technologies || [],
      timeline: timeline || [],
      features: features || [],
      images: images || [],
      gallery_images: galleryImages || [],
      ai_features: aiFeatures ? {
        title: aiFeatures.title,
        subtitle: aiFeatures.subtitle,
        items: aiFeatureItems
      } : null,
      approach_timeline: approachTimeline ? {
        title: approachTimeline.title,
        subtitle: approachTimeline.subtitle,
        steps: approachSteps
      } : null
    };

    caseStudyDetailsCache.set(slug, fullCaseStudy);
    return fullCaseStudy;
  } catch (err) {
    console.error('Error fetching case study:', err);
    const caseStudy = caseStudiesData.find(cs => cs.slug === slug);
    if (!caseStudy) return null;
    return {
      ...caseStudy,
      content_blocks: [],
      metrics: [],
      technologies: [],
      timeline: [],
      features: [],
      images: [],
      gallery_images: [],
      ai_features: null,
      approach_timeline: null
    };
  }
}

export function getCaseStudyBySlugSync(slug: string): CaseStudyWithDetails | null {
  const caseStudy = caseStudiesData.find(cs => cs.slug === slug);

  if (!caseStudy) {
    return null;
  }

  return {
    ...caseStudy,
    content_blocks: [],
    metrics: [],
    technologies: [],
    timeline: [],
    features: [],
    images: [],
    gallery_images: [],
    ai_features: null,
    approach_timeline: null
  };
}

export function getSuggestedCaseStudies(
  currentSlug: string,
  tags: string[],
  limit: number = 3
): CaseStudy[] {
  const filtered = caseStudiesData.filter(cs => cs.slug !== currentSlug);

  const scoredStudies = filtered.map(study => {
    const matchingTags = study.tags.filter(tag => tags.includes(tag));
    return {
      ...study,
      score: matchingTags.length
    };
  });

  scoredStudies.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return (a.display_order || 0) - (b.display_order || 0);
  });

  return scoredStudies.slice(0, limit).map(({ score, ...study }) => study);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
