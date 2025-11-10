import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      searchInputRef.current?.focus();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedCountry = countryCodes.find((c) => c.code === value) || countryCodes[0];

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
    setSearchQuery('');
  };

  const filteredCountries = countryCodes.filter((country) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const codeMatch = country.code.toLowerCase().replace('+', '').includes(query.replace('+', ''));
    const nameMatch = country.name.toLowerCase().includes(query);
    const countryMatch = country.country.toLowerCase().includes(query);

    return codeMatch || nameMatch || countryMatch;
  });

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
        <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-2 border-b border-gray-200 dark:border-gray-600">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-[rgb(30,35,45)] dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
          </div>
          <div className="max-h-[240px] overflow-y-auto scrollbar-thin">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
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
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-center text-gray-500 dark:text-gray-400">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
