import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleClose = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-gray-800 dark:bg-gray-900 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] rounded-t-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-4 sm:gap-6">
            <p className="text-sm sm:text-base text-gray-100 dark:text-gray-200 leading-relaxed flex-1">
              We use cookies to ensure that we give you the best experience on our website. If you continue to use this site we will assume that you are happy with it.
            </p>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={handleAccept}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 sm:px-8 py-2 sm:py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 text-sm sm:text-base whitespace-nowrap"
              >
                Ok
              </button>

              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-200 transition-colors duration-200 p-1"
                aria-label="Close cookie banner"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
