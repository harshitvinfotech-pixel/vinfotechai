import { Database, Brain, Zap, Search, Shield, Cpu } from 'lucide-react';

interface AIFeature {
  icon: string;
  title: string;
  description: string;
}

interface AIFeaturesSectionProps {
  aiFeatures: AIFeature[];
}

const iconMap: Record<string, React.ElementType> = {
  'database': Database,
  'brain': Brain,
  'zap': Zap,
  'search': Search,
  'shield': Shield,
  'cpu': Cpu,
};

export default function AIFeaturesSection({ aiFeatures }: AIFeaturesSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How AI Made it Possible
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Advanced AI technologies powering intelligent automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Brain;
            return (
              <div
                key={index}
                className="bg-white dark:bg-dark-bg rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: '#00B46A20' }}
                >
                  <IconComponent className="text-[#00B46A]" size={28} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
