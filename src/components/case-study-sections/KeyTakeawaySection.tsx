import ReactMarkdown from 'react-markdown';
import { useRef } from 'react';
import { useScrollTrigger } from '../../hooks/useScrollTrigger';

interface KeyTakeawaySectionProps {
  takeawayText: string;
}

export default function KeyTakeawaySection({ takeawayText }: KeyTakeawaySectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardVisible = useScrollTrigger(cardRef, { threshold: 0.3 });

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8">
        <div ref={cardRef} className={`bg-white dark:bg-gray-900 rounded-2xl lg:rounded-3xl p-6 sm:p-10 lg:p-16 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition-all duration-1000 ${cardVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
          <div className="mb-5 sm:mb-6 lg:mb-8">
            <img
              src="/vinfo-2.png"
              alt="Vinfotech"
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 object-contain"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-6 lg:mb-8">
            Key Takeaway
          </h2>

          <div className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl prose prose-lg dark:prose-invert mx-auto">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-4 last:mb-0">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
                ),
              }}
            >
              {takeawayText}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
}
