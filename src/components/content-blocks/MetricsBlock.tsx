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

  const gridClass = metrics.length <= 3
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : metrics.length === 4
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5';

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className={`grid ${gridClass} gap-6 lg:gap-8`}>
        {metrics.map((metric, index) => {
          const Icon = iconMap.trending;

          return (
            <div
              key={metric.id}
              className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-[rgb(49,54,64)] rounded-2xl p-6 lg:p-8 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 hover:-translate-y-2 group"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow duration-300">
                  <Icon className="text-white" size={26} />
                </div>
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
                  {metric.value}
                </div>
                <div className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {metric.label}
                </div>
                {metric.description && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
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
