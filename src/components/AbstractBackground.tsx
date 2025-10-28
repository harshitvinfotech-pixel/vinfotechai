import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function AbstractBackground() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div
        className="w-full h-full transition-opacity duration-1000"
        style={{
          opacity: 1,
          background: theme === 'dark'
            ? 'radial-gradient(circle at 20% 50%, rgba(0, 180, 106, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), linear-gradient(to bottom, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
            : 'radial-gradient(circle at 20% 50%, rgba(0, 180, 106, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)'
        }}
      >
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {theme === 'dark' ? (
            <>
              <circle cx="15%" cy="30%" r="150" fill="rgba(0, 180, 106, 0.03)" opacity="0.6" />
              <circle cx="85%" cy="60%" r="200" fill="rgba(59, 130, 246, 0.02)" opacity="0.5" />
              <circle cx="50%" cy="80%" r="180" fill="rgba(16, 185, 129, 0.02)" opacity="0.4" />
            </>
          ) : (
            <>
              <circle cx="15%" cy="30%" r="150" fill="rgba(0, 180, 106, 0.04)" opacity="0.5" />
              <circle cx="85%" cy="60%" r="200" fill="rgba(59, 130, 246, 0.03)" opacity="0.4" />
              <circle cx="50%" cy="80%" r="180" fill="rgba(16, 185, 129, 0.03)" opacity="0.3" />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
