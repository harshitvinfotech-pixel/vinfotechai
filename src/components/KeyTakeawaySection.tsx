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
      {quote && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-6 max-w-3xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Quote className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 italic leading-relaxed mb-3">
                  "{quote}"
                </p>
                {(quoteAuthor || quoteRole) && (
                  <div className="text-sm font-semibold">
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

      <div className={`bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 sm:p-12 text-white text-center ${quote ? 'pt-24 sm:pt-28' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h3>
          </div>
          <div className="text-lg sm:text-xl leading-relaxed opacity-95">
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
    </section>
  );
}
