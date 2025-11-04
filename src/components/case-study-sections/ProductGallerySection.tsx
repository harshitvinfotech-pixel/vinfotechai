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
    }, 5000);
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
    setTimeout(() => setIsTransitioning(false), 600);
    resetAutoScroll();
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
    setTimeout(() => setIsTransitioning(false), 600);
    resetAutoScroll();
  };

  const handleImageClick = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
    resetAutoScroll();
  };

  const getPrevIndex = (current: number) => {
    return (current - 1 + sortedImages.length) % sortedImages.length;
  };

  const getNextIndex = (current: number) => {
    return (current + 1) % sortedImages.length;
  };

  if (!images || images.length === 0) {
    return null;
  }

  if (sortedImages.length === 1) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-xl lg:rounded-2xl shadow-xl">
            <img
              src={sortedImages[0].image_url}
              alt={sortedImages[0].caption || 'Gallery image'}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
    );
  }

  const prevIndex = getPrevIndex(currentIndex);
  const nextIndex = getNextIndex(currentIndex);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 lg:mb-16 text-left lg:text-center animate-[fadeInUp_0.6s_ease-out]">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Gallery
          </h2>
        </div>
        <div className="relative flex items-center justify-center gap-3 sm:gap-6 lg:gap-10">
          <button
            onClick={handlePrev}
            disabled={isTransitioning}
            className="hidden lg:flex z-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white dark:bg-gray-800 rounded-full items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B46A] dark:hover:border-[#00B46A] disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="Previous image"
          >
            <ChevronLeft className="text-[#00B46A]" size={24} strokeWidth={2.5} />
          </button>

          <div className="relative w-full">
            <div className="flex items-center justify-center gap-3 sm:gap-6 lg:gap-10">
              <div
                onClick={() => handleImageClick(prevIndex)}
                className="hidden lg:block relative w-[200px] sm:w-[280px] lg:w-[400px] cursor-pointer opacity-40 hover:opacity-60 transition-all duration-300 transform scale-90 hover:scale-95 flex-shrink-0"
              >
                <div className="relative overflow-hidden rounded-xl lg:rounded-2xl shadow-xl aspect-video h-[115px] sm:h-[160px] lg:h-[225px]">
                  <img
                    src={sortedImages[prevIndex].image_url}
                    alt={sortedImages[prevIndex].caption || `Gallery image ${prevIndex + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="relative flex-1 max-w-6xl animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
                <div className="relative overflow-hidden rounded-xl lg:rounded-3xl shadow-xl lg:shadow-2xl aspect-video h-[250px] sm:h-[400px] lg:h-[650px]">
                  {sortedImages.map((image, index) => (
                    <div
                      key={image.id}
                      className={`absolute inset-0 transition-all duration-600 ease-in-out ${
                        index === currentIndex
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                    >
                      <img
                        src={image.image_url}
                        alt={image.caption || `Gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div
                onClick={() => handleImageClick(nextIndex)}
                className="hidden lg:block relative w-[200px] sm:w-[280px] lg:w-[400px] cursor-pointer opacity-40 hover:opacity-60 transition-all duration-300 transform scale-90 hover:scale-95 flex-shrink-0"
              >
                <div className="relative overflow-hidden rounded-xl lg:rounded-2xl shadow-xl aspect-video h-[115px] sm:h-[160px] lg:h-[225px]">
                  <img
                    src={sortedImages[nextIndex].image_url}
                    alt={sortedImages[nextIndex].caption || `Gallery image ${nextIndex + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-8 lg:mt-10">
              {sortedImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(index)}
                  disabled={isTransitioning}
                  className={`transition-all duration-300 rounded-full disabled:cursor-not-allowed ${
                    index === currentIndex
                      ? 'w-8 sm:w-10 lg:w-12 h-2 sm:h-2.5 bg-[#00B46A]'
                      : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="hidden lg:flex z-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white dark:bg-gray-800 rounded-full items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 dark:border-gray-700 hover:border-[#00B46A] dark:hover:border-[#00B46A] disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="Next image"
          >
            <ChevronRight className="text-[#00B46A]" size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
