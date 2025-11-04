interface QuoteBannerSectionProps {
  quoteText: string;
  quoteAttribution: string;
}

export default function QuoteBannerSection({ quoteText, quoteAttribution }: QuoteBannerSectionProps) {
  if (!quoteText) return null;

  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-start gap-6 lg:gap-8">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10"
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
                <path
                  d="M8 12C6.34315 12 5 13.3431 5 15V16C5 17.6569 6.34315 19 8 19H8.5C8.77614 19 9 18.7761 9 18.5V15.5C9 13.567 7.433 12 5.5 12H5C4.72386 12 4.5 12.2239 4.5 12.5C4.5 12.7761 4.72386 13 5 13H5.5C6.88071 13 8 14.1193 8 15.5V18C7.44772 18 7 17.5523 7 17V15C7 14.4477 7.44772 14 8 14C8.55228 14 9 13.5523 9 13C9 12.4477 8.55228 12 8 12Z"
                  fill="#00B46A"
                />
                <path
                  d="M16 12C14.3431 12 13 13.3431 13 15V16C13 17.6569 14.3431 19 16 19H16.5C16.7761 19 17 18.7761 17 18.5V15.5C17 13.567 15.433 12 13.5 12H13C12.7239 12 12.5 12.2239 12.5 12.5C12.5 12.7761 12.7239 13 13 13H13.5C14.8807 13 16 14.1193 16 15.5V18C15.4477 18 15 17.5523 15 17V15C15 14.4477 15.4477 14 16 14C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12Z"
                  fill="#00B46A"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 leading-relaxed italic">
              {quoteText}
            </blockquote>

            {quoteAttribution && (
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-normal">
                {quoteAttribution}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
