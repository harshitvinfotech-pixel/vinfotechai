import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import Header from './components/Header';
import Home from './pages/Home';
import Modal from './components/Modal';
import QuoteForm from './components/QuoteForm';
import QuoteSuccessConfirmation from './components/QuoteSuccessConfirmation';
import ChatWidget from './components/ChatWidget';
import CookieConsent from './components/CookieConsent';

const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

function AppContent() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [showSuccessConfirmation, setShowSuccessConfirmation] = useState(false);
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

  const handleShowSuccessConfirmation = () => {
    setShowSuccessConfirmation(true);
  };

  const handleCloseSuccessConfirmation = () => {
    setShowSuccessConfirmation(false);
    setIsQuoteModalOpen(false);
  };

  const isBlogPage = location.pathname.startsWith('/blogs');
  const isCaseStudyPage = location.pathname.startsWith('/case-studies');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      {!isBlogPage && !isCaseStudyPage && <Header onQuoteClick={() => setIsQuoteModalOpen(true)} />}

      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B46A]"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home onQuoteClick={() => setIsQuoteModalOpen(true)} />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail key={location.pathname} />} />
        </Routes>
      </Suspense>

      <Modal
        isOpen={isQuoteModalOpen}
        onClose={() => {
          setIsQuoteModalOpen(false);
          setShowSuccessConfirmation(false);
        }}
        title={showSuccessConfirmation ? '' : 'Get a Quote'}
      >
        {showSuccessConfirmation ? (
          <QuoteSuccessConfirmation onClose={handleCloseSuccessConfirmation} />
        ) : (
          <QuoteForm
            onShowSuccessConfirmation={handleShowSuccessConfirmation}
          />
        )}
      </Modal>

      {showScrollTop && !isBlogPage && !isCaseStudyPage && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#00B46A] text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-[#00B46A]/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 flex items-center justify-center z-40 animate-scale-in active:scale-95"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      )}

      <ChatWidget />
      <CookieConsent />
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
