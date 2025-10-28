import { supabase } from './supabase';
import type { CaseStudy, CaseStudyWithDetails } from '../types/caseStudy';

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }

  return data || [];
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyWithDetails | null> {
  const { data: caseStudy, error: caseStudyError } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (caseStudyError || !caseStudy) {
    console.error('Error fetching case study:', caseStudyError);
    return null;
  }

  const [
    { data: metrics },
    { data: technologies },
    { data: timeline },
    { data: features },
    { data: images }
  ] = await Promise.all([
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
      .order('display_order', { ascending: true })
  ]);

  return {
    ...caseStudy,
    metrics: metrics || [],
    technologies: technologies || [],
    timeline: timeline || [],
    features: features || [],
    images: images || []
  };
}

export async function getSuggestedCaseStudies(
  currentSlug: string,
  tags: string[],
  limit: number = 3
): Promise<CaseStudy[]> {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .neq('slug', currentSlug)
    .order('display_order', { ascending: true })
    .limit(limit * 3);

  if (error || !data) {
    console.error('Error fetching suggested case studies:', error);
    return [];
  }

  const scoredStudies = data.map(study => {
    const matchingTags = study.tags.filter((tag: string) => tags.includes(tag));
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
