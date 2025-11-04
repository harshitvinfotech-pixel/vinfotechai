import { Brain, Database, Code, Server, Layers, Cpu, Box, Cloud, Search, Zap } from 'lucide-react';

interface Technology {
  name: string;
  category: string;
  description?: string;
  logo_url?: string;
}

interface TechStackSectionProps {
  techStack: Technology[];
  title?: string;
  subtitle?: string;
}

const iconMap: Record<string, React.ElementType> = {
  'AI/ML': Brain,
  'Database': Database,
  'Frontend': Code,
  'Backend': Server,
  'Infrastructure': Cloud,
  'Search': Search,
  'default': Cpu,
};

const getTechIcon = (category: string, name: string): React.ElementType => {
  if (iconMap[category]) return iconMap[category];

  if (name.toLowerCase().includes('redis')) return Zap;
  if (name.toLowerCase().includes('docker')) return Box;
  if (name.toLowerCase().includes('elastic')) return Search;
  if (name.toLowerCase().includes('react') || name.toLowerCase().includes('next')) return Layers;

  return iconMap.default;
};

export default function TechStackSection({
  techStack,
  title = "Technology Stack",
  subtitle = "Our systematic approach to building enterprise-grade AI solutions"
}: TechStackSectionProps) {
  if (!techStack || techStack.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {techStack.map((tech, index) => {
            const IconComponent = getTechIcon(tech.category, tech.name);

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center border border-gray-200 dark:border-gray-700"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-6">
                  {tech.logo_url ? (
                    <img
                      src={tech.logo_url}
                      alt={tech.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                    />
                  ) : (
                    <IconComponent
                      className="text-gray-800 dark:text-gray-200"
                      size={40}
                      strokeWidth={1.5}
                    />
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {tech.name}
                </h3>
                {tech.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {tech.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
