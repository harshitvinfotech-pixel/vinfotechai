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
      <div className="text-center mb-12">
        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore more success stories and solutions
        </p>
      </div>

      <div className="flex flex-col md:flex-row w-full">
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

  return (
    <article
      className="group relative transition-all duration-500 cursor-pointer h-[400px] overflow-hidden flex-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative w-full h-2/3 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <div className={`absolute inset-0 transition-all duration-1000 ${
          imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <img
            src={study.hero_image}
            alt={study.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110 brightness-110' : 'scale-100 brightness-100'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        </div>
      </div>

      <div className="h-1/3 p-8 flex flex-col justify-center bg-white dark:bg-gray-900">
        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
          {study.title}
        </h4>

        {study.subtitle && (
          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed line-clamp-2">
            {study.subtitle}
          </p>
        )}
      </div>
    </article>
  );
}
