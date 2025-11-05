import { useRef } from 'react';
import { useScrollTrigger } from '../../hooks/useScrollTrigger';

interface OverviewSectionProps {
  overviewText: string;
}

function parseOverviewText(text: string) {
  const paragraphs = text.split('\n\n').filter(p => p.trim());

  return paragraphs.map((paragraph, pIndex) => {
    const parts = paragraph.split(/(\*\*.*?\*\*)/g);

    return (
      <p
        key={pIndex}
        className={`leading-relaxed ${
          pIndex === 0
            ? 'text-2xl sm:text-3xl lg:text-4xl text-gray-900 dark:text-white font-bold mb-4 sm:mb-6 lg:mb-8'
            : 'text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 lg:mb-6'
        }`}
      >
        {parts.map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={partIndex} className="font-bold text-gray-900 dark:text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <span key={partIndex}>{part}</span>;
        })}
      </p>
    );
  });
}

export default function OverviewSection({ overviewText }: OverviewSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollTrigger(sectionRef, { threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className={`text-center space-y-4 sm:space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {parseOverviewText(overviewText)}
        </div>
      </div>
    </section>
  );
}
