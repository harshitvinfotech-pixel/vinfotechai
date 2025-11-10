import { CheckCircle } from 'lucide-react';
import type { CaseStudyTimeline } from '../../types/caseStudy';

interface TimelineBlockProps {
  timeline: CaseStudyTimeline[];
}

export default function TimelineBlock({ timeline }: TimelineBlockProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-500 dark:from-emerald-600 dark:via-emerald-500 dark:to-emerald-600"></div>

        <div className="space-y-12">
          {timeline.map((phase, index) => (
            <div
              key={phase.id}
              className="relative flex gap-6 items-start"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className="relative z-10 flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <CheckCircle className="text-white" size={28} />
                </div>
              </div>

              <div className="flex-1 bg-white dark:bg-[rgb(30,35,45)] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {phase.phase}
                  </h3>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1 sm:mt-0">
                    {phase.duration}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
