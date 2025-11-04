interface Metric {
  value: string;
  label: string;
}

interface ImpactSectionProps {
  impactMetrics: Metric[];
}

export default function ImpactSection({ impactMetrics }: ImpactSectionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Impact
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-normal">
            Key results and measurable outcomes from this project
          </p>
        </div>

        {/* Metrics List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 sm:p-10 lg:p-12">
          <div className="space-y-6 sm:space-y-7 lg:space-y-8">
            {impactMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-start gap-4 sm:gap-5 lg:gap-6 pb-6 sm:pb-7 lg:pb-8 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0"
              >
                {/* Bullet/Icon */}
                <div className="flex-shrink-0 mt-1">
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                    style={{ backgroundColor: '#00B46A' }}
                  ></div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 lg:gap-6">
                    {/* Value */}
                    <div
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-0 flex-shrink-0"
                      style={{ color: '#00B46A' }}
                    >
                      {metric.value}
                    </div>

                    {/* Label */}
                    <div className="flex-1">
                      <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                        {metric.label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note (optional) */}
        <div className="mt-8 sm:mt-10 text-center">
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500">
            Results verified through production deployment and client feedback
          </p>
        </div>
      </div>
    </section>
  );
}
