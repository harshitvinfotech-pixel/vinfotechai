interface SolutionSectionProps {
  solutionText: string;
  solutionImage: string;
}

function parseSolutionText(text: string) {
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
        <div key={key++} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6 space-y-4">
          {listItems.map((item, idx) => (
            <div key={idx} className="flex items-start group">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00B46A] text-white font-bold flex items-center justify-center text-sm mr-4">
                {idx + 1}
              </span>
              <span className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
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

    const numberedMatch = trimmed.match(/^(\d+)\.\s*(.+)$/);
    if (numberedMatch) {
      flushParagraph();
      listItems.push(numberedMatch[2]);
    } else if (trimmed.startsWith('- ')) {
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

export default function SolutionSection({ solutionText, solutionImage }: SolutionSectionProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          <div className="order-1 lg:order-2 animate-[slideInRight_0.8s_ease-out]">
            <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-6 sm:p-8 flex items-center justify-center min-h-[250px] sm:min-h-[350px] lg:min-h-[400px] transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={solutionImage}
                alt="AI Solution"
                className="max-w-full max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          <div className="order-2 lg:order-1 animate-[slideInLeft_0.8s_ease-out]">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-5 lg:mb-6 text-left">
              The AI Solution
            </h2>
            <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-left">
              {parseSolutionText(solutionText)}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
