import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CTAProps {
  onQuoteClick: () => void;
}

export default function CTA({ onQuoteClick }: CTAProps) {
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
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-gray-100 via-white to-gray-100 dark:from-black dark:via-gray-950 dark:to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 dark:from-emerald-950/20 via-transparent to-teal-100/20 dark:to-teal-950/20"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className={`max-w-5xl mx-auto relative transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl sm:rounded-3xl opacity-20 group-hover:opacity-30 blur-2xl transition-opacity duration-700"></div>

          <div className="relative bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-700/50 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5"></div>

            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>

            <div className="relative px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 text-center">
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <img
                    src="/vinfo-2.png"
                    alt="Vinfo Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight leading-[1.2] px-4 sm:px-6">
                Start a 10-Day AI Sprint
              </h2>

              <div className="max-w-3xl mx-auto mb-8 sm:mb-10">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed px-4 sm:px-6">
                  Bring us one workflow. We'll ship something real.
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-emerald-600 dark:text-emerald-400 font-medium px-4 sm:px-6">
                  Let's discuss your custom AI Vision.
                </p>
              </div>

              <div className="flex justify-center px-2">
                <button
                  onClick={onQuoteClick}
                  className="group bg-[#00B46A] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-[#00B46A]/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl active:scale-105 min-w-[240px] sm:w-auto"
                >
                  Request a Quote
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                    strokeWidth={2.5}
                  />
                </button>
              </div>

              <div className="mt-8 sm:mt-12 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span>Get a response within 24 hours</span>
              </div>
            </div>

            <div className="absolute top-1/2 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute top-1/2 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-teal-500/30 to-transparent -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
    </section>
  );
}
