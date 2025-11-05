import { Check } from 'lucide-react';

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

  const rows: ApproachStep[][] = [];
  for (let i = 0; i < steps.length; i += 3) {
    rows.push(steps.slice(i, i + 3));
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-left lg:text-center mb-8 sm:mb-12 lg:mb-16 animate-[fadeInUp_0.6s_ease-out]">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Desktop Horizontal Layout */}
        <div className="hidden lg:block space-y-24">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative">
              <div className="grid grid-cols-3 gap-8 items-start">
                {row.map((step, colIndex) => {
                  const stepIndex = rowIndex * 3 + colIndex;
                  return (
                    <div key={colIndex} className="relative">
                      <div
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-[#00B46A] transition-all duration-300 hover:-translate-y-1 h-full"
                        style={{ animation: `fadeInUp 0.6s ease-out ${stepIndex * 0.15}s both` }}
                      >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {parseRichText(step.description)}
                        </p>
                      </div>

                      {/* Horizontal connecting line and circle (except for last card in row) */}
                      {colIndex < row.length - 1 && (
                        <div className="absolute left-full top-1/2 -translate-y-1/2 w-8 flex items-center justify-center z-20">
                          {/* Horizontal line */}
                          <div className="absolute w-full h-0.5 bg-[#00B46A]"></div>
                          {/* Circle with checkmark */}
                          <div className="relative w-10 h-10 rounded-full bg-[#00B46A] flex items-center justify-center ring-4 ring-white dark:ring-gray-900 shadow-lg">
                            <Check className="w-6 h-6 text-white" strokeWidth={3} />
                          </div>
                        </div>
                      )}

                      {/* Connecting line from last card of row to first card of next row */}
                      {colIndex === row.length - 1 && rowIndex < rows.length - 1 && (
                        <div className="absolute left-1/2 top-full h-24 flex items-center justify-center z-10">
                          {/* Vertical line down */}
                          <div className="absolute w-0.5 h-12 bg-[#00B46A] top-0"></div>
                          {/* Circle with checkmark at bottom */}
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#00B46A] flex items-center justify-center ring-4 ring-white dark:ring-gray-900 shadow-lg">
                            <Check className="w-6 h-6 text-white" strokeWidth={3} />
                          </div>
                        </div>
                      )}

                      {/* Connecting line from bottom circle to first card of next row */}
                      {rowIndex > 0 && colIndex === 0 && (
                        <div className="absolute left-1/2 bottom-full h-12 flex items-center justify-center z-10">
                          <div className="absolute w-0.5 h-full bg-[#00B46A] bottom-0"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Layout - timeline on left with checkmark */}
        <div className="lg:hidden relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#00B46A' }}></div>

          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4" style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both` }}>
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#00B46A] flex items-center justify-center ring-4 ring-white dark:ring-gray-900">
                    <Check className="w-6 h-6 text-white" strokeWidth={3} />
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
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
