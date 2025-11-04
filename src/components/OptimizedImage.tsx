import React, { useState } from 'react';
import { ImageProps } from '../utils/imageOptimization';

interface OptimizedImageProps extends ImageProps {
  aspectRatio?: string;
  onLoad?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  fetchpriority = 'auto',
  aspectRatio,
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const containerStyle = aspectRatio
    ? { aspectRatio, position: 'relative' as const }
    : undefined;

  return (
    <div style={containerStyle} className={`${!isLoaded ? 'bg-gray-200 animate-pulse' : ''}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchpriority}
        onLoad={handleLoad}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        decoding="async"
      />
    </div>
  );
}
