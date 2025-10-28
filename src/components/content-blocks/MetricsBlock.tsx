import { TrendingUp, Target, Zap, Award } from 'lucide-react';
import type { CaseStudyMetric } from '../../types/caseStudy';

interface MetricsBlockProps {
  metrics: CaseStudyMetric[];
}

const iconMap: Record<string, React.ElementType> = {
  trending: TrendingUp,
  target: Target,
  zap: Zap,
  award: Award
};

export default function MetricsBlock({ metrics }: MetricsBlockProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = iconMap.trending;

          return (
            <div
              key={metric.id}
              className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {metric.label}
                </div>
                {metric.description && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {metric.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
