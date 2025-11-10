import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onQuoteClick: () => void;
}

export default function Header({ onQuoteClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      navigate('/', { state: { scrollTo: id } });
      return;
    }

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
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20 px-1">
          <button
            onClick={() => navigate('/')}
            className="flex items-center animate-fade-in-down cursor-pointer"
            aria-label="Go to Vinfotech homepage"
          >
            <img
              src={theme === 'dark' ? '/Vinfo-white2.png' : '/asset5.png'}
              alt="Vinfotech AI - Custom AI Software Development"
              className="h-10 w-auto transition-transform duration-300 hover:scale-105"
            />
          </button>

          <nav className="hidden md:flex items-center space-x-8 animate-fade-in-down" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <button
              onClick={() => isHomePage ? scrollToSection('about') : navigate('/')}
              className="relative transition-all duration-300 font-medium group text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white"
            >
              {isHomePage ? 'About' : 'Home'}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-light group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => navigate('/blogs')}
              className="relative transition-all duration-300 font-medium group text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white"
            >
              Blogs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-light group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="relative transition-all duration-300 font-medium group text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-light group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('case-studies')}
              className="relative transition-all duration-300 font-medium group text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white"
            >
              Case Studies
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-light group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-white/10 hover:text-emerald-600 dark:hover:text-white"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={onQuoteClick}
              className="bg-[#00B46A] text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00B46A]/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-0.5 active:scale-105"
              aria-label="Get a quote for custom AI development"
            >
              Get a Quote
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-300 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-white/10 hover:text-emerald-600 dark:hover:text-white"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 transition-colors text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white"
              aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden backdrop-blur-md border-t animate-slide-down bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-800">
          <nav className="px-6 py-4 space-y-2">
            <button
              onClick={() => {
                if (isHomePage) {
                  scrollToSection('about');
                } else {
                  navigate('/');
                }
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-2 py-2 rounded-lg transition-all duration-300 font-medium text-xl sm:text-lg text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-white/10"
            >
              {isHomePage ? 'About' : 'Home'}
            </button>
            <button
              onClick={() => {
                navigate('/blogs');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-2 py-2 rounded-lg transition-all duration-300 font-medium text-xl sm:text-lg text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-white/10"
            >
              Blog
            </button>
            <button
              onClick={() => {
                scrollToSection('services');
              }}
              className="block w-full text-left px-2 py-2 rounded-lg transition-all duration-300 font-medium text-xl sm:text-lg text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-white/10"
            >
              Services
            </button>
            <button
              onClick={() => {
                scrollToSection('case-studies');
              }}
              className="block w-full text-left px-2 py-2 rounded-lg transition-all duration-300 font-medium text-xl sm:text-lg text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-white/10"
            >
              Case Studies
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  onQuoteClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full max-w-[280px] mx-auto block bg-[#00B46A] text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                aria-label="Get a quote for custom AI development"
              >
                Get a Quote
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
