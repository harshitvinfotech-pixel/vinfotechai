import { useState } from 'react';
import type { ImageBlockData } from '../../types/caseStudy';

interface ImageBlockProps {
  data: ImageBlockData;
}

export default function ImageBlock({ data }: ImageBlockProps) {
  const { image_url, caption, alt_text, size = 'large' } = data;
  const [isLoaded, setIsLoaded] = useState(false);

  const sizeClasses = {
    full: 'w-full',
    large: 'w-full max-w-5xl mx-auto',
    medium: 'w-full max-w-3xl mx-auto',
    small: 'w-full max-w-xl mx-auto'
  }[size];

  return (
    <div className={`${sizeClasses} px-6`}>
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
        )}
        <img
          src={image_url}
          alt={alt_text || caption || ''}
          className={`w-full h-auto transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      </div>
      {caption && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-sm sm:text-base">
          {caption}
        </p>
      )}
    </div>
  );
}
