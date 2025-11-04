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
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8V10C6 11.1046 6.89543 12 8 12C9.10457 12 10 11.1046 10 10V8Z"
                  fill="#00B46A"
                />
                <path
                  d="M18 8C18 6.89543 17.1046 6 16 6C14.8954 6 14 6.89543 14 8V10C14 11.1046 14.8954 12 16 12C17.1046 12 18 11.1046 18 10V8Z"
                  fill="#00B46A"
                />
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
