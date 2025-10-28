import { useTheme } from '../contexts/ThemeContext';

export default function ThreeBackground() {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <img
        src={theme === 'dark' ? '/vinfo-img-dark 1.jpeg' : '/vinfo-img.jpeg'}
        alt=""
        className="w-full h-full object-cover transition-opacity duration-1000"
        style={{
          opacity: 0.4,
        }}
      />
    </div>
  );
}
