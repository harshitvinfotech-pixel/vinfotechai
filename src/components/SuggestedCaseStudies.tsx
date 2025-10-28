import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { CaseStudy } from '../types/caseStudy';
import { useState } from 'react';

interface SuggestedCaseStudiesProps {
  studies: CaseStudy[];
}

export default function SuggestedCaseStudies({ studies }: SuggestedCaseStudiesProps) {
  const navigate = useNavigate();

  if (studies.length === 0) return null;

  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Related Case Studies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore more of our innovative projects and success stories
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {studies.map((study) => (
            <SuggestedCaseStudyCard
              key={study.id}
              study={study}
              onClick={() => navigate(`/case-studies/${study.slug}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface SuggestedCaseStudyCardProps {
  study: CaseStudy;
  onClick: () => void;
}

function SuggestedCaseStudyCard({ study, onClick }: SuggestedCaseStudyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      className="group cursor-pointer h-full"
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
      <div className="relative bg-white dark:bg-gray-900 overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-500 h-[350px] shadow-md hover:shadow-xl hover:shadow-emerald-500/10">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900"></div>

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

          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
              CASE STUDY
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                isHovered ? 'scale-110 bg-emerald-500' : 'scale-100 bg-white/90 dark:bg-gray-800/90'
              }`}
            >
              <ArrowRight
                className={`transition-colors duration-300 ${
                  isHovered ? 'text-white' : 'text-gray-900 dark:text-gray-300'
                }`}
                size={18}
                strokeWidth={2}
              />
            </div>
          </div>
        </div>

        <div className="p-5 h-[calc(350px-192px)] flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2">
              {study.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {study.subtitle || study.problem}
            </p>
          </div>

          {study.tags && study.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              {study.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded"
                >
                  {tag}
                </span>
              ))}
              {study.tags.length > 2 && (
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded">
                  +{study.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform origin-left transition-transform duration-700 ${
            isHovered ? 'scale-x-100' : 'scale-x-0'
          }`}
        ></div>
      </div>
    </article>
  );
}
