import { useEffect, useRef, useState } from 'react';

interface CompanyStat {
  value: string;
  label: string;
}

const companyStats: CompanyStat[] = [
  {
    value: '10k+',
    label: 'Active Learners'
  },
  {
    value: '500+',
    label: 'Projects Completed'
  },
  {
    value: '50+',
    label: 'Countries'
  },
  {
    value: '95%',
    label: 'Success Rate'
  }
];

export default function CompanyStatsBanner() {
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
    <div
      ref={sectionRef}
      className={`w-full bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 rounded-3xl py-12 px-8 shadow-2xl transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {companyStats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <div className="text-5xl lg:text-6xl font-bold text-white mb-3">
                {stat.value}
              </div>
              <div className="text-lg lg:text-xl text-blue-100 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
