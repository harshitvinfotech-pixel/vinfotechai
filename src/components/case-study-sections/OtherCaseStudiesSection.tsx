import { Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCaseStudies } from '../../lib/caseStudies';

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  hero_image: string;
  tags: string[];
  industry?: string;
  overview_bullets?: string[];
  display_order?: number;
}

interface OtherCaseStudiesSectionProps {
  currentSlug: string;
}

export default function OtherCaseStudiesSection({ currentSlug }: OtherCaseStudiesSectionProps) {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCaseStudies() {
      setLoading(true);
      const allStudies = await getAllCaseStudies();
      const filteredStudies = allStudies.filter(study => study.slug !== currentSlug).slice(0, 3);
      setCaseStudies(filteredStudies);
      setLoading(false);
    }
    loadCaseStudies();
  }, [currentSlug]);

  const handleCardClick = (slug: string) => {
    navigate(`/case-studies/${slug}`);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B46A]"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading case studies...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 lg:mb-16 text-center animate-[fadeInUp_0.6s_ease-out]">
          <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Other Case Studies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our systematic approach to building enterprise-grade AI solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {caseStudies.map((study) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              onClick={() => handleCardClick(study.slug)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CaseStudyCardProps {
  study: CaseStudy;
  onClick: () => void;
}

function CaseStudyCard({ study, onClick }: CaseStudyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article
      className="group relative transition-all duration-700 animate-[fadeInUp_0.8s_ease-out]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
      ></div>

      <div
        onClick={() => onClick()}
        className="relative flex flex-col bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 shadow-lg hover:shadow-2xl h-[550px] overflow-hidden cursor-pointer"
      >

        <div className={`relative overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-all duration-500 ${
          isExpanded ? 'h-48 sm:h-56' : 'h-full'
        }`}>
          <div className={`absolute inset-0 transition-all duration-1000 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <img
              src={study.hero_image}
              alt={study.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered && !isExpanded ? 'scale-110 brightness-105' : 'scale-100 brightness-100'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/65 to-transparent" style={{ height: '230px' }}></div>
          </div>

          <div className={`absolute left-0 right-0 z-10 px-6 sm:px-8 transition-all duration-500 ${
            isExpanded ? 'bottom-4' : 'bottom-8'
          }`}>
            <h3 className="font-bold text-white leading-tight text-left w-full text-[26px] sm:text-[30px]" aria-label={`Case study: ${study.title}`}>
              {study.title}
            </h3>
          </div>

        </div>

        {isExpanded && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 pb-20">
            <div className="space-y-4">
              {study.overview_bullets && study.overview_bullets.length > 0 && (
                <ul className="space-y-3">
                  {study.overview_bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="relative mt-2 flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00B46A]"></div>
                      </div>
                      <span
                        className="text-gray-700 dark:text-gray-300 text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: bullet }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => onClick()}
              className="w-full py-3 px-6 bg-[#00B46A] text-white font-semibold rounded-xl hover:bg-[#009557] transition-colors duration-300"
            >
              View Full Case Study
            </button>
          </div>
        )}

        <div className="absolute bottom-6 right-6 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B46A] dark:hover:border-[#00B46A]"
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          >
            {isExpanded ? (
              <X className="text-[#00B46A]" size={20} strokeWidth={2.5} />
            ) : (
              <Plus className="text-[#00B46A]" size={20} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
