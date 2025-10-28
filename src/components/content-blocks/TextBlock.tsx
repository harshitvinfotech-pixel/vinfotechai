import type { TextBlockData } from '../../types/caseStudy';

interface TextBlockProps {
  data: TextBlockData;
}

export default function TextBlock({ data }: TextBlockProps) {
  const { heading, content, alignment = 'left' } = data;

  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[alignment];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className={`max-w-5xl ${alignment === 'center' ? 'mx-auto' : ''}`}>
        {heading && (
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
            {heading}
          </h2>
        )}
        <div
          className={`prose prose-lg sm:prose-xl dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 ${alignmentClass}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
