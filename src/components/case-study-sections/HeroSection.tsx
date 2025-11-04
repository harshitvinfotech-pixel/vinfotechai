interface HeroSectionProps {
  heroImage: string;
  title: string;
  overviewText: string;
}

export default function HeroSection({ heroImage, title, overviewText }: HeroSectionProps) {
  return (
    <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover opacity-50"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-5 lg:mb-6 leading-tight animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
          {title}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-4xl leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
          {overviewText}
        </p>
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
