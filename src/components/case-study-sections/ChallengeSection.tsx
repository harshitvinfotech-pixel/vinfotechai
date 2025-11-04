interface ChallengeSectionProps {
  challengeImage: string;
  challengeText: string;
}

function parseChallengeText(text: string) {
  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  let currentParagraph: string[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join(' ');
      elements.push(
        <p key={key++} className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          {parseInlineFormatting(paragraphText)}
        </p>
      );
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <div key={key++} className="bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 mb-6 space-y-3">
          {listItems.map((item, idx) => (
            <div key={idx} className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#00B46A] mt-2.5 mr-3"></span>
              <span className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {parseInlineFormatting(item)}
              </span>
            </div>
          ))}
        </div>
      );
      listItems = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    if (trimmed.startsWith('- ')) {
      flushParagraph();
      listItems.push(trimmed.substring(2));
    } else {
      flushList();
      currentParagraph.push(trimmed);
    }
  });

  flushParagraph();
  flushList();

  return elements;
}

function parseInlineFormatting(text: string): (string | JSX.Element)[] {
  const parts = text.split(/(\*\*.*?\*\*|<b>.*?<\/b>)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('<b>') && part.endsWith('</b>')) {
      return <strong key={index} className="font-bold text-gray-900 dark:text-white">{part.slice(3, -4)}</strong>;
    }
    return part;
  });
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
              {parseChallengeText(challengeText)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
