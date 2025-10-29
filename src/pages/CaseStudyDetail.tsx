import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import ContentBlockRenderer from '../components/content-blocks/ContentBlockRenderer';
import { getCaseStudyBySlug, getSuggestedCaseStudies } from '../lib/caseStudies';
import type { CaseStudyWithDetails, CaseStudy } from '../types/caseStudy';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState<CaseStudyWithDetails | null>(null);
  const [suggestedStudies, setSuggestedStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCaseStudy() {
      if (!slug) return;

      setLoading(true);
      try {
        const data = await getCaseStudyBySlug(slug);
        if (!data) {
          navigate('/');
          return;
        }
        setCaseStudy(data);

        const suggested = await getSuggestedCaseStudies(slug, data.tags, 3);
        setSuggestedStudies(suggested);
      } catch (error) {
        console.error('Error loading case study:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    }

    loadCaseStudy();
  }, [slug, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleBackClick = () => {
    navigate('/', { state: { scrollTo: 'case-studies' } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header onQuoteClick={() => {}} />
        <div className="pt-20">
          <div className="h-[60vh] bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="space-y-6">
              <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-5/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!caseStudy) {
    return null;
  }

  const heroImage = caseStudy.hero_background_image || caseStudy.hero_image;
  const heroDescription = caseStudy.hero_description || caseStudy.subtitle;
  const galleryImages = caseStudy.gallery_images || caseStudy.images?.filter(img => img.type === 'gallery') || [];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header onQuoteClick={() => {}} />

      <article className="relative pt-20">
        <div className="relative h-[50vh] min-h-[400px] max-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
          </div>

          <div className="absolute top-6 left-6 sm:left-8 lg:left-12 z-10">
            <button
              onClick={handleBackClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300 group"
            >
              <ArrowLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-semibold text-sm sm:text-base">Back to Case Studies</span>
            </button>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-6xl mx-auto w-full px-6 sm:px-8 lg:px-12 text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                {caseStudy.title}
              </h1>

              {heroDescription && (
                <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-4xl leading-relaxed">
                  {heroDescription}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-gray-900">
          <ContentBlockRenderer
            blocks={caseStudy.content_blocks || []}
            metrics={caseStudy.metrics}
            timeline={caseStudy.timeline}
            features={caseStudy.features}
          />
        </div>

        {galleryImages.length > 0 && <Gallery images={galleryImages} />}

        {suggestedStudies.length > 0 && (
          <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Explore More Case Studies
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Discover other innovative solutions we've built
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {suggestedStudies.map((study) => (
                  <Link
                    key={study.id}
                    to={`/case-studies/${study.slug}`}
                    className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={study.hero_image}
                        alt={study.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#00B46A] dark:group-hover:text-[#00FFB2] transition-colors duration-300">
                        {study.title}
                      </h3>

                      {study.subtitle && (
                        <p className="text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {study.subtitle}
                        </p>
                      )}

                      {study.tags && study.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {study.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  );
}
