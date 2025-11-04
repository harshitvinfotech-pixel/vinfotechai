/**
 * Image optimization utilities for better performance
 */

export interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'high' | 'low' | 'auto';
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(src: string, sizes: number[] = [320, 640, 960, 1280]): string {
  return sizes
    .map(size => `${src}?w=${size} ${size}w`)
    .join(', ');
}

/**
 * Get optimized image attributes
 */
export function getOptimizedImageProps(
  src: string,
  alt: string,
  options: Partial<ImageProps> = {}
): ImageProps {
  return {
    src,
    alt,
    loading: options.loading || 'lazy',
    fetchpriority: options.fetchpriority || 'auto',
    className: options.className,
    width: options.width,
    height: options.height,
  };
}

/**
 * Check if image should be preloaded (above the fold)
 */
export function shouldPreloadImage(elementRef: HTMLElement | null): boolean {
  if (!elementRef) return false;

  const rect = elementRef.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  // Preload if within viewport or just below
  return rect.top < viewportHeight + 200;
}
