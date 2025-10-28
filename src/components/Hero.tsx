import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onQuoteClick: () => void;
}

export default function Hero({ onQuoteClick }: HeroProps) {
  return (
    <section className="flex flex-col justify-center items-center px-6 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20" style={{ minHeight: '80vh' }}>
        <div className="max-w-6xl mx-auto text-center w-full">
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-7">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight px-2 sm:px-6 max-w-7xl w-full">
              <span className="text-gray-900 dark:text-white animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>Need a Production-Ready AI Team, Not Another SaaS Subscription?</span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-normal text-gray-700 dark:text-white/90 animate-fade-in-up px-4 sm:px-6 leading-relaxed max-w-4xl mx-auto" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
             Get a working, enterprise-ready custom-built pilot in weeks, built on your data, inside your environment.
            </p>

            <div className="flex justify-center animate-fade-in-up mt-2 md:hidden w-full" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
              <button
                onClick={onQuoteClick}
                className="group bg-[#00B46A] text-white px-7 sm:px-9 py-3 sm:py-3.5 rounded-lg font-semibold text-lg sm:text-xl hover:shadow-lg hover:shadow-[#00B46A]/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl active:scale-105 min-w-[220px] sm:w-auto"
                aria-label="Request a quote for custom AI development"
              >
                Request a Quote
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
    </section>
  );
}
