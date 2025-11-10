import { Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { useScrollTrigger } from '../../hooks/useScrollTrigger';

interface AIFeature {
  icon: string;
  title: string;
  description: string;
}

interface HowAIMadeItPossibleSectionProps {
  title?: string;
  subtitle?: string;
  features: AIFeature[];
}

export default function HowAIMadeItPossibleSection({
  title = "How AI Made It Possible",
  subtitle,
  features
}: HowAIMadeItPossibleSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollTrigger(sectionRef, { threshold: 0.1 });
  const headerVisible = useScrollTrigger(headerRef, { threshold: 0.5 });

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className={`text-left lg:text-center mb-8 sm:mb-10 lg:mb-12 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl lg:mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {features.map((feature, index) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const cardVisible = useScrollTrigger(cardRef, { threshold: 0.3 });

            return (
              <div
                key={index}
                ref={cardRef}
                className={`bg-white dark:bg-dark-bg rounded-xl p-5 sm:p-6 hover:shadow-lg transition-all duration-700 border border-gray-200 dark:border-gray-700 hover:-translate-y-1 hover:border-[#00B46A] ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#00B46A] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 text-left">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed text-left">
                {feature.description}
              </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
