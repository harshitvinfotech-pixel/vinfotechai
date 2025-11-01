interface HeroSectionProps {
  heroImage: string;
  title: string;
  overviewText: string;
}

export default function HeroSection({ heroImage, title, overviewText }: HeroSectionProps) {
  return (
    <section className="relative w-full h-[600px] sm:h-[700px] bg-black">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl leading-relaxed">
          {overviewText}
        </p>
      </div>
    </section>
  );
}
