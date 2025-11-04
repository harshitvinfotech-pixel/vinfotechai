interface Metric {
  value: string;
  label: string;
}

interface ImpactSectionProps {
  impactMetrics: Metric[];
}

export default function ImpactSection({ impactMetrics }: ImpactSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Impact
          </h2>
        </div>

        <div className="rounded-3xl py-12 sm:py-16 px-6 sm:px-12" style={{ backgroundColor: '#00B46A' }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-lg sm:text-2xl md:text-4xl font-bold text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-lg sm:text-lg text-white/95 font-medium">
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
