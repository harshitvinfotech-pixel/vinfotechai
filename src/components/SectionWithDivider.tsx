import { LucideIcon } from 'lucide-react';

interface SectionWithDividerProps {
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
  showDivider?: boolean;
}

export default function SectionWithDivider({
  icon: Icon,
  iconColor = '#00B46A',
  title,
  content,
  imagePosition = 'right',
  imageComponent,
  bullets,
  className = '',
  showDivider = true
}: SectionWithDividerProps) {
  const ContentColumn = () => (
    <div className="flex flex-col justify-center min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        {Icon && (
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${iconColor}20` }}>
            <Icon style={{ color: iconColor }} size={20} className="sm:w-7 sm:h-7" />
          </div>
        )}
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>

      {typeof content === 'string' ? (
        <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">{content}</div>
      )}

      {bullets && bullets.length > 0 && (
        <ul className="mt-3 sm:mt-4 lg:mt-6 space-y-2 sm:space-y-3 lg:space-y-4">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2 sm:gap-3">
              {bullet.icon && (
                <bullet.icon style={{ color: iconColor }} size={18} className="sm:w-6 sm:h-6 flex-shrink-0 mt-0.5 sm:mt-1" />
              )}
              <span className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{bullet.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const ImageColumn = () => (
    <div className="flex items-center justify-center min-h-[300px] sm:min-h-[350px] lg:min-h-[500px]">
      {imageComponent}
    </div>
  );

  return (
    <section className={`py-6 sm:py-10 lg:py-16 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-start lg:items-center">
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

      {showDivider && (
        <div className="mt-6 sm:mt-10 lg:mt-16">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t-2 border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-white dark:bg-gray-900 px-3 sm:px-4">
                <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full" style={{ backgroundColor: '#00B46A' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
