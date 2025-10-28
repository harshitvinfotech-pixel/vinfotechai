import { Sparkles } from 'lucide-react';
import type { CaseStudyFeature } from '../../types/caseStudy';

interface FeaturesBlockProps {
  features: CaseStudyFeature[];
}

export default function FeaturesBlock({ features }: FeaturesBlockProps) {
  if (!features || features.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300 hover:-translate-y-1"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Sparkles className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
