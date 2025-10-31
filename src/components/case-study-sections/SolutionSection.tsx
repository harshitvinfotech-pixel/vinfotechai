interface SolutionSectionProps {
  solutionText: string;
  solutionImage: string;
}

export default function SolutionSection({ solutionText, solutionImage }: SolutionSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-1 lg:order-1">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
              The AI Solution
            </h2>
            <div
              className="prose prose-lg sm:prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: solutionText }}
            />
          </div>

          <div className="order-2 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-600 to-indigo-700 p-8">
              <img
                src={solutionImage}
                alt="AI Solution"
                className="w-full h-[400px] sm:h-[500px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
