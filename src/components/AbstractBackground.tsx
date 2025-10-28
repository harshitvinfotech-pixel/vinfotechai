import { useState, useEffect } from 'react';
import ColorBends from './ColorBends';

export default function AbstractBackground() {
  const [isVisible, setIsVisible] = useState(false);

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
      <ColorBends
        colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
        rotation={45}
        speed={0.15}
        transparent={true}
        autoRotate={2}
        scale={1.2}
        frequency={1}
        warpStrength={0.8}
        mouseInfluence={0.5}
        parallax={0.3}
        noise={0.00}
      />
    </div>
  );
}
