import { Database, Server, Brain, Cpu, Code, Layout } from 'lucide-react';

interface Technology {
  icon: string;
  name: string;
}

interface TechStackSectionProps {
  techStack: Technology[];
}

const iconMap: Record<string, React.ElementType> = {
  'database': Database,
  'server': Server,
  'brain': Brain,
  'cpu': Cpu,
  'code': Code,
  'layout': Layout,
};

export default function TechStackSection({ techStack }: TechStackSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Technology Stack
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
          {techStack.map((tech, index) => {
            const IconComponent = iconMap[tech.icon] || Cpu;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center w-full"
              >
                <div className="w-20 h-20 rounded-xl bg-white dark:bg-gray-900 shadow-lg border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center mb-4 hover:border-[#00B46A] transition-all duration-300">
                  <IconComponent className="text-gray-700 dark:text-gray-300" size={36} />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {tech.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
