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

  // For the specific 5-step flow: Knowledge → RAG → LLM → Frontend → Governance
  const isDefaultFlow = steps.length === 5;

  if (!isDefaultFlow) {
    // Fallback: generic grid layout for other cases
    const rows: ApproachStep[][] = [];
    for (let i = 0; i < steps.length; i += 3) {
      rows.push(steps.slice(i, i + 3));
    }

    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-left lg:text-center mb-8 sm:mb-12 lg:mb-20 animate-[fadeInUp_0.6s_ease-out]">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>

          <div className="hidden lg:block space-y-32">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2" style={{
                  background: 'linear-gradient(90deg, transparent 0%, #00B46A 10%, #00B46A 90%, transparent 100%)',
                  zIndex: 0
                }}></div>

                <div className="grid grid-cols-3 gap-16 items-center relative z-10">
                  {row.map((step, colIndex) => {
                    const stepIndex = rowIndex * 3 + colIndex;
                    return (
                      <div key={colIndex} className="relative flex flex-col items-center">
                        {colIndex < row.length - 1 && (
                          <div className="absolute left-full top-1/2 -translate-y-1/2 translate-x-8 z-30">
                            <div className="w-12 h-12 rounded-full bg-[#00B46A] flex items-center justify-center ring-8 ring-white dark:ring-gray-900 shadow-lg">
                              <Check className="w-7 h-7 text-white" strokeWidth={3} />
                            </div>
                          </div>
                        )}

                        <div
                          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B46A] transition-all duration-300 hover:-translate-y-2 w-full relative z-20"
                          style={{ animation: `fadeInUp 0.6s ease-out ${stepIndex * 0.15}s both` }}
                        >
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {parseRichText(step.description)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {rowIndex < rows.length - 1 && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 flex flex-col items-center z-10" style={{ height: '128px' }}>
                    <div className="w-1 h-16 bg-[#00B46A]"></div>
                    <div className="w-12 h-12 rounded-full bg-[#00B46A] flex items-center justify-center ring-8 ring-white dark:ring-gray-900 shadow-lg my-2">
                      <Check className="w-7 h-7 text-white" strokeWidth={3} />
                    </div>
                    <div className="w-1 flex-1 bg-[#00B46A]"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

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

  // Custom layout for 5-step flow: Knowledge → RAG → LLM (top), then down to Frontend → Governance (bottom)
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-left lg:text-center mb-8 sm:mb-12 lg:mb-20 animate-[fadeInUp_0.6s_ease-out]">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Desktop Custom Flow Layout with Curves */}
        <div className="hidden lg:block">
          <div className="relative" style={{ minHeight: '650px' }}>
            {/* SVG for curved connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#00B46A" />
                </marker>
              </defs>

              {/* Line from Knowledge to RAG */}
              <line x1="31%" y1="22%" x2="36%" y2="22%" stroke="#00B46A" strokeWidth="3" />

              {/* Line from RAG to LLM */}
              <line x1="64%" y1="22%" x2="69%" y2="22%" stroke="#00B46A" strokeWidth="3" />

              {/* Curved line from LLM down and across to Frontend */}
              <path
                d="M 83.5 28 Q 83.5 45, 83.5 55 T 50 70 T 16.5 70"
                stroke="#00B46A"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              {/* Line from Frontend to Governance */}
              <line x1="31%" y1="78%" x2="36%" y2="78%" stroke="#00B46A" strokeWidth="3" />

              {/* Extended line from Governance to the right */}
              <line x1="64%" y1="78%" x2="83.5%" y2="78%" stroke="#00B46A" strokeWidth="3" />
            </svg>

            {/* Top Row: Knowledge → RAG → LLM */}
            <div className="grid grid-cols-3 gap-16 mb-32 relative" style={{ zIndex: 20 }}>
              {/* Knowledge Integration */}
              <div className="relative" style={{ animation: `fadeInUp 0.6s ease-out 0s both` }}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B46A] transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {steps[0].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {parseRichText(steps[0].description)}
                  </p>
                </div>
                {/* Circle between Knowledge and RAG */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 translate-x-8" style={{ zIndex: 30 }}>
                  <div className="w-12 h-12 rounded-full bg-[#00B46A] flex items-center justify-center ring-8 ring-white dark:ring-gray-900 shadow-lg">
                    <Check className="w-7 h-7 text-white" strokeWidth={3} />
                  </div>
                </div>
              </div>

              {/* RAG Architecture */}
              <div className="relative" style={{ animation: `fadeInUp 0.6s ease-out 0.15s both` }}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B46A] transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {steps[1].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {parseRichText(steps[1].description)}
                  </p>
                </div>
                {/* Circle between RAG and LLM */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 translate-x-8" style={{ zIndex: 30 }}>
                  <div className="w-12 h-12 rounded-full bg-[#00B46A] flex items-center justify-center ring-8 ring-white dark:ring-gray-900 shadow-lg">
                    <Check className="w-7 h-7 text-white" strokeWidth={3} />
                  </div>
                </div>
              </div>

              {/* LLM Layer */}
              <div className="relative" style={{ animation: `fadeInUp 0.6s ease-out 0.3s both` }}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B46A] transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {steps[2].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {parseRichText(steps[2].description)}
                  </p>
                </div>
              </div>
            </div>

            {/* Circle at the curve from LLM going down */}
            <div className="absolute" style={{ top: '30%', right: '16.5%', zIndex: 30 }}>
              <div className="w-12 h-12 rounded-full bg-[#00B46A] flex items-center justify-center ring-8 ring-white dark:ring-gray-900 shadow-lg">
                <Check className="w-7 h-7 text-white" strokeWidth={3} />
              </div>
            </div>

            {/* Circle at the curve midpoint */}
            <div className="absolute" style={{ top: '66%', left: '16.5%', zIndex: 30 }}>
              <div className="w-12 h-12 rounded-full bg-[#00B46A] flex items-center justify-center ring-8 ring-white dark:ring-gray-900 shadow-lg">
                <Check className="w-7 h-7 text-white" strokeWidth={3} />
              </div>
            </div>

            {/* Bottom Row: Frontend → Governance */}
            <div className="grid grid-cols-3 gap-16 relative" style={{ zIndex: 20 }}>
              {/* Frontend */}
              <div className="relative" style={{ animation: `fadeInUp 0.6s ease-out 0.45s both` }}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B46A] transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {steps[3].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {parseRichText(steps[3].description)}
                  </p>
                </div>
                {/* Circle between Frontend and Governance */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 translate-x-8" style={{ zIndex: 30 }}>
                  <div className="w-12 h-12 rounded-full bg-[#00B46A] flex items-center justify-center ring-8 ring-white dark:ring-gray-900 shadow-lg">
                    <Check className="w-7 h-7 text-white" strokeWidth={3} />
                  </div>
                </div>
              </div>

              {/* Governance */}
              <div className="relative" style={{ animation: `fadeInUp 0.6s ease-out 0.6s both` }}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B46A] transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {steps[4].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {parseRichText(steps[4].description)}
                  </p>
                </div>
              </div>

              {/* Empty third column */}
              <div></div>
            </div>

            {/* Circle at the end of Governance line */}
            <div className="absolute" style={{ top: '78%', right: '16.5%', zIndex: 30 }}>
              <div className="w-12 h-12 rounded-full bg-[#00B46A] flex items-center justify-center ring-8 ring-white dark:ring-gray-900 shadow-lg">
                <Check className="w-7 h-7 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>
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
