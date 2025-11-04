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
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10.5C6 9.67157 6.67157 9 7.5 9C8.32843 9 9 9.67157 9 10.5C9 11.3284 8.32843 12 7.5 12C6.67157 12 6 11.3284 6 10.5Z"
                  fill="#00B46A"
                />
                <path
                  d="M15 10.5C15 9.67157 15.6716 9 16.5 9C17.3284 9 18 9.67157 18 10.5C18 11.3284 17.3284 12 16.5 12C15.6716 12 15 11.3284 15 10.5Z"
                  fill="#00B46A"
                />
                <path
                  d="M9 10.5V12.5C9 13.8807 7.88071 15 6.5 15C6.22386 15 6 14.7761 6 14.5C6 14.2239 6.22386 14 6.5 14C7.32843 14 8 13.3284 8 12.5V10.5C8 9.67157 7.32843 9 6.5 9"
                  fill="#00B46A"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
                <path
                  d="M18 10.5V12.5C18 13.8807 16.8807 15 15.5 15C15.2239 15 15 14.7761 15 14.5C15 14.2239 15.2239 14 15.5 14C16.3284 14 17 13.3284 17 12.5V10.5C17 9.67157 16.3284 9 15.5 9"
                  fill="#00B46A"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-white mb-3 sm:mb-4 leading-relaxed italic">
              {quoteText}
            </blockquote>

            {quoteAttribution && (
              <p className="text-sm sm:text-base text-white font-normal">
                {quoteAttribution}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
