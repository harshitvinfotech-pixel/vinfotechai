interface QuoteBannerSectionProps {
  quoteText: string;
  quoteAttribution: string;
}

export default function QuoteBannerSection({ quoteText, quoteAttribution }: QuoteBannerSectionProps) {
  if (!quoteText) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#00B46A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center gap-8 lg:gap-12">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-white flex items-center justify-center">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 18C12 15.7909 13.7909 14 16 14C18.2091 14 20 15.7909 20 18V22C20 24.2091 18.2091 26 16 26C13.7909 26 12 24.2091 12 22V18Z"
                  fill="#00B46A"
                />
                <path
                  d="M28 18C28 15.7909 29.7909 14 32 14C34.2091 14 36 15.7909 36 18V22C36 24.2091 34.2091 26 32 26C29.7909 26 28 24.2091 28 22V18Z"
                  fill="#00B46A"
                />
                <rect x="12" y="22" width="8" height="8" rx="4" fill="#00B46A"/>
                <rect x="28" y="22" width="8" height="8" rx="4" fill="#00B46A"/>
              </svg>
            </div>
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
