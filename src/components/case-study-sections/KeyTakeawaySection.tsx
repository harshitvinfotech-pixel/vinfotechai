
interface KeyTakeawaySectionProps {
  takeawayText: string;
}

export default function KeyTakeawaySection({ takeawayText }: KeyTakeawaySectionProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl lg:rounded-3xl p-6 sm:p-10 lg:p-16 flex flex-col items-center text-center">
          <div className="mb-5 sm:mb-6 lg:mb-8">
            <img
              src="/vinfo-2.png"
              alt="Vinfotech"
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 object-contain"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-6 lg:mb-8">
            Key Takeaway
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
            {takeawayText}
          </p>
        </div>
      </div>
    </section>
  );
}
