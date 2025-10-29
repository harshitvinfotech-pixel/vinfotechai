import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCaseStudies } from '../lib/caseStudies';
import type { CaseStudy } from '../types/caseStudy';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCaseStudies() {
      setLoading(true);
      const studies = await getAllCaseStudies();
      setCaseStudies(studies);
      setLoading(false);
    }
    loadCaseStudies();
  }, []);

  const handleCardClick = (slug: string) => {
    navigate(`/case-studies/${slug}`);
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
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#00B46A' }}>
                Case Studies
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 tracking-tight">
              Real-World Impact, Proven Depth
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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

  return (
    <article
      className="group relative cursor-pointer transition-all duration-500 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${study.title} case study`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="relative bg-white dark:bg-gray-900 overflow-hidden rounded-xl sm:rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-500 h-[360px] sm:h-[380px] shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col">

        <div className="relative h-48 sm:h-52 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"></div>

          <img
            src={study.hero_image}
            alt={study.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <div className="flex-1 p-5 sm:p-6 flex flex-col">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
            {study.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-2">
            {study.subtitle || study.problem.substring(0, 100)}
          </p>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 transform origin-left transition-transform duration-700 ${
            isHovered ? 'scale-x-100' : 'scale-x-0'
          }`}
        ></div>
      </div>
    </article>
  );
}
