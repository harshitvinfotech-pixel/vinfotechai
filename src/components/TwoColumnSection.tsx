import { LucideIcon } from 'lucide-react';

interface TwoColumnSectionProps {
  icon?: LucideIcon;
  iconColor?: string;
  title: string;
  content: string | React.ReactNode;
  imagePosition?: 'left' | 'right';
  imageComponent?: React.ReactNode;
  bullets?: Array<{
    icon?: LucideIcon;
    text: string;
  }>;
  className?: string;
}

export default function TwoColumnSection({
  icon: Icon,
  iconColor = '#00B46A',
  title,
  content,
  imagePosition = 'right',
  imageComponent,
  bullets,
  className = ''
}: TwoColumnSectionProps) {
  const ContentColumn = () => (
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-6">
        {Icon && (
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${iconColor}20` }}>
            <Icon style={{ color: iconColor }} size={28} />
          </div>
        )}
        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>

      {typeof content === 'string' ? (
        <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <div className="space-y-4">{content}</div>
      )}

      {bullets && bullets.length > 0 && (
        <ul className="mt-6 space-y-4">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-3">
              {bullet.icon && (
                <bullet.icon style={{ color: iconColor }} size={24} className="flex-shrink-0 mt-1" />
              )}
              <span className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{bullet.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const ImageColumn = () => (
    <div className="flex items-center justify-center">
      {imageComponent}
    </div>
  );

  return (
    <section className={`mb-16 ${className}`}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 sm:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {imagePosition === 'left' ? (
            <>
              <ImageColumn />
              <ContentColumn />
            </>
          ) : (
            <>
              <ContentColumn />
              <ImageColumn />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
