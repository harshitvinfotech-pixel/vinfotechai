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
  iconColor = '#ffffff',
  title,
  content,
  imagePosition = 'right',
  imageComponent,
  bullets,
  className = '',
  showDivider = true
}: SectionWithDividerProps) {
  const ContentColumn = () => (
    <div className="flex flex-col justify-center w-full">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          {Icon && (
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{
                backgroundColor: `${iconColor}15`,
                border: `100px solid ${iconColor}30`
              }}
            >
              <Icon style={{ color: iconColor }} size={22} className="sm:w-7 sm:h-7" />
            </div>
          )}
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
            {title}
          </h3>
        </div>
      </div>

      {typeof content === 'string' ? (
        <div className="space-y-4 sm:space-y-5 text-base sm:text-lg lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-gray-600 dark:text-gray-400">{paragraph}</p>
          ))}
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">{content}</div>
      )}

      {bullets && bullets.length > 0 && (
        <ul className="mt-5 sm:mt-6 lg:mt-8 space-y-3 sm:space-y-4">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-3 sm:gap-4">
              {bullet.icon && (
                <div className="flex-shrink-0 mt-0.5">
                  <bullet.icon style={{ color: iconColor }} size={20} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                </div>
              )}
              <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                {bullet.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const ImageColumn = () => (
    <div className="flex items-center justify-center w-full">
      <div className="w-full">
        {imageComponent}
      </div>
    </div>
  );

  return (
    <section className={`py-10 sm:py-12 lg:py-16 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
        {imagePosition === 'left' ? (
          <>
            <div className="order-2 lg:order-1">
              <ImageColumn />
            </div>
            <div className="order-1 lg:order-2">
              <ContentColumn />
            </div>
          </>
        ) : (
          <>
            <div className="order-1">
              <ContentColumn />
            </div>
            <div className="order-2">
              <ImageColumn />
            </div>
          </>
        )}
      </div>

      {showDivider && (
        <div className="mt-10 sm:mt-12 lg:mt-16 w-full">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div
                className="w-full border-t-2"
                style={{
                  borderImage: `linear-gradient(to right, transparent, ${iconColor}40, transparent) 1`,
                  borderTop: `1px solid ${iconColor}20`
                }}
              ></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-white dark:bg-gray-900 px-4">
                <div
                  className="h-3 w-3 rounded-full shadow-lg"
                  style={{
                    backgroundColor: iconColor,
                    boxShadow: `0 0 12px ${iconColor}60`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
