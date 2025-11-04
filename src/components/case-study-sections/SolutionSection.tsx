interface SolutionSectionProps {
  solutionText: string;
  solutionImage: string;
}

export default function SolutionSection({ solutionText, solutionImage }: SolutionSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-1">
            <h2 className="text-3xl sm:text-xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              The AI Solution
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>{solutionText}</p>
            </div>
          </div>

          <div className="order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-8 flex items-center justify-center min-h-[400px]">
              <img
                src={solutionImage}
                alt="AI Solution"
                className="max-w-full max-h-[500px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
