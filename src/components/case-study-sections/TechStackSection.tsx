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
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {techStack.map((tech, index) => {
            const IconComponent = getTechIcon(tech.category, tech.name);

            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-32 h-32 rounded-2xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-xl group-hover:border-[#00B46A] group-hover:-translate-y-1">
                  {tech.logo_url ? (
                    <img
                      src={tech.logo_url}
                      alt={tech.name}
                      className="w-16 h-16 object-contain"
                    />
                  ) : (
                    <IconComponent
                      className="text-gray-700 dark:text-gray-300 group-hover:text-[#00B46A] transition-colors"
                      size={48}
                    />
                  )}
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                  {tech.name}
                </h3>
                {tech.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
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
