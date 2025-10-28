import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onQuoteClick: () => void;
}

export default function Header({ onQuoteClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center animate-fade-in-down">
            <img
              src={isScrolled && theme === 'light' ? '/asset 5.png' : '/Vinfo-white 2.png'}
              alt="Vinfotech Logo"
              className="h-10 w-auto transition-transform duration-300 hover:scale-105"
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8 animate-fade-in-down" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <button
              onClick={() => scrollToSection('about')}
              className={`relative transition-all duration-300 font-medium group ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-light group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className={`relative transition-all duration-300 font-medium group ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-light group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('case-studies')}
              className={`relative transition-all duration-300 font-medium group ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Case Studies
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-light group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('why-us')}
              className={`relative transition-all duration-300 font-medium group ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Why Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-light group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-white/10 hover:text-emerald-600 dark:hover:text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={onQuoteClick}
              className="bg-[#00B46A] text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00B46A]/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-0.5 active:scale-105"
            >
              Get a Quote
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-white/10 hover:text-emerald-600 dark:hover:text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={`md:hidden backdrop-blur-md border-t animate-slide-down ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-800'
            : 'bg-black/80 dark:bg-gray-900/80 border-white/10'
        }`}>
          <nav className="px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection('about')}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 font-medium transform hover:translate-x-1 ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-white/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 font-medium transform hover:translate-x-1 ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-white/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('case-studies')}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 font-medium transform hover:translate-x-1 ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-white/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Case Studies
            </button>
            <button
              onClick={() => scrollToSection('why-us')}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 font-medium transform hover:translate-x-1 ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-white/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Why Us
            </button>
            <button
              onClick={onQuoteClick}
              className="w-full bg-[#00B46A] text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get a Quote
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
