import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: string;
  image_url: string;
  caption?: string;
  order_index: number;
}

interface ProductGallerySectionProps {
  images: GalleryImage[];
}

export default function ProductGallerySection({ images }: ProductGallerySectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const sortedImages = [...images].sort((a, b) => a.order_index - b.order_index);

  const resetAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    autoScrollRef.current = setInterval(() => {
      handleNext();
    }, 4000);
  };

  useEffect(() => {
    if (sortedImages.length > 1) {
      resetAutoScroll();
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [sortedImages.length]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % sortedImages.length);
    setTimeout(() => setIsTransitioning(false), 500);
    resetAutoScroll();
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
    setTimeout(() => setIsTransitioning(false), 500);
    resetAutoScroll();
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
    resetAutoScroll();
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Gallery
          </h2>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-2xl">
            <div className="relative aspect-video sm:aspect-[16/9] lg:aspect-[21/9]">
              {sortedImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === currentIndex
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt={image.caption || `Gallery image ${index + 1}`}
                    className="w-full h-full object-contain bg-gray-100 dark:bg-gray-800"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {sortedImages[currentIndex]?.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
                <p className="text-white text-sm sm:text-base font-medium">
                  {sortedImages[currentIndex].caption}
                </p>
              </div>
            )}
          </div>

          {sortedImages.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B46A] dark:hover:border-[#00B46A] disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous image"
              >
                <ChevronLeft className="text-[#00B46A]" size={24} strokeWidth={2.5} />
              </button>

              <button
                onClick={handleNext}
                disabled={isTransitioning}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B46A] dark:hover:border-[#00B46A] disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next image"
              >
                <ChevronRight className="text-[#00B46A]" size={24} strokeWidth={2.5} />
              </button>

              <div className="flex justify-center gap-2 mt-6">
                {sortedImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    disabled={isTransitioning}
                    className={`transition-all duration-300 rounded-full disabled:cursor-not-allowed ${
                      index === currentIndex
                        ? 'w-8 h-2 bg-[#00B46A]'
                        : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
