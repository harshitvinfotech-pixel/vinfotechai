import { CheckCircle, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';

interface QuoteSuccessConfirmationProps {
  onClose: () => void;
}

export default function QuoteSuccessConfirmation({ onClose }: QuoteSuccessConfirmationProps) {
  const phoneNumber = '+1-480-409-4391';

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, url: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <div className="min-h-[500px] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00B46A] to-[#00D67F] flex items-center justify-center shadow-2xl shadow-[#00B46A]/30 animate-scale-in">
              <div className="w-28 h-28 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                <CheckCircle size={64} className="text-[#00B46A]" strokeWidth={2.5} />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-[#00B46A]/20 animate-ping"></div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
            Thank you!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
            We'll get back to you within 24 hrs.
          </p>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            Call us:{' '}
            <a
              href={`tel:${phoneNumber}`}
              className="font-bold text-gray-900 dark:text-white hover:text-[#00B46A] dark:hover:text-[#00B46A] transition-colors duration-300"
            >
              {phoneNumber}
            </a>
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#00B46A] hover:text-white dark:hover:bg-[#00B46A] dark:hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        <div className="pt-8">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
