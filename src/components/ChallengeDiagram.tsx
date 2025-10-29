import { AlertTriangle, Clock, Layers, Languages, Link } from 'lucide-react';

export default function ChallengeDiagram() {
  const problems = [
    {
      icon: Clock,
      title: 'Time-Consuming Research',
      description: 'Sales team spent 3+ hours researching each complex query',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Layers,
      title: 'Fragmented Data Sources',
      description: 'Information scattered across 15+ different sources',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Languages,
      title: 'Inconsistent Responses',
      description: 'Different team members provided varying answers',
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: Link,
      title: 'Manual Correlation',
      description: 'Manual effort required to connect data points',
      color: 'from-rose-500 to-red-500'
    }
  ];

  const dataSources = [
    { label: 'Product PDFs', icon: '📄' },
    { label: 'Pricing Sheets', icon: '💰' },
    { label: 'Case Studies', icon: '📊' },
    { label: 'Documentation', icon: '📚' }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            The Data Complexity Problem
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Before AI: A fragmented landscape of information
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {dataSources.map((source, index) => (
              <div
                key={index}
                className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-700 text-center transition-all duration-300 hover:shadow-md"
              >
                <div className="text-3xl mb-2">{source.icon}</div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {source.label}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-500 dark:border-red-400 rounded-lg px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-red-600 dark:text-red-400" size={20} />
                <span className="text-sm font-bold text-red-600 dark:text-red-400">
                  Disconnected Data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {problems.map((problem, index) => (
          <div
            key={index}
            className="bg-red-50 dark:bg-red-900/10 rounded-xl p-5 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${problem.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
              >
                <problem.icon className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {problem.title}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {problem.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
