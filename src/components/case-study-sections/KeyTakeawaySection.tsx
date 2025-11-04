import { CheckCircle } from 'lucide-react';

interface KeyTakeawaySectionProps {
  takeawayText: string;
}

export default function KeyTakeawaySection({ takeawayText }: KeyTakeawaySectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 rounded-full bg-[#00B46A]/10 flex items-center justify-center mb-4">
            <CheckCircle className="text-[#00B46A]" size={32} strokeWidth={2} />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Key Takeaway
          </h2>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 sm:p-12 shadow-xl border-l-8 border-[#00B46A]">
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {takeawayText}
          </p>
        </div>
      </div>
    </section>
  );
}
