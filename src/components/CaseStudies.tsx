import { Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCaseStudies } from '../lib/caseStudies';

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
  const caseStudies = getAllCaseStudies();
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  return (
    <article
      className="group relative transition-all duration-500 h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
      ></div>

      <div className="relative flex flex-col bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden h-[380px]">

        <div className="relative overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 h-full">
          <div className={`absolute inset-0 transition-all duration-1000 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <img
              src={study.hero_image}
              alt={study.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered ? 'scale-110 brightness-105' : 'scale-100 brightness-100'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/95 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 p-6 flex items-start justify-between">
            <h3 className="font-bold text-white leading-tight text-left text-2xl max-w-[80%]" aria-label={`Case study: ${study.title}`}>
              {study.title}
            </h3>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="flex-shrink-0 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label={`View case study: ${study.title}`}
            >
              <Plus style={{ color: '#00B46A' }} size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
