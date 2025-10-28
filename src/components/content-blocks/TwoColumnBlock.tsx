import { useState } from 'react';
import type { TwoColumnBlockData } from '../../types/caseStudy';

interface TwoColumnBlockProps {
  data: TwoColumnBlockData;
}

export default function TwoColumnBlock({ data }: TwoColumnBlockProps) {
  const { left_content, right_content, image_url, image_position = 'right' } = data;
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const hasImage = !!image_url;
  const imageOnLeft = image_position === 'left';

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {hasImage && imageOnLeft && (
          <div className="order-1 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
              )}
              <img
                src={image_url}
                alt=""
                className={`w-full h-auto transition-opacity duration-500 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsImageLoaded(true)}
                loading="lazy"
              />
            </div>
          </div>
        )}

        <div className={`order-2 ${hasImage && imageOnLeft ? 'lg:order-2' : 'lg:order-1'}`}>
          <div
            className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: left_content }}
          />
        </div>

        {hasImage && !imageOnLeft && (
          <div className="order-3 lg:order-2">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
              )}
              <img
                src={image_url}
                alt=""
                className={`w-full h-auto transition-opacity duration-500 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsImageLoaded(true)}
                loading="lazy"
              />
            </div>
          </div>
        )}

        {!hasImage && (
          <div className="order-3 lg:order-2">
            <div
              className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: right_content }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
