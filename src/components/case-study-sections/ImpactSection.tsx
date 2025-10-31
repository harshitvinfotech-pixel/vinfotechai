interface Metric {
  value: string;
  label: string;
}

interface ImpactSectionProps {
  impactMetrics: Metric[];
}

export default function ImpactSection({ impactMetrics }: ImpactSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Impact
          </h2>
        </div>

        <div
          className="rounded-3xl py-12 sm:py-16 px-6 sm:px-12"
          style={{ backgroundColor: '#00B46A' }}
        >
          <div className={`grid gap-8 ${
            impactMetrics.length <= 3 ? 'grid-cols-1 sm:grid-cols-3' :
            impactMetrics.length <= 4 ? 'grid-cols-2 sm:grid-cols-4' :
            impactMetrics.length <= 6 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6' :
            'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
          }`}>
            {impactMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3">
                  {metric.value}
                </div>
                <div className="text-base sm:text-lg text-white/95 font-medium">
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
