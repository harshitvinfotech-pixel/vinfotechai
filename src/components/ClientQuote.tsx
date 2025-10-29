import { Quote } from 'lucide-react';

interface ClientQuoteProps {
  quote: string;
  author: string;
  role: string;
}

export default function ClientQuote({ quote, author, role }: ClientQuoteProps) {
  return (
    <section className="mb-16">
      <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-8 sm:p-12 border border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Quote className="text-white" size={28} />
            </div>
            <div className="flex-1">
              <p className="text-lg sm:text-2xl text-gray-100 italic leading-relaxed mb-4">
                "{quote}"
              </p>
              <div className="text-base sm:text-lg font-semibold">
                <span className="text-emerald-400">{author}</span>
                <span className="text-gray-400"> — {role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
