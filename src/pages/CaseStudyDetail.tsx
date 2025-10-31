import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCaseStudyBySlug, getSuggestedCaseStudies } from '../lib/caseStudies';
import type { CaseStudyWithDetails, CaseStudy } from '../types/caseStudy';
import HeroSection from '../components/case-study-sections/HeroSection';
import ChallengeSection from '../components/case-study-sections/ChallengeSection';
import SolutionSection from '../components/case-study-sections/SolutionSection';
import AIFeaturesSection from '../components/case-study-sections/AIFeaturesSection';
import ApproachSection from '../components/case-study-sections/ApproachSection';
import ImpactSection from '../components/case-study-sections/ImpactSection';
import TechStackSection from '../components/case-study-sections/TechStackSection';
import KeyTakeawaySection from '../components/case-study-sections/KeyTakeawaySection';
import ProductGallerySection from '../components/case-study-sections/ProductGallerySection';
import QuoteBannerSection from '../components/case-study-sections/QuoteBannerSection';
import RelatedCaseStudiesSection from '../components/case-study-sections/RelatedCaseStudiesSection';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState<CaseStudyWithDetails | null>(null);
  const [relatedStudies, setRelatedStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    async function loadCaseStudy() {
      if (!slug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const study = await getCaseStudyBySlug(slug);

      if (!study) {
        navigate('/');
        return;
      }

      setCaseStudy(study);
      const related = getSuggestedCaseStudies(slug, study.tags, 3);
      setRelatedStudies(related);
      setLoading(false);
    }

    loadCaseStudy();
  }, [slug, navigate]);

  const handleBackClick = () => {
    navigate('/', { state: { scrollTo: 'case-studies' } });
  };

  if (loading || !caseStudy) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header onQuoteClick={() => {}} />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#00B46A]"></div>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">Loading case study...</p>
          </div>
        </div>
      </div>
    );
  }

  const aiFeatures = caseStudy.features?.map(f => ({
    icon: f.icon,
    title: f.title,
    description: f.description
  })) || [];

  const approachTimeline = caseStudy.timeline?.map(t => ({
    title: t.phase,
    description: t.description
  })) || [];

  const impactMetrics = caseStudy.metrics?.map(m => ({
    value: m.value,
    label: m.label
  })) || [];

  const techStack = caseStudy.technologies?.map(t => ({
    icon: t.category.toLowerCase(),
    name: t.name
  })) || [];

  const galleryImages = caseStudy.gallery_images?.map(img => img.image_url) || [];

  const relatedStudiesData = relatedStudies.map(study => ({
    slug: study.slug,
    image: study.hero_image,
    title: study.title
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header onQuoteClick={() => {}} />

      <div className="relative">
        <div className="absolute top-8 left-4 sm:left-8 z-50">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 group border border-white/30"
          >
            <ArrowLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-semibold">Back</span>
          </button>
        </div>

        <HeroSection
          heroImage={caseStudy.hero_background_image || caseStudy.hero_image}
          title={caseStudy.title}
          overviewText={caseStudy.hero_description || caseStudy.subtitle || ''}
        />
      </div>

      <main>
        <ChallengeSection
          challengeImage={caseStudy.overview_image_url || caseStudy.hero_image}
          challengeText={caseStudy.challenge || caseStudy.problem}
        />

        <SolutionSection
          solutionText={caseStudy.solution}
          solutionImage={caseStudy.hero_image}
        />

        {aiFeatures.length > 0 && (
          <AIFeaturesSection aiFeatures={aiFeatures} />
        )}

        {approachTimeline.length > 0 && (
          <ApproachSection approachTimeline={approachTimeline} />
        )}

        {impactMetrics.length > 0 && (
          <ImpactSection impactMetrics={impactMetrics} />
        )}

        {techStack.length > 0 && (
          <TechStackSection techStack={techStack} />
        )}

        {caseStudy.results && (
          <KeyTakeawaySection takeawayText={caseStudy.results} />
        )}

        {galleryImages.length > 0 && (
          <ProductGallerySection galleryImages={galleryImages} />
        )}

        {caseStudy.client_quote && (
          <QuoteBannerSection
            quoteText={caseStudy.client_quote}
            quoteAttribution={caseStudy.client_name || ''}
          />
        )}

        {relatedStudiesData.length > 0 && (
          <RelatedCaseStudiesSection relatedStudies={relatedStudiesData} />
        )}
      </main>

      <Footer />
    </div>
  );
}
