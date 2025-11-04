interface QuoteBannerSectionProps {
  quoteText: string;
  quoteAttribution: string;
}

export default function QuoteBannerSection({ quoteText, quoteAttribution }: QuoteBannerSectionProps) {
  if (!quoteText) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: '#00B46A' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-start gap-8 lg:gap-12">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18H6V12Z"
                  fill="#00B46A"
                />
                <path
                  d="M9.5 10.5C9.5 9.67157 8.82843 9 8 9C7.17157 9 6.5 9.67157 6.5 10.5V13.5C6.5 14.3284 7.17157 15 8 15C8.82843 15 9.5 14.3284 9.5 13.5V10.5Z"
                  fill="white"
                />
                <path
                  d="M14.5 10.5C14.5 9.67157 13.8284 9 13 9C12.1716 9 11.5 9.67157 11.5 10.5V13.5C11.5 14.3284 12.1716 15 13 15C13.8284 15 14.5 14.3284 14.5 13.5V10.5Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium text-white mb-6 leading-relaxed italic">
              "{quoteText}"
            </blockquote>

            {quoteAttribution && (
              <p className="text-base sm:text-lg text-white/90 font-normal">
                {quoteAttribution}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
