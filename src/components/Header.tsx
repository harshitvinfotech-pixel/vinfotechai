import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onQuoteClick: () => void;
}

type NavKey = 'home' | 'services' | 'case-studies' | 'blogs';

export default function Header({ onQuoteClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavKey>('home');

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

  // Sync active tab with route (mainly for /blogs vs /)
  useEffect(() => {
    if (location.pathname === '/blogs') {
      setActiveNav('blogs');
    } else if (location.pathname === '/') {
      setActiveNav((prev) => (prev === 'blogs' ? 'home' : prev));
    }
  }, [location.pathname]);

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

  const getDesktopNavClass = (key: NavKey) => {
    const base = 'relative transition-all duration-300 font-medium group';
    const active = ' text-emerald-600 dark:text-white';
    const inactive =
      ' text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white';
    return base + (activeNav === key ? active : inactive);
  };

  const getDesktopUnderlineClass = (key: NavKey) =>
    'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-light transition-all duration-300 ' +
    (activeNav === key ? 'w-full' : 'w-0 group-hover:w-full');

  const getMobileNavClass = (key: NavKey) => {
    const base =
      'block w-full text-left px-2 py-2 rounded-lg transition-all duration-300 font-medium text-xl sm:text-lg';
    const active = ' text-emerald-600 dark:text-white bg-emerald-50 dark:bg-white/10';
    const inactive =
      ' text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-white/10';
    return base + (activeNav === key ? active : inactive);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-0">
        <div className="flex items-center justify-between h-20 px-1">
          <button
            onClick={() => {
              window.location.href = 'https://www.vinfotech.com';
            }}
            className="flex items-center animate-fade-in-down cursor-pointer pl-[10px] md:pl-0"
            aria-label="Go to Vinfotech homepage"
          >
            <img
              src={theme === 'dark' ? '/Vinfo-white2.png' : '/asset5.png'}
              alt="Vinfotech AI - Custom AI Software Development"
              className="h-10 w-auto transition-transform duration-300 hover:scale-105"
            />
          </button>

          <nav
            className="hidden md:flex items-center space-x-8 animate-fade-in-down"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            {/* AI Home */}
            <button
              onClick={() => {
                setActiveNav('home');
                if (isHomePage) {
                  scrollToSection('about');
                } else {
                  navigate('/');
                }
              }}
              className={getDesktopNavClass('home')}
            >
              AI Home
              <span className={getDesktopUnderlineClass('home')} />
            </button>

            {/* AI Services */}
            <button
              onClick={() => {
                setActiveNav('services');
                scrollToSection('services');
              }}
              className={getDesktopNavClass('services')}
            >
              AI Services
              <span className={getDesktopUnderlineClass('services')} />
            </button>

            {/* AI Case Studies */}
            <button
              onClick={() => {
                setActiveNav('case-studies');
                scrollToSection('case-studies');
              }}
              className={getDesktopNavClass('case-studies')}
            >
              AI Case Studies
              <span className={getDesktopUnderlineClass('case-studies')} />
            </button>

            {/* AI Blogs */}
            <button
              onClick={() => {
                setActiveNav('blogs');
                navigate('/blogs');
              }}
              className={getDesktopNavClass('blogs')}
            >
              AI Blogs
              <span className={getDesktopUnderlineClass('blogs')} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-white/10 hover:text-emerald-600 dark:hover:text-white"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
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
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
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
            {/* AI Home */}
            <button
              onClick={() => {
                setActiveNav('home');
                if (isHomePage) {
                  scrollToSection('about');
                } else {
                  navigate('/');
                }
                setIsMobileMenuOpen(false);
              }}
              className={getMobileNavClass('home')}
            >
              AI Home
            </button>

            {/* AI Services */}
            <button
              onClick={() => {
                setActiveNav('services');
                scrollToSection('services');
                setIsMobileMenuOpen(false);
              }}
              className={getMobileNavClass('services')}
            >
              AI Services
            </button>

            {/* AI Case Studies */}
            <button
              onClick={() => {
                setActiveNav('case-studies');
                scrollToSection('case-studies');
                setIsMobileMenuOpen(false);
              }}
              className={getMobileNavClass('case-studies')}
            >
              AI Case Studies
            </button>

            {/* AI Blogs */}
            <button
              onClick={() => {
                setActiveNav('blogs');
                navigate('/blogs');
                setIsMobileMenuOpen(false);
              }}
              className={getMobileNavClass('blogs')}
            >
              AI Blogs
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
