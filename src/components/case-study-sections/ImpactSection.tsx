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
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Impact
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Key results and measurable outcomes from this project
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {impactMetrics.map((metric, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300 hover:shadow-lg"
            >
              {/* Accent Line */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Card Content */}
              <div className="relative">
                {/* Metric Value */}
                <div className="mb-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {metric.value}
                  </h3>
                </div>

                {/* Divider */}
                <div className="w-12 h-0.5 bg-emerald-500 mb-3"></div>

                {/* Metric Description */}
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
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
