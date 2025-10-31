interface HeroSectionProps {
  heroImage: string;
  title: string;
  overviewText: string;
}

export default function HeroSection({ heroImage, title, overviewText }: HeroSectionProps) {
  return (
    <div className="relative w-full h-[70vh] min-h-[600px] bg-black overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-5xl leading-tight">
          {title}
        </h1>
        <div
          className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-4xl leading-relaxed"
          dangerouslySetInnerHTML={{ __html: overviewText }}
        />
      </div>
    </div>
  );
}
