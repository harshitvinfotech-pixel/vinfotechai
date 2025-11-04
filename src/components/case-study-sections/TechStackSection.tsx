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
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-left lg:text-center mb-8 sm:mb-12 lg:mb-16 animate-[fadeInUp_0.6s_ease-out]">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-3xl lg:mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {techStack.map((tech, index) => {
            const IconComponent = getTechIcon(tech.category, tech.name);

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center text-center border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-emerald-500"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
                }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl lg:rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-3 sm:mb-4 lg:mb-6">
                  {tech.logo_url ? (
                    <img
                      src={tech.logo_url}
                      alt={tech.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
                    />
                  ) : (
                    <IconComponent
                      className="text-gray-800 dark:text-gray-200"
                      size={32}
                      strokeWidth={1.5}
                    />
                  )}
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  {tech.name}
                </h3>
                {tech.description && (
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {tech.description}
                  </p>
                )}
              </div>
            );
          })}
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
