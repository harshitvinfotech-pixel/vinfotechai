import { useEffect, useRef, useState } from 'react';
import { Zap, Users, Lock, Plus, X } from 'lucide-react';

export default function WhyUs() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = [0, 1, 2];
            cards.forEach((index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'Rapid Prototyping to Production',
      features: [
        '<b>Working prototype in 10 days</b><br/>Your working prototype ready in just 10 days of focused development.',
        '<b>Agile iterative approach</b><br/>Continuous feedback loops ensure we\'re always moving in the right direction.',
      ],
      benefits: ['Speed to Market', 'Rapid Iteration', 'Fast Deployment'],
      gradient: 'from-[#00B46A] to-[#00B46A]',
      bgColor: 'from-[#00B46A]/5 to-[#00B46A]/5',
      borderColor: 'border-[#00B46A]/20',
      hoverBorder: 'hover:border-[#00B46A]/40',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Users,
      title: 'Deep Technical Expertise',
      features: [
        '<b>PhD-level AI researchers</b><br/>Our team brings deep academic knowledge and cutting-edge research.',
        '<b>Proven Mastery in RAG & Vision</b><br/>Specialized verticals within Vinfotech focused on RAG and Computer Vision automation.',
        '<b>Full-Stack AI Engineering Team</b><br/>Data Scientists, ML Engineers, and Designers build complete, production-ready systems collaboratively.',
      ],
      benefits: ['World-Class Team', 'Enterprise Experience', 'Research Expertise'],
      gradient: 'from-[#00B46A] to-[#00B46A]',
      bgColor: 'from-[#00B46A]/5 to-[#00B46A]/5',
      borderColor: 'border-[#00B46A]/20',
      hoverBorder: 'hover:border-[#00B46A]/40',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Lock,
      title: 'Built inside your environment',
      features: [
        '<b>Your Data, Your Infrastructure</b><br/>Deployed securely within your servers or Private Cloud.',
        '<b>You Own the Code and IP</b><br/>Full ownership - delivered with complete code and IP rights.',
      ],
      benefits: ['Full Ownership', 'Secure Deployment', 'ROI-Driven'],
      gradient: 'from-[#00B46A] to-[#00B46A]',
      bgColor: 'from-[#00B46A]/5 to-[#00B46A]/5',
      borderColor: 'border-[#00B46A]/20',
      hoverBorder: 'hover:border-[#00B46A]/40',
      image: 'https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 bg-[#f7f7f7] dark:bg-gray-900 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900"></div>

      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 70%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)`,
          }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#00B46A]">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight px-2">
            Why Choose Vinfotech
          </h2>
          <p className="text-lg sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            We're more than just developers. We're your strategic AI partner committed to your success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              isVisible={visibleCards.includes(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  gradient: string;
  bgColor: string;
  borderColor: string;
  hoverBorder: string;
  image: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
  isVisible: boolean;
}

function FeatureCard({ feature, index, isVisible }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`group relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
      ></div>

      <div className={`relative flex flex-col bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-[#00B46A]/30 dark:hover:border-[#00B46A]/30 transition-all duration-500 shadow-lg hover:shadow-2xl h-[500px] sm:h-[600px] lg:h-[650px] overflow-hidden`}>
        <div className={`relative overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-all duration-500 ${
          isExpanded ? 'h-48 sm:h-56' : 'h-full'
        }`}>
          <div className={`absolute inset-0 transition-all duration-1000 ${
            imageLoaded && isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <img
              src={feature.image}
              alt={feature.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered && !isExpanded ? 'scale-110 brightness-110' : 'scale-100 brightness-100'
              }`}
              onLoad={() => setImageLoaded(true)}
            />

            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent`}></div>
          </div>


          <div className="absolute inset-0 z-10 flex items-center justify-start px-6 sm:px-8">
            <h3 className="font-bold text-white leading-tight text-left font-['Helvetica','Arial',sans-serif]" style={{ fontSize: '45px' }}>
              {feature.title}
            </h3>
          </div>
        </div>

        {isExpanded && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            <div className="space-y-4">
              {feature.features.map((feat, featureIndex) => (
                <div
                  key={featureIndex}
                  className="flex items-start gap-3"
                >
                  <div className="relative mt-1.5 flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`}></div>
                  </div>
                  <span
                    className="text-gray-700 dark:text-gray-300 text-lg sm:text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: feat }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute bottom-4 right-4 z-20 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B46A] dark:hover:border-[#00B46A]"
          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
        >
          {isExpanded ? (
            <X className="text-[#00B46A]" size={20} strokeWidth={2.5} />
          ) : (
            <Plus className="text-[#00B46A]" size={20} strokeWidth={2.5} />
          )}
        </button>
      </div>
    </div>
  );
}
