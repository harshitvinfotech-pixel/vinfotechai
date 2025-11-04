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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Impact
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Key results and measurable outcomes from this project
          </p>
        </div>

        {/* Simple Bullet List */}
        <div className="space-y-5 sm:space-y-6">
          {impactMetrics.map((metric, index) => (
            <div
              key={index}
              className="flex items-start gap-4"
            >
              {/* Bullet Point */}
              <div className="flex-shrink-0 mt-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: '#00B46A' }}
                ></div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {metric.value}
                  </span>
                  {' — '}
                  {metric.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
