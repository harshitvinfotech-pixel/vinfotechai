interface QuoteBannerSectionProps {
  quoteText: string;
  quoteAttribution: string;
}

export default function QuoteBannerSection({ quoteText, quoteAttribution }: QuoteBannerSectionProps) {
  if (!quoteText) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#00B46A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center gap-8 lg:gap-12 animate-[fadeIn_1s_ease-out]">
          <style>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
          <div className="flex-shrink-0">
            <img
              src="/qt.png"
              alt="Quote"
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain"
            />
          </div>

          <div className="flex-1">
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white mb-4 sm:mb-5 leading-relaxed italic">
              "{quoteText}"
            </blockquote>

            {quoteAttribution && (
              <p className="text-base sm:text-lg text-white/80 font-light">
                {quoteAttribution}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
