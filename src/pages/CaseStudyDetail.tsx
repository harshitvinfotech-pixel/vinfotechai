import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import QuoteForm from '../components/QuoteForm';
import QuoteSuccessConfirmation from '../components/QuoteSuccessConfirmation';
import PageMeta from '../components/PageMeta';
import { getCaseStudyBySlug, getCaseStudyBySlugSync } from '../lib/caseStudies';
import type { CaseStudyWithDetails } from '../types/caseStudy';
import HeroSection from '../components/case-study-sections/HeroSection';
import OverviewSection from '../components/case-study-sections/OverviewSection';
import ChallengeSection from '../components/case-study-sections/ChallengeSection';
import SolutionSection from '../components/case-study-sections/SolutionSection';
import AIFeaturesSection from '../components/case-study-sections/AIFeaturesSection';
import ApproachSection from '../components/case-study-sections/ApproachSection';
import ImpactSection from '../components/case-study-sections/ImpactSection';
import TechStackSection from '../components/case-study-sections/TechStackSection';
import KeyTakeawaySection from '../components/case-study-sections/KeyTakeawaySection';
import QuoteBannerSection from '../components/case-study-sections/QuoteBannerSection';
import HowAIMadeItPossibleSection from '../components/case-study-sections/HowAIMadeItPossibleSection';
import VinfotechApproachSection from '../components/case-study-sections/VinfotechApproachSection';
import OtherCaseStudiesSection from '../components/case-study-sections/OtherCaseStudiesSection';
import ProductGallerySection from '../components/case-study-sections/ProductGallerySection';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [showSuccessConfirmation, setShowSuccessConfirmation] = useState(false);

  const initialCaseStudy = useMemo(() => {
    return slug ? getCaseStudyBySlugSync(slug) : null;
  }, [slug]);

  const [caseStudy, setCaseStudy] = useState<CaseStudyWithDetails | null>(initialCaseStudy);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    async function loadCaseStudy() {
      if (!slug) return;

      const syncStudy = getCaseStudyBySlugSync(slug);
      if (syncStudy) {
        setCaseStudy(syncStudy);
      }

      const study = await getCaseStudyBySlug(slug);

      if (!study) {
        navigate('/');
        return;
      }

      setCaseStudy(study);
    }

    loadCaseStudy();
  }, [slug, navigate]);

  const handleBackClick = () => {
    navigate('/', { state: { scrollTo: 'case-studies' } });
  };

  const handleShowSuccessConfirmation = () => {
    setShowSuccessConfirmation(true);
  };

  const handleCloseSuccessConfirmation = () => {
    setShowSuccessConfirmation(false);
    setIsQuoteModalOpen(false);
  };

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 overflow-x-hidden">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B46A]"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading case study...</p>
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

  return (
    <>
      <PageMeta
        title={caseStudy.title}
        description={caseStudy.hero_description || caseStudy.problem}
        keywords={`${caseStudy.industry}, AI case study, ${caseStudy.technologies?.map(t => t.name).join(', ')}, machine learning`}
        ogImage={caseStudy.overview_image_url || caseStudy.hero_image}
      />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
        <style>{`
          * {
            scroll-behavior: smooth;
          }
          img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
          body {
            overflow-x: hidden;
          }
        `}</style>
        <Header onQuoteClick={() => setIsQuoteModalOpen(true)} />

      <div className="relative">
        <div className="absolute top-24 left-0 right-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
            <button
              onClick={handleBackClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 group border border-white/30 animate-[slideInLeft_0.5s_ease-out]"
            >
              <style>{`
                @keyframes slideInLeft {
                  from {
                    opacity: 0;
                    transform: translateX(-20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }
              `}</style>
              <ArrowLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-semibold">Back</span>
            </button>
          </div>
        </div>

        <HeroSection
          heroImage={caseStudy.hero_background_image || caseStudy.hero_image}
          title={caseStudy.title}
          overviewText={caseStudy.hero_description || caseStudy.subtitle || ''}
        />
      </div>

      <main>
        {caseStudy.problem && (
          <OverviewSection overviewText={caseStudy.problem} />
        )}

        <ChallengeSection
          challengeImage={caseStudy.overview_image_url || caseStudy.hero_image}
          challengeText={caseStudy.challenge || caseStudy.problem}
        />

        <SolutionSection
          solutionText={caseStudy.solution}
          solutionImage={caseStudy.hero_image}
          slug={slug}
        />

        {caseStudy.ai_features && caseStudy.ai_features.items.length > 0 && (
          <HowAIMadeItPossibleSection
            title={caseStudy.ai_features.title}
            subtitle={caseStudy.ai_features.subtitle}
            features={caseStudy.ai_features.items}
          />
        )}

        {caseStudy.gallery_images && caseStudy.gallery_images.length > 0 && (
          <ProductGallerySection images={caseStudy.gallery_images} />
        )}

        {caseStudy.approach_timeline && caseStudy.approach_timeline.steps.length > 0 && (
          <VinfotechApproachSection
            title={caseStudy.approach_timeline.title}
            subtitle={caseStudy.approach_timeline.subtitle}
            steps={caseStudy.approach_timeline.steps}
          />
        )}

        {impactMetrics.length > 0 && (
          <ImpactSection impactMetrics={impactMetrics} />
        )}

        {caseStudy.technologies && caseStudy.technologies.length > 0 && (
          <TechStackSection techStack={caseStudy.technologies} />
        )}

        {caseStudy.results && (
          <KeyTakeawaySection takeawayText={caseStudy.results} />
        )}

        {caseStudy.client_quote && (
          <QuoteBannerSection
            quoteText={caseStudy.client_quote}
            quoteAttribution={caseStudy.client_name || ''}
          />
        )}

        <OtherCaseStudiesSection currentSlug={slug || ''} />
      </main>

      <Footer />

      <Modal
        isOpen={isQuoteModalOpen}
        onClose={() => {
          setIsQuoteModalOpen(false);
          setShowSuccessConfirmation(false);
        }}
        title={showSuccessConfirmation ? '' : 'Get a Quote'}
      >
        {showSuccessConfirmation ? (
          <QuoteSuccessConfirmation onClose={handleCloseSuccessConfirmation} />
        ) : (
          <QuoteForm
            onShowSuccessConfirmation={handleShowSuccessConfirmation}
          />
        )}
      </Modal>
      </div>
    </>
  );
}
