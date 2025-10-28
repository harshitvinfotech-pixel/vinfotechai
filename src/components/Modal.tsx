import { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in md:flex md:items-center md:justify-center md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 w-full h-full md:h-auto md:max-h-[90vh] overflow-y-auto md:rounded-2xl shadow-2xl md:max-w-2xl animate-slide-up md:animate-scale-in transition-all duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between md:rounded-t-2xl z-10">
          {title && <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-300 ml-auto hover:scale-110 hover:rotate-90 active:scale-95"
            aria-label="Close modal"
          >
            <X size={24} className="text-gray-600 dark:text-gray-300 transition-transform duration-300" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
