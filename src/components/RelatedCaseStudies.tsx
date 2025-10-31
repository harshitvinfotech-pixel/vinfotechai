import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { CaseStudy } from '../types/caseStudy';

interface RelatedCaseStudiesProps {
  caseStudies: CaseStudy[];
  title?: string;
}

export default function RelatedCaseStudies({
  caseStudies,
  title = 'Other Case Studies'
}: RelatedCaseStudiesProps) {
  const navigate = useNavigate();

  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  const displayStudies = caseStudies.slice(0, 2);

  return (
    <section className="w-full">
      <div className="text-center mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
          {title}
        </h3>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
          Explore more success stories and solutions
        </p>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-6 md:gap-0">
        {displayStudies.map((study, index) => (
          <>
            <RelatedCaseStudyCard
              key={study.id}
              study={study}
              onClick={() => navigate(`/case-studies/${study.slug}`)}
            />
            {index < displayStudies.length - 1 && (
              <div className="hidden md:block w-px bg-gray-300 dark:bg-gray-700"></div>
            )}
          </>
        ))}
      </div>
    </section>
  );
}

interface RelatedCaseStudyCardProps {
  study: CaseStudy;
  onClick: () => void;
}

function RelatedCaseStudyCard({ study, onClick }: RelatedCaseStudyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageUrl = study.overview_image_url || study.hero_image;

  return (
    <article
      className="group relative transition-all duration-500 cursor-pointer h-[350px] sm:h-[400px] overflow-hidden flex-1 rounded-lg md:rounded-none shadow-lg md:shadow-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative w-full h-2/3 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        {imageUrl && (
          <div className={`absolute inset-0 transition-all duration-1000 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <img
              src={imageUrl}
              alt={study.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered ? 'scale-110 brightness-110' : 'scale-100 brightness-100'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
          </div>
        )}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-[#00B46A] rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="h-1/3 p-4 sm:p-6 md:p-8 flex flex-col justify-center bg-white dark:bg-gray-900">
        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 leading-tight">
          {study.title}
        </h4>

        {study.subtitle && (
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-2">
            {study.subtitle}
          </p>
        )}
      </div>
    </article>
  );
}
