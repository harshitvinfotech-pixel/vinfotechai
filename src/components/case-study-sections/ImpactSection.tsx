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
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Impact
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Key results and measurable outcomes from this project
          </p>
        </div>

        {/* Two Column Layout: Image Left, Content Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Image */}
          <div className="order-2 lg:order-1">
            {imageUrl ? (
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Impact visualization"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <div className="text-6xl font-bold mb-4">📊</div>
                  <p className="text-xl font-semibold">Impact Metrics</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
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
        </div>
      </div>
    </section>
  );
}
