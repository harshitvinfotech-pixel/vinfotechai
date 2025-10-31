import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { CaseStudy } from '../types/caseStudy';

interface RelatedCaseStudiesProps {
  caseStudies: CaseStudy[];
  title?: string;
}

export default function RelatedCaseStudies({
  caseStudies,
  title = 'Other Case Studiessssss'
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
      className="group relative transition-all duration-500 cursor-pointer overflow-hidden flex-1 rounded-xl md:rounded-none shadow-xl md:shadow-none border border-gray-200 dark:border-gray-700 md:border-0 md:h-full md:flex md:flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative w-full h-48 md:h-64 md:flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        {imageUrl ? (
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
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#00B46A]/10 to-[#00B46A]/5">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#00B46A]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#00B46A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        )}
        {imageUrl && !imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="w-10 h-10 border-3 border-gray-300 dark:border-gray-600 border-t-[#00B46A] rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="p-5 md:p-6 lg:p-8 bg-white dark:bg-gray-900 md:flex-1 md:flex md:flex-col md:justify-between">
        <div>
          <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2">
            {study.title}
          </h4>

          {study.subtitle && (
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2">
              {study.subtitle}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
