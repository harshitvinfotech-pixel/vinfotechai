interface KeyTakeawaySectionProps {
  title?: string;
  takeaway: string;
}

export default function KeyTakeawaySection({
  title = 'Key Takeaway',
  takeaway
}: KeyTakeawaySectionProps) {
  return (
    <section className="mb-16">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 sm:p-12 text-white text-center">
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
