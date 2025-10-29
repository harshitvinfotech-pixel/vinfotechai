import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import Header from './components/Header';
import Home from './pages/Home';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Modal from './components/Modal';
import QuoteForm from './components/QuoteForm';
import ChatWidget from './components/ChatWidget';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuoteSuccess = () => {
    setTimeout(() => {
      setIsQuoteModalOpen(false);
    }, 2000);
  };

  const isCaseStudyPage = location.pathname.startsWith('/case-studies/');
  const isBlogPage = location.pathname.startsWith('/blogs');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {!isCaseStudyPage && !isBlogPage && <Header onQuoteClick={() => setIsQuoteModalOpen(true)} />}

      <Routes>
        <Route path="/" element={<Home onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
      </Routes>

      <Modal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        title="Get a Quote"
      >
        <QuoteForm onSuccess={handleQuoteSuccess} />
      </Modal>

      {showScrollTop && !isCaseStudyPage && !isBlogPage && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#00B46A] text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-[#00B46A]/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 flex items-center justify-center z-40 animate-scale-in active:scale-95"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      )}

      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
