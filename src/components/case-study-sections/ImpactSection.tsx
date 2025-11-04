interface Metric {
  value: string;
  label: string;
}

interface ImpactSectionProps {
  impactMetrics: Metric[];
  imageUrl?: string;
}

export default function ImpactSection({ impactMetrics, imageUrl }: ImpactSectionProps) {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Impact
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Key results and measurable outcomes from this project
          </p>
        </div>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto">
          {/* Metrics List */}
          <div className="space-y-4">
            {impactMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                {/* Bullet Point */}
                <div className="flex-shrink-0 mt-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#10b981' }}
                  ></div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {metric.value}
                    </span>
                    <span className="text-gray-500 dark:text-gray-500"> — </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {metric.label}
                    </span>
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
