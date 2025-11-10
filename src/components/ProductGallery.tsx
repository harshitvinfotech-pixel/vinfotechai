import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: string;
  image_url: string;
  caption?: string;
  alt_text?: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  title?: string;
}

export default function ProductGallery({ images, title = 'Product Gallery' }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPosition = currentIndex * (container.offsetWidth / Math.min(3, images.length));
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, images.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Visual showcase of the implemented solution
        </p>
      </div>

      <div className="relative bg-white dark:bg-dark-bg rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((image, idx) => (
            <div
              key={image.id}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-center"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-[rgb(30,35,45)] group">
                <img
                  src={image.image_url}
                  alt={image.alt_text || `Gallery image ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-[rgb(30,35,45)] rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 dark:border-gray-700 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft style={{ color: '#00B46A' }} size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-[rgb(30,35,45)] rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 dark:border-gray-700 z-10"
              aria-label="Next image"
            >
              <ChevronRight style={{ color: '#00B46A' }} size={24} />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8'
                      : 'hover:opacity-75'
                  }`}
                  style={{ backgroundColor: idx === currentIndex ? '#00B46A' : '#D1D5DB' }}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
