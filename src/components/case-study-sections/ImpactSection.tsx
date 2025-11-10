import { useRef } from 'react';
import { useScrollTrigger } from '../../hooks/useScrollTrigger';

interface Metric {
  value: string;
  label: string;
}

interface ImpactSectionProps {
  impactMetrics: Metric[];
  imageUrl?: string;
}

export default function ImpactSection({ impactMetrics, imageUrl }: ImpactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollTrigger(sectionRef, { threshold: 0.1 });
  const headerVisible = useScrollTrigger(headerRef, { threshold: 0.5 });

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className={`text-center mb-12 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Impact
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Key results and measurable outcomes from this project
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {impactMetrics.map((metric, index) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const cardVisible = useScrollTrigger(cardRef, { threshold: 0.3 });

            return (
              <div
                key={index}
                ref={cardRef}
                className={`group relative bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-700 hover:shadow-lg hover:-translate-y-1 ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
              {/* Accent Line */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Card Content */}
              <div className="relative">
                {/* Metric Value */}
                <div className="mb-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {metric.value}
                  </h3>
                </div>

                {/* Divider */}
                <div className="w-12 h-0.5 bg-emerald-500 mb-3"></div>

                {/* Metric Description */}
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {metric.label}
                </p>
              </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
