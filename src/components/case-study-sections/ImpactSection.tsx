interface Metric {
  value: string;
  label: string;
}

interface ImpactSectionProps {
  impactMetrics: Metric[];
}

export default function ImpactSection({ impactMetrics }: ImpactSectionProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-left lg:text-center mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Impact
          </h2>
        </div>

        <div className="rounded-2xl lg:rounded-3xl py-8 sm:py-12 lg:py-16 px-5 sm:px-8 lg:px-12" style={{ backgroundColor: '#00B46A' }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                  {metric.value}
                </div>
                <div className="text-sm sm:text-base lg:text-lg text-white/95 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
