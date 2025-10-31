import { MessageCircle } from 'lucide-react';

interface QuoteBannerSectionProps {
  quoteText: string;
  quoteAttribution: string;
}

export default function QuoteBannerSection({ quoteText, quoteAttribution }: QuoteBannerSectionProps) {
  if (!quoteText) return null;

  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#00B46A' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-8">
            <MessageCircle className="text-white" size={40} strokeWidth={2} />
          </div>

          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 leading-relaxed">
            "{quoteText}"
          </blockquote>

          {quoteAttribution && (
            <p className="text-xl sm:text-2xl text-white/95 font-medium">
              — {quoteAttribution}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
