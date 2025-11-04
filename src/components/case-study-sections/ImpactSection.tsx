interface Metric {
  value: string;
  label: string;
}

interface ImpactSectionProps {
  impactMetrics: Metric[];
}

export default function ImpactSection({ impactMetrics }: ImpactSectionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Impact & Results
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: '#00B46A' }}></div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {impactMetrics.map((metric, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-7 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              {/* Accent Border */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-xl sm:rounded-t-2xl transition-all duration-300 group-hover:h-1.5"
                style={{ backgroundColor: '#00B46A' }}
              ></div>

              {/* Content */}
              <div className="flex flex-col h-full">
                {/* Value */}
                <div className="mb-3 sm:mb-4">
                  <div
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
                    style={{ color: '#00B46A' }}
                  >
                    {metric.value}
                  </div>
                </div>

                {/* Label */}
                <div className="flex-1">
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                    {metric.label}
                  </p>
                </div>
              </div>

              {/* Hover Effect Circle */}
              <div
                className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-2xl"
                style={{ backgroundColor: '#00B46A' }}
              ></div>
            </div>
          ))}
        </div>

        {/* Optional: Add a subtle decorative element */}
        <div className="mt-12 lg:mt-16 flex justify-center">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00B46A' }}></div>
            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
