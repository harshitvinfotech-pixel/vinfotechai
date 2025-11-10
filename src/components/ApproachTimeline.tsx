import { CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ApproachStep {
  title: string;
  description: string;
}

const approachSteps: ApproachStep[] = [
  {
    title: 'Knowledge Integration',
    description: 'Unified 10+ years of documentation, proposals, and website content into one searchable knowledge base'
  },
  {
    title: 'RAG Architecture',
    description: 'Built using LangChain and pgvector, connected to both PostgreSQL and Notion/Markdown sources'
  },
  {
    title: 'LLM Layer',
    description: 'GPT-4 Turbo for reasoning, fine-tuned with retrieval-grounding; backed by fallback models (Mistral 7B) for uptime'
  },
  {
    title: 'Frontend Integration',
    description: 'Embedded a fast, search-bar-style chat interface directly on the homepage with streaming responses'
  },
  {
    title: 'Governance & Monitoring',
    description: 'All answers logged and scored against accuracy and response time metrics for weekly refinement'
  }
];

export default function ApproachTimeline() {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => new Set([...prev, index]));
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <div className="relative">
      {/* Desktop center line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 hidden lg:block" style={{ backgroundColor: '#00B46A' }}></div>

      {/* Mobile left line */}
      <div className="absolute left-5 top-0 bottom-0 w-0.5 lg:hidden" style={{ backgroundColor: '#00B46A' }}></div>

      <div className="space-y-6 sm:space-y-8 lg:space-y-16">
        {approachSteps.map((step, index) => (
          <div
            key={index}
            ref={(el) => (stepRefs.current[index] = el)}
            className={`relative transition-all duration-700 ${
              visibleSteps.has(index)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: `${index * 100}ms`
            }}
          >
            {/* Desktop layout - alternating sides */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16">
              {/* Left content */}
              <div className={`${index % 2 === 0 ? 'block' : 'hidden'}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-[#00B46A] transition-all duration-300">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Right content */}
              <div className={`${index % 2 === 1 ? 'block' : 'hidden'}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-[#00B46A] transition-all duration-300">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Center circle - absolutely positioned on the line */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div
                  className={`w-12 h-12 rounded-full bg-[#00B46A] flex items-center justify-center ring-8 ring-white dark:ring-gray-900 transition-all duration-500 ${
                    visibleSteps.has(index) ? 'scale-100' : 'scale-0'
                  }`}
                >
                  <img src="/vinfo-2.png" alt="" className="w-7 h-7 object-contain" />
                </div>
              </div>
            </div>

            {/* Mobile layout - timeline on left */}
            <div className="flex lg:hidden items-start gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-dark-bg flex items-center justify-center ring-4 ring-white dark:ring-gray-900">
                  <img src="/vinfo-2.png" alt="" className="w-6 h-6 object-contain" />
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
