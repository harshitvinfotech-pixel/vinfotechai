interface Metric {
  value: string;
  label: string;
}

interface ImpactSectionProps {
  impactMetrics: Metric[];
}

export default function ImpactSection({ impactMetrics }: ImpactSectionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Impact
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
            Measurable outcomes and transformative results delivered
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {impactMetrics.map((metric, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group overflow-hidden"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 group-hover:h-2"
                style={{ backgroundColor: '#00B46A' }}
              ></div>

              {/* Decorative corner element */}
              <div
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: '#00B46A' }}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Value */}
                <div className="mb-5 sm:mb-6">
                  <div
                    className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none tracking-tight"
                    style={{ color: '#00B46A' }}
                  >
                    {metric.value}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600 mb-5 sm:mb-6 group-hover:w-24 transition-all duration-500"></div>

                {/* Label */}
                <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                  {metric.label}
                </p>
              </div>

              {/* Hover gradient effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"
                style={{ background: 'linear-gradient(135deg, #00B46A 0%, transparent 100%)' }}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 sm:mt-20 flex justify-center items-center gap-3">
          <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: '#00B46A' }}
          ></div>
          <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
