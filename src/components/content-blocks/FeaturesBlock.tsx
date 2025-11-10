import { Sparkles } from 'lucide-react';
import type { CaseStudyFeature } from '../../types/caseStudy';

interface FeaturesBlockProps {
  features: CaseStudyFeature[];
}

export default function FeaturesBlock({ features }: FeaturesBlockProps) {
  if (!features || features.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Vinfotech's Approach
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          A comprehensive strategy combining cutting-edge technology with practical implementation
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-[rgb(49,54,64)] rounded-2xl p-6 lg:p-8 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 hover:-translate-y-2 group"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="flex flex-col">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow duration-300">
                <Sparkles className="text-white" size={26} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
