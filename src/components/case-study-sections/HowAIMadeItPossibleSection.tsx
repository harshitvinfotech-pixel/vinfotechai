import { Sparkles } from 'lucide-react';

interface AIFeature {
  icon: string;
  title: string;
  description: string;
}

interface HowAIMadeItPossibleSectionProps {
  title?: string;
  subtitle?: string;
  features: AIFeature[];
}

export default function HowAIMadeItPossibleSection({
  title = "How AI Made It Possible",
  subtitle,
  features
}: HowAIMadeItPossibleSectionProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="w-14 h-14 bg-[#00B46A] rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
