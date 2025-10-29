import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import About from '../components/About';
import Services from '../components/Services';
import TechStack from '../components/TechStack';
import CaseStudies from '../components/CaseStudies';
import WhyUs from '../components/WhyUs';
import CTA from '../components/CTA';
import BlogPreview from '../components/BlogPreview';
import Footer from '../components/Footer';

interface HomeProps {
  onQuoteClick: () => void;
}

export default function Home({ onQuoteClick }: HomeProps) {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden" id="hero-section">
        <div className="absolute inset-0 w-full h-full animate-fade-in">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-all duration-700"
            style={{ filter: 'brightness(0.3)' }}
          >
            <source
              src="https://uiipeuddsgzwhdamlnzx.supabase.co/storage/v1/object/public/public-bucket//Pythagoras_Theorem_Video_Created.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="relative z-10 pt-20">
          <Hero onQuoteClick={onQuoteClick} />
        </div>
      </div>

      <main>
        <IntroSection />
        <About />
        <Services />
        <TechStack />
        <CaseStudies />
        <WhyUs />
        <CTA onQuoteClick={onQuoteClick} />
        <BlogPreview />
      </main>

      <Footer />
    </>
  );
}
