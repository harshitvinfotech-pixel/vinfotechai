interface ChallengeSectionProps {
  challengeImage: string;
  challengeText: string;
}

export default function ChallengeSection({ challengeImage, challengeText }: ChallengeSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={challengeImage}
                alt="The Challenge"
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
              The Challenge
            </h2>
            <div
              className="prose prose-lg sm:prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: challengeText }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
