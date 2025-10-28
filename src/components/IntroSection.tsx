import { useEffect, useRef, useState } from 'react';

export default function IntroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-[#00B46A]/20 via-[#00B46A]/10 to-gray-50 dark:from-[#00B46A]/15 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(0, 180, 106, 0.25) 0%, transparent 50%),
                             radial-gradient(circle at 70% 80%, rgba(0, 180, 106, 0.2) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 tracking-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Custom AI <span className="text-[#00B46A]">Software Development</span>
        </h2>

        <p className={`text-xl sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed sm:leading-relaxed md:leading-relaxed transition-all duration-1000 sm:px-6 md:px-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
         <b>Stop settling for generic SaaS.</b> We engineer high-impact, custom AI solutions that solve your hardest problems. From factual answers with <b>Enterprise RAG</b> to autonomous processes with <b>Computer Vision</b>, we turn your most ambitious ideas into <b>production-ready software—fast.</b>
        </p>
      </div>
    </section>
  );
}
