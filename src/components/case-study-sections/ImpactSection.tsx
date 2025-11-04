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
    <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Impact
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Key results and measurable outcomes from this project
          </p>
        </div>

        {/* Two Column Layout: Visual Left, Content Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Visual Box */}
          <div className="order-2 lg:order-1">
            {imageUrl ? (
              <div className="relative w-full rounded-2xl overflow-hidden shadow-xl" style={{ minHeight: '400px' }}>
                <img
                  src={imageUrl}
                  alt="Impact visualization"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="relative w-full rounded-2xl overflow-hidden shadow-xl flex items-center justify-center"
                style={{
                  minHeight: '400px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                }}
              >
                <div className="text-white text-center p-12">
                  <div className="text-7xl mb-6">📊</div>
                  <p className="text-2xl font-semibold">Impact Metrics</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Bullet List */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              {impactMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  {/* Bullet Point */}
                  <div className="flex-shrink-0 mt-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: '#10b981' }}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {metric.value}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400"> — </span>
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
      </div>
    </section>
  );
}
