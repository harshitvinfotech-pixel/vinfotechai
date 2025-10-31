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
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 hidden md:block" style={{ backgroundColor: '#00B46A' }}></div>

      <div className="space-y-12">
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
            <div className={`flex items-center gap-6 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="flex-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-[#00B46A] transition-all duration-300">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="hidden md:flex flex-shrink-0 items-center justify-center relative z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-500 ${
                    visibleSteps.has(index) ? 'scale-100' : 'scale-0'
                  }`}
                  style={{ backgroundColor: '#00B46A' }}
                >
                  <CheckCircle2 size={20} />
                </div>
              </div>

              <div className="flex-1 hidden md:block"></div>
            </div>

            <div className="md:hidden flex items-start gap-4 mt-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#00B46A' }}>
                {index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
