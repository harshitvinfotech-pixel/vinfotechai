interface KeyTakeawaySectionProps {
  takeawayText: string;
}

export default function KeyTakeawaySection({ takeawayText }: KeyTakeawaySectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block w-16 h-16 rounded-full bg-[#00B46A]/10 flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-[#00B46A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Key Takeaway
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 sm:p-12 shadow-xl border-l-8 border-[#00B46A]">
          <div
            className="prose prose-lg sm:prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: takeawayText }}
          />
        </div>
      </div>
    </section>
  );
}
