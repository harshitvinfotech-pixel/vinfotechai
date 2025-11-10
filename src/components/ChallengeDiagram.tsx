import { AlertTriangle, Clock, Layers, Languages, Link, FileText, DollarSign, BarChart3, BookOpen } from 'lucide-react';

export default function ChallengeDiagram() {
  const problems = [
    {
      icon: Clock,
      title: 'Time-Consuming Research',
      description: 'Sales team spent 3+ hours researching each complex query',
      color: '#EF4444'
    },
    {
      icon: Layers,
      title: 'Fragmented Data Sources',
      description: 'Information scattered across 15+ different sources',
      color: '#F97316'
    },
    {
      icon: Languages,
      title: 'Inconsistent Responses',
      description: 'Different team members provided varying answers',
      color: '#A855F7'
    },
    {
      icon: Link,
      title: 'Manual Correlation',
      description: 'Manual effort required to connect data points',
      color: '#EC4899'
    }
  ];

  const dataSources = [
    { label: 'Product PDFs', icon: FileText },
    { label: 'Pricing Sheets', icon: DollarSign },
    { label: 'Case Studies', icon: BarChart3 },
    { label: 'Documentation', icon: BookOpen }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-[rgb(49,54,64)] rounded-2xl p-8 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h4 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            The Data Complexity Problem
          </h4>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Before AI: A fragmented landscape of information
          </p>
        </div>

        <div className="bg-white dark:bg-[rgb(30,35,45)] rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 dark:border-gray-700 mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {dataSources.map((source, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <source.icon className="mx-auto mb-2 text-blue-600 dark:text-blue-400" size={28} />
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {source.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 dark:border-red-400 rounded-lg px-4 py-2.5 shadow-md">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-red-600 dark:text-red-400" size={20} />
                <span className="text-sm font-bold text-red-600 dark:text-red-400">
                  Disconnected Data
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[rgb(30,35,45)] rounded-lg p-5 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: problem.color + '20' }}
                >
                  <problem.icon style={{ color: problem.color }} size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">
                    {problem.title}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
