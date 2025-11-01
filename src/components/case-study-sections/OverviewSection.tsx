interface OverviewSectionProps {
  overviewText: string;
}

export default function OverviewSection({ overviewText }: OverviewSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            {overviewText}
          </p>
        </div>
      </div>
    </section>
  );
}
