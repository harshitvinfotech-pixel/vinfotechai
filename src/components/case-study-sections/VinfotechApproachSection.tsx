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
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#00B46A] to-transparent transform -translate-x-1/2"></div>

          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start lg:items-center gap-4 sm:gap-6 lg:gap-8 ${
                  index % 2 === 0 ? 'flex-row lg:flex-row' : 'flex-row lg:flex-row-reverse'
                }`}
              >
                <div className="relative flex-shrink-0 order-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#00B46A] flex items-center justify-center ring-4 ring-white dark:ring-gray-900">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>

                <div className="flex-1 order-2 lg:order-none">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 text-left">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed text-left">
                      {parseRichText(step.description)}
                    </p>
                  </div>
                </div>

                <div className="hidden lg:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
