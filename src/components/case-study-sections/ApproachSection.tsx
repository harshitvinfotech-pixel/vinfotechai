interface TimelineStep {
  title: string;
  description: string;
}

interface ApproachSectionProps {
  approachTimeline: TimelineStep[];
}

export default function ApproachSection({ approachTimeline }: ApproachSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Vinfotech's Approach
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

          <div className="space-y-12">
            {approachTimeline.map((step, index) => (
              <div key={index} className="relative flex items-start gap-8">
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[#00B46A] flex items-center justify-center shadow-lg">
                    <div className="w-8 h-8 rounded-full bg-white"></div>
                  </div>
                </div>

                <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
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
