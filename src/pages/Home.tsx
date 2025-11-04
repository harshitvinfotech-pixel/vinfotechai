import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import AbstractBackground from '../components/AbstractBackground';

interface HomeProps {
  onQuoteClick: () => void;
}

export default function Home({ onQuoteClick }: HomeProps) {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="page-transition-enter">
      <div
        className="relative min-h-screen overflow-hidden"
        id="hero-section"
      >
        <AbstractBackground />
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
    </div>
  );
}
