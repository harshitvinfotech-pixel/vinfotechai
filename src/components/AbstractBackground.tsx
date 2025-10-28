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
      <img
        src={theme === 'dark' ? '/vinfo-img-dark 1.jpeg' : '/vinfo-img.jpeg'}
        alt=""
        className="w-full h-full object-cover transition-opacity duration-1000"
        style={{
          opacity: 1,
        }}
      />
    </div>
  );
}
