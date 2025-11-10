import { Check } from 'lucide-react';

interface TimelineStep {
  title: string;
  description: string;
}

interface ApproachSectionProps {
  approachTimeline: TimelineStep[];
}

export default function ApproachSection({ approachTimeline }: ApproachSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Vinfotech's Approach
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

          <div className="space-y-12">
            {approachTimeline.map((step, index) => (
              <div key={index} className="relative flex items-start gap-6 sm:gap-8">
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[#00B46A] flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-gray-900">
                    <Check className="w-8 h-8 text-white" strokeWidth={3} />
                  </div>
                </div>

                <div className="flex-1 pt-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
