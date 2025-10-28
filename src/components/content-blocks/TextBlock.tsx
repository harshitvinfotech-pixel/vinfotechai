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
    <div className={`max-w-4xl mx-auto px-6 ${alignmentClass}`}>
      {heading && (
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {heading}
        </h2>
      )}
      <div
        className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
