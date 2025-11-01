interface ChallengeSectionProps {
  challengeImage: string;
  challengeText: string;
}

export default function ChallengeSection({ challengeImage, challengeText }: ChallengeSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              The Challenge
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>{challengeText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
