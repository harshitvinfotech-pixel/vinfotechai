interface ProductGallerySectionProps {
  galleryImages: string[];
}

export default function ProductGallerySection({ galleryImages }: ProductGallerySectionProps) {
  if (!galleryImages || galleryImages.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Product Gallery
          </h2>
        </div>

        <div className={`grid gap-6 ${
          galleryImages.length === 1 ? 'grid-cols-1' :
          galleryImages.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
          galleryImages.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-[300px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
