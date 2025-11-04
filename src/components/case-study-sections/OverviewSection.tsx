interface OverviewSectionProps {
  overviewText: string;
}

function parseOverviewText(text: string) {
  const paragraphs = text.split('\n\n').filter(p => p.trim());

  return paragraphs.map((paragraph, pIndex) => {
    const parts = paragraph.split(/(\*\*.*?\*\*)/g);

    return (
      <p
        key={pIndex}
        className={`text-lg sm:text-xl md:text-2xl leading-relaxed ${
          pIndex === 0
            ? 'text-gray-900 dark:text-white font-bold mb-8'
            : 'text-gray-600 dark:text-gray-400 mb-6'
        }`}
      >
        {parts.map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={partIndex} className="font-bold text-gray-900 dark:text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <span key={partIndex}>{part}</span>;
        })}
      </p>
    );
  });
}

export default function OverviewSection({ overviewText }: OverviewSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          {parseOverviewText(overviewText)}
        </div>
      </div>
    </section>
  );
}
