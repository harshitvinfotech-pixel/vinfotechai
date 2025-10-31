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

  return (
    <section>
      <div className="text-center mb-8">
        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore more success stories and solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {caseStudies.slice(0, 2).map((study) => (
          <RelatedCaseStudyCard
            key={study.id}
            study={study}
            onClick={() => navigate(`/case-studies/${study.slug}`)}
          />
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
      className="group relative transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>

      <div className="relative flex flex-row bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden h-[300px]">

        <div className="relative w-1/2 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
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
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
          </div>
        </div>

        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
            {study.title}
          </h4>

          {study.subtitle && (
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
              {study.subtitle}
            </p>
          )}

        </div>
      </div>
    </article>
  );
}
