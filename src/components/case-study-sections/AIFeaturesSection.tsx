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
    <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            How AI Made it Possible
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Leveraging cutting-edge AI technologies to deliver exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Brain;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-2 border-gray-100 dark:border-gray-700 hover:border-[#00B46A] transition-all duration-300"
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: '#00B46A20' }}
                >
                  <IconComponent className="text-[#00B46A]" size={32} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
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
