import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay failed:', err);
      });
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-0 overflow-hidden" style={{ minHeight: '80vh' }}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://www.freepik.com/free-video/high-tech-circuit-board-interface_3730753#fromView=search&page=1&position=0&uuid=c0ff3d84-b609-4add-aa66-01c1654bb657%22%3EVideo"
          type="video/mp4"
        />
      </video>
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-black/95 via-gray-900/95 to-black/95'
            : 'bg-gradient-to-b from-white/90 via-white/85 to-white/90'
        }`}
      />
    </div>
  );
}
