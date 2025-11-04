import { CheckCircle2 } from 'lucide-react';

interface ApproachStep {
  title: string;
  description: string;
}

interface VinfotechApproachSectionProps {
  title?: string;
  subtitle?: string;
  steps: ApproachStep[];
}

function parseRichText(text: string): (string | JSX.Element)[] {
  const parts = text.split(/(\*\*.*?\*\*|<b>.*?<\/b>)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('<b>') && part.endsWith('</b>')) {
      return <strong key={index} className="font-bold text-gray-900 dark:text-white">{part.slice(3, -4)}</strong>;
    }
    return part;
  });
}

export default function VinfotechApproachSection({
  title = "Vinfotech's Approach",
  subtitle = "Our systematic approach to building enterprise-grade AI solutions",
  steps
}: VinfotechApproachSectionProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-left lg:text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative">
          {/* Desktop center line with gradient fade */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 hidden lg:block overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(0, 180, 106, 0) 0%, rgba(0, 180, 106, 1) 10%, rgba(0, 180, 106, 1) 90%, rgba(0, 180, 106, 0) 100%)'
              }}
            ></div>
          </div>

          {/* Mobile left line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 lg:hidden" style={{ backgroundColor: '#00B46A' }}></div>

          <div className="space-y-6 sm:space-y-8 lg:space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Desktop layout - alternating sides */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
                  {index % 2 === 0 ? (
                    <>
                      {/* Left card */}
                      <div className="flex justify-end">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-[#00B46A] transition-all duration-300 max-w-md w-full">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {parseRichText(step.description)}
                          </p>
                        </div>
                      </div>
                      {/* Empty right */}
                      <div></div>
                    </>
                  ) : (
                    <>
                      {/* Empty left */}
                      <div></div>
                      {/* Right card */}
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-[#00B46A] transition-all duration-300 max-w-md w-full">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {parseRichText(step.description)}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Center circle with vinfo logo - absolutely positioned on the line */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-[#00B46A] flex items-center justify-center ring-8 ring-white dark:ring-gray-900">
                      <img src="/vinfo-2.png" alt="" className="w-7 h-7 object-contain" />
                    </div>
                  </div>
                </div>

                {/* Mobile layout - timeline on left with vinfo logo */}
                <div className="flex lg:hidden items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#00B46A] flex items-center justify-center ring-4 ring-white dark:ring-gray-900">
                      <img src="/vinfo-2.png" alt="" className="w-6 h-6 object-contain" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {parseRichText(step.description)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
