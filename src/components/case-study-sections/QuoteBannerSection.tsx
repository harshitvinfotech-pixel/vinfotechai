interface QuoteBannerSectionProps {
  quoteText: string;
  quoteAttribution: string;
}

export default function QuoteBannerSection({ quoteText, quoteAttribution }: QuoteBannerSectionProps) {
  if (!quoteText) return null;

  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-[#00B46A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-start gap-6 lg:gap-8">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12"
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
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-white mb-3 sm:mb-4 leading-relaxed">
              "{quoteText}"
            </blockquote>

            {quoteAttribution && (
              <p className="text-sm sm:text-base text-white/90 font-normal">
                {quoteAttribution}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
