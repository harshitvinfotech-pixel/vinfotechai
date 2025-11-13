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
      <div className="bg-white dark:bg-[rgb(39,44,54)] shadow-[0_-4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)] border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto pl-[10px] pr-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6">
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
              We use cookies to ensure that we give you the best experience on our website. If you continue to use this site we will assume that you are happy with it.
            </p>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 self-end sm:self-auto">
              <button
                onClick={handleAccept}
                className="bg-[#00B46A] hover:bg-[#009956] text-white font-medium px-5 sm:px-8 py-1.5 sm:py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#00B46A]/30 text-xs sm:text-sm whitespace-nowrap"
              >
                Ok
              </button>

              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 p-1"
                aria-label="Close cookie banner"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
