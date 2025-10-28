import { ArrowRight, Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadCaseStudies() {
      setLoading(true);
      try {
        const response = await fetch('/case-studies/index.json');
        const studies = await response.json();
        setCaseStudies(studies);
      } catch (error) {
        console.error('Error loading case studies:', error);
      }
      setLoading(false);
    }
    loadCaseStudies();
  }, []);

  const handleCardClick = (slug: string) => {
    window.location.href = `/case-studies/${slug}.html`;
  };

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 bg-gray-50 dark:bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <div className="mb-6 sm:mb-8 text-center">
            <div className="mb-3 sm:mb-4">
              <span className="text-base font-semibold tracking-wider uppercase" style={{ color: '#00B46A' }}>
                Case Studies
              </span>
            </div>
            <h2 className="text-[30px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 tracking-tight">
              Real-World Impact, Proven Depth
            </h2>
            <p className="text-lg sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our portfolio demonstrates a deep capability to build and scale complex AI systems, from sophisticated RAG engines to real-time Computer Vision.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[360px] sm:h-[380px] bg-gray-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {caseStudies.map((study) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                onClick={() => handleCardClick(study.slug)}
              />
            ))}
          </div>
        )}
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
  const [showPreview, setShowPreview] = useState(false);

  const handleViewCaseStudy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleTogglePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPreview(!showPreview);
  };

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <article
      className="group relative transition-all duration-500 h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewCaseStudy}
    >
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
      ></div>

      <div className={`relative flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden ${
        showPreview ? 'h-[420px]' : 'h-[320px]'
      }`}>

        <div className={`relative overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-all duration-500 ${
          showPreview ? 'h-[240px]' : 'h-full'
        }`}>
          <div className={`absolute inset-0 transition-all duration-1000 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <img
              src={study.hero_image}
              alt={study.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered && !showPreview ? 'scale-110 brightness-110' : 'scale-100 brightness-100'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
            <h3 className="font-bold text-white leading-tight text-center text-2xl sm:text-3xl lg:text-4xl">
              {study.title}
            </h3>
          </div>
        </div>

        {showPreview && (
          <div className="flex-1 p-6 bg-white dark:bg-gray-900">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
              {truncateText(study.subtitle || '', 140)}
            </p>
          </div>
        )}

        <button
          onClick={handleTogglePreview}
          className="absolute bottom-4 right-4 z-20 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 dark:border-gray-700"
          style={{ borderColor: showPreview ? '#00B46A' : '' }}
          aria-label={showPreview ? 'Hide preview' : 'Show preview'}
        >
          {showPreview ? (
            <X style={{ color: '#00B46A' }} size={20} strokeWidth={2.5} />
          ) : (
            <Plus style={{ color: '#00B46A' }} size={20} strokeWidth={2.5} />
          )}
        </button>
      </div>
    </article>
  );
}
