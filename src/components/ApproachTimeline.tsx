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
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-500 hidden md:block"></div>

      <div className="space-y-8">
        {approachSteps.map((step, index) => (
          <div
            key={index}
            ref={(el) => (stepRefs.current[index] = el)}
            className={`relative transition-all duration-700 ${
              visibleSteps.has(index)
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
            style={{
              transitionDelay: `${index * 100}ms`
            }}
          >
            <div className="flex items-start gap-6">
              <div className="hidden md:flex flex-shrink-0 items-center justify-center">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all duration-500 ${
                    visibleSteps.has(index) ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                  }`}
                >
                  {visibleSteps.has(index) ? (
                    <CheckCircle2 size={28} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="md:hidden flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-md">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
