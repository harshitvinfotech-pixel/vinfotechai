import { Quote } from 'lucide-react';

interface KeyTakeawaySectionProps {
  title?: string;
  takeaway: string;
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
}

export default function KeyTakeawaySection({
  title = 'Key Takeaway',
  takeaway,
  quote,
  quoteAuthor,
  quoteRole
}: KeyTakeawaySectionProps) {
  return (
    <section className="mb-16 relative">
      <div className={`px-4 py-8 sm:p-12 text-center ${quote ? 'pb-32 sm:pb-36' : ''}`} style={{ backgroundColor: 'var(--key-takeaway-bg)' }}>
        <div className="w-full mx-auto max-w-5xl">
          <div className="mb-4 sm:mb-6">
            <h3 className="font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white text-3xl sm:text-5xl md:text-6xl">{title}</h3>
          </div>
          <div className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 px-2 sm:px-0">
            {takeaway.split('\n\n').map((paragraph, idx) => {
              const parts = paragraph.split(/(\*\*.*?\*\*)/g);
              return (
                <p key={idx} className={idx > 0 ? 'mt-4' : ''}>
                  {parts.map((part, partIdx) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
                    }
                    return <span key={partIdx}>{part}</span>;
                  })}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {quote && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-10 w-full max-w-3xl px-3 sm:px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#00B46A] flex items-center justify-center">
                <Quote className="text-white" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base md:text-lg text-gray-800 dark:text-gray-200 italic leading-relaxed mb-2 sm:mb-3">
                  "{quote}"
                </p>
                {(quoteAuthor || quoteRole) && (
                  <div className="text-xs sm:text-sm font-semibold">
                    <span className="text-gray-900 dark:text-white">{quoteAuthor}</span>
                    {quoteRole && (
                      <span className="text-gray-600 dark:text-gray-400"> — {quoteRole}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
