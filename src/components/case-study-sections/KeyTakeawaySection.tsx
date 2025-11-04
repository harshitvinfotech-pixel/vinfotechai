
interface KeyTakeawaySectionProps {
  takeawayText: string;
}

export default function KeyTakeawaySection({ takeawayText }: KeyTakeawaySectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col items-center text-center">
          <div className="mb-8">
            <img
              src="/vinfo-2.png"
              alt="Vinfotech Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Key Takeaway
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
            {takeawayText}
          </p>
        </div>
      </div>
    </section>
  );
}
