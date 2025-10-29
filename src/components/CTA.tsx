import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

interface CTAProps {
  onQuoteClick: () => void;
}

export default function CTA({ onQuoteClick }: CTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 px-6 sm:px-8 lg:px-12 bg-gray-200 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,106,0.08),transparent_70%)]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="relative">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl border border-gray-300 dark:border-gray-700 overflow-hidden shadow-lg">
            <div className="absolute inset-0 opacity-[0.15]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(200,200,200,0.4)_0%,_transparent_50%),radial-gradient(circle_at_70%_80%,_rgba(180,180,180,0.4)_0%,_transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_45%,rgba(220,220,220,0.3)_48%,rgba(220,220,220,0.3)_52%,transparent_55%,transparent_100%)] bg-[length:60px_60px]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e520_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e520_1px,transparent_1px)] bg-[size:32px_32px]"></div>
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dots" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                    <circle cx="40" cy="40" r="1.5" fill="rgba(200,200,200,0.5)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
            </div>

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

              <div className="max-w-3xl mx-auto mb-10 sm:mb-12">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed px-4 sm:px-6">
                  Bring us one workflow. We'll ship something real.
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium px-4 sm:px-6" style={{ color: '#666666' }}>
                  Let's discuss your custom AI Vision.
                </p>
              </div>

              <div className="flex justify-center px-2">
                <button
                  onClick={onQuoteClick}
                  className="bg-[#00B46A] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg min-w-[240px] sm:w-auto"
                >
                  Request a Quote
                  <ArrowRight
                    size={20}
                    strokeWidth={2.5}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
