import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface CountryCode {
  code: string;
  country: string;
  flag: string;
  name: string;
}

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  countryCodes: CountryCode[];
}

export default function CountryCodeSelect({ value, onChange, countryCodes }: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedCountry = countryCodes.find((c) => c.code === value) || countryCodes[0];

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-full px-2.5 py-2.5 pr-7 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-200 cursor-pointer bg-white whitespace-nowrap"
      >
        {selectedCountry.flag} {selectedCountry.code}
      </button>
      <ChevronDown
        size={14}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none"
      />

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="max-h-[240px] overflow-y-auto scrollbar-thin">
            {countryCodes.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelect(country.code)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                  country.code === value ? 'bg-gray-50 dark:bg-gray-600' : ''
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span>{country.code}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{country.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
