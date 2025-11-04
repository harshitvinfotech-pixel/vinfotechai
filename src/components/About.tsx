import { Target, Zap, Shield } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function About() {
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
    <section
      id="about"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900"></div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      </div>

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.03) 2px,
            rgba(255,255,255,0.03) 4px
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.03) 2px,
            rgba(255,255,255,0.03) 4px
          )`
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-4 sm:space-y-5 text-left">
              <p className="text-sm sm:text-lg font-semibold tracking-[0.15em] uppercase" style={{ color: '#00B46A' }}>
                WHAT WE DO
              </p>
              <h2 className="text-gray-900 dark:text-white leading-[1.25] text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold">
                Custom AI Solutions, Enterprise Scale
              </h2>
            </div>

            <div className="space-y-5 text-gray-700 dark:text-gray-300 leading-[1.7] text-base sm:text-xl md:text-[22px] lg:text-[24px] font-normal text-left">
              <p>
                We are a specialized <span className="font-semibold text-gray-900 dark:text-white">AI Engineering</span> firm that turns your most ambitious business challenges into intelligent, production-ready applications.
              </p>
              <p>
                Our expertise is deeply rooted in <span className="font-semibold text-gray-900 dark:text-white">Generative AI, Computer Vision (CV), Retrieval-Augmented Generation (RAG)</span>, and <span className="font-semibold text-gray-900 dark:text-white">AI Agents</span>. We build <span className="font-semibold text-gray-900 dark:text-white">AI that runs inside your business — on your data, within your environment</span>.
              </p>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-gray-100 dark:bg-gray-800/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 space-y-6">
              <FeatureCard
                icon={<Target size={24} />}
                title="Tailored AI, Built for You"
                delay="0ms"
                isVisible={isVisible}
              />

              <FeatureCard
                icon={<Zap size={24} />}
                title="Prototype in Weeks, Not Months"
                delay="200ms"
                isVisible={isVisible}
              />

              <FeatureCard
                icon={<Shield size={24} />}
                title="Runs Inside Your Infrastructure"
                delay="400ms"
                isVisible={isVisible}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent pointer-events-none"></div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  delay: string;
  isVisible: boolean;
}

function FeatureCard({ icon, title, delay, isVisible }: FeatureCardProps) {
  return (
    <div
      className={`group relative bg-gray-50 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/60 dark:border-gray-700/40 transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
      style={{
        transitionDelay: isVisible ? delay : '0ms',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      <div className="relative flex gap-3 sm:gap-4 items-center">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00B46A] to-[#00964F] dark:from-[#00D68A] dark:to-[#00B46A] rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            <div className="text-white transition-transform duration-500 group-hover:scale-110">
              {icon}
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold transition-all duration-500 group-hover:translate-x-1 break-words" style={{ color: '#00B46A' }}>
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
