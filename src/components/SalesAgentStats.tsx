import { Clock, CheckCircle, TrendingDown, MessageCircle, Award, Clock8 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface StatCard {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}

const stats: StatCard[] = [
  {
    icon: Clock,
    title: 'Response Time',
    value: '< 2 sec',
    description: 'Average response time per query'
  },
  {
    icon: CheckCircle,
    title: 'Accuracy',
    value: '94%',
    description: 'Answer accuracy validated against sales playbooks'
  },
  {
    icon: TrendingDown,
    title: 'Reduction',
    value: '70%',
    description: 'Manual sales responses reduced'
  },
  {
    icon: CheckCircle,
    title: 'Engagement',
    value: '2.3x',
    description: 'Longer visitor sessions'
  },
  {
    icon: Award,
    title: 'Conversions',
    value: '+35%',
    description: 'Increase in contact forms'
  },
  {
    icon: CheckCircle,
    title: 'Availability',
    value: '24/7',
    description: 'Always-on global support'
  }
];

export default function SalesAgentStats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
          }}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <stat.icon className="text-emerald-600 dark:text-emerald-400" size={28} strokeWidth={2} />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                {stat.title}
              </h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {stat.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
