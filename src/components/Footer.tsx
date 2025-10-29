import { Mail, Phone, Linkedin, Instagram, Facebook, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className="bg-black dark:bg-black text-white py-12 sm:py-16 md:py-20 px-6 sm:px-8 lg:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-14 md:mb-16">
          <div className="sm:col-span-2 lg:col-span-2">
            <img
              src={theme === 'light' ? '/asset 5.png' : '/Vinfo-white 2.png'}
              alt="Vinfotech Logo"
              className="h-10 sm:h-12 w-auto mb-4 sm:mb-6 transition-opacity duration-300"
            />
            <p className="text-lg sm:text-lg text-gray-400 leading-relaxed mb-4 sm:mb-6 max-w-md">
              Transforming businesses through innovative AI solutions. We deliver production-ready AI systems that drive measurable results.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.facebook.com/vinfotech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#00B46A] hover:text-black transition-all duration-500 transform hover:scale-125 hover:-translate-y-1 active:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={16} className="transition-transform duration-300" />
              </a>
              <a
                href="https://in.linkedin.com/company/vinfotech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#00B46A] hover:text-black transition-all duration-500 transform hover:scale-125 hover:-translate-y-1 active:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} className="transition-transform duration-300" />
              </a>
              <a
                href="https://x.com/vinfotech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#00B46A] hover:text-black transition-all duration-500 transform hover:scale-125 hover:-translate-y-1 active:scale-110"
                aria-label="X (Twitter)"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="transition-transform duration-300"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/vinfotech/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#00B46A] hover:text-black transition-all duration-500 transform hover:scale-125 hover:-translate-y-1 active:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={16} className="transition-transform duration-300" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#services" className="inline-block text-lg sm:text-lg text-gray-400 hover:text-[#00FFB2] transition-all duration-300 hover:translate-x-1">
                  Services
                </a>
              </li>
              <li>
                <a href="#why-us" className="inline-block text-lg sm:text-lg text-gray-400 hover:text-[#00FFB2] transition-all duration-300 hover:translate-x-1">
                  Why Us
                </a>
              </li>
              <li>
                <a href="#case-studies" className="inline-block text-lg sm:text-lg text-gray-400 hover:text-[#00FFB2] transition-all duration-300 hover:translate-x-1">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="inline-block text-lg sm:text-lg text-gray-400 hover:text-[#00FFB2] transition-all duration-300 hover:translate-x-1">
                  Tech Stack
                </a>
              </li>
              <li>
                <Link to="/blogs" className="inline-block text-lg sm:text-lg text-gray-400 hover:text-[#00FFB2] transition-all duration-300 hover:translate-x-1">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <div className="flex items-start gap-2 sm:gap-3 text-gray-400">
                  <MapPin size={16} className="mt-1 flex-shrink-0 text-[#00B46A]" />
                  <div>
                    <p className="text-lg sm:text-lg leading-relaxed">
                      31/2, New Palasia, Indore
                      <br />
                      (M.P.) India - 452001
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="tel:+14804094391"
                  className="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-[#00B46A] transition-all duration-300 group"
                >
                  <Phone size={16} className="flex-shrink-0 text-[#00B46A] transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-lg sm:text-lg transition-transform duration-300 group-hover:translate-x-1">+1-480-409-4391</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@vinfotech.com"
                  className="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-[#00B46A] transition-all duration-300 group"
                >
                  <Mail size={16} className="flex-shrink-0 text-[#00B46A] transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-lg sm:text-lg transition-transform duration-300 group-hover:translate-x-1">info@vinfotech.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-gray-500 text-base sm:text-sm text-center">
            © {currentYear} Viscus Infotech Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
