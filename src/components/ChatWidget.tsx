import { useState, useEffect, useRef } from 'react';
import { Send, X, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import {
  getSuggestedQuestions,
  findResponse,
  saveChatConversation,
  getSessionId,
  type SuggestedQuestion,
  type ChatMessage
} from '../lib/chat';

type WidgetState = 'collapsed' | 'preview' | 'full';

export default function ChatWidget() {
  const [widgetState, setWidgetState] = useState<WidgetState>('collapsed');
  const [isExpanded, setIsExpanded] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<SuggestedQuestion[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSuggestedQuestions();
  }, []);


  const loadSuggestedQuestions = async () => {
    const questions = await getSuggestedQuestions();
    setSuggestedQuestions(questions.slice(0, 6));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    await askQuestion(question);
  };

  const askQuestion = async (questionText: string) => {
    setQuestion('');
    setMessages(prev => [...prev, { type: 'user', text: questionText }]);
    setIsLoading(true);

    if (widgetState === 'preview') {
      setWidgetState('full');
    }

    try {
      const response = await findResponse(questionText);
      const responseSource = response.includes('Get a Quote') ? 'fallback' : 'knowledge_base';

      await saveChatConversation(getSessionId(), questionText, response, responseSource);

      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'assistant', text: response }]);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, {
        type: 'assistant',
        text: "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly for assistance."
      }]);
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestionClick = async (sq: SuggestedQuestion) => {
    await askQuestion(sq.question_text);
  };

  const handleCollapsedClick = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setWidgetState('full');
    } else {
      setWidgetState('preview');
    }
  };

  const closeWidget = () => {
    setWidgetState('collapsed');
    setIsExpanded(false);
  };

  if (widgetState === 'collapsed') {
    return (
      <button
        onClick={handleCollapsedClick}
        className="fixed bottom-6 right-6 text-white rounded-3xl shadow-2xl transition-all duration-1700 hover:scale-105 z-50 group"
        style={{ backgroundColor: '#00B46A' }}
      >
        <div className="flex items-center gap-2 px-3 py-2 md:gap-5 md:px-7 md:py-5">
          <div className="flex flex-col items-start hidden md:flex">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold text-lg">Ask Us Anything</span>
            </div>
            <span className="text-sm text-white/90">Get instant answers</span>
          </div>
          <div className="flex items-center gap-1.5 md:hidden">
            <span className="font-bold text-xs">Ask AI ?</span>
          </div>
          <img
            src="/Gemini_Generated_Image_eao7cteao7cteao7-removebg-preview.png"
            alt="AI Assistant"
            className="w-8 h-8 object-contain drop-shadow-xl animate-float-3d md:hidden"
          />
          <img
            src="/Gemini_Generated_Image_eao7cteao7cteao7-removebg-preview.png"
            alt="AI Assistant"
            className="w-20 h-20 object-contain drop-shadow-xl animate-float-3d ml-3 hidden md:block"
          />
        </div>
      </button>
    );
  }

  if (widgetState === 'preview') {
    return (
      <div className="fixed bottom-6 right-6 w-[90vw] max-w-[420px] z-50">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="px-6 py-5 rounded-t-3xl" style={{ backgroundColor: '#00B46A' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/Gemini_Generated_Image_eao7cteao7cteao7-removebg-preview.png"
                  alt="Vinfotech AI"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h3 className="text-white font-bold text-lg">Ask Us Anything</h3>
                  <p className="text-white/90 text-xs">Choose a question or ask your own</p>
                </div>
              </div>
              <button
                onClick={closeWidget}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:rotate-90"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-3 mb-4">
              {suggestedQuestions.map((sq, index) => (
                <button
                  key={sq.id}
                  onClick={() => handleSuggestedQuestionClick(sq)}
                  className="text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 transition-all duration-300 group hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[15px] text-gray-700 group-hover:text-emerald-700 font-medium">
                      {sq.question_text}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Or ask your own question..."
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-none"
              />
              <button
                type="submit"
                disabled={!question.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-0 p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed ${isExpanded ? 'inset-1' : 'inset-0 md:bottom-6 md:right-6 md:w-[450px] md:h-[700px] md:inset-auto'} z-50 bg-white shadow-2xl flex flex-col overflow-hidden ${isExpanded ? 'md:rounded-3xl' : 'rounded-none md:rounded-3xl'}`}
      style={{
        transformOrigin: 'bottom right',
        transition: isExpanded ? 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
      }}
    >
      <div className="flex items-center justify-between px-6 py-5 rounded-t-none md:rounded-t-3xl" style={{ backgroundColor: '#00B46A' }}>
        <div className="flex items-center gap-3">
          <img
            src="/Gemini_Generated_Image_eao7cteao7cteao7-removebg-preview.png"
            alt="Vinfotech AI"
            className="w-10 h-10 object-contain"
          />
          <div>
            <span className="font-bold text-white text-lg">Vinfotech AI</span>
            <p className="text-xs text-white/90">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden md:flex p-2 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label={isExpanded ? 'Minimize' : 'Maximize'}
          >
            {isExpanded ? <Minimize2 className="w-5 h-5 text-white" /> : <Maximize2 className="w-5 h-5 text-white" />}
          </button>
          <button
            onClick={closeWidget}
            className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-95"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <img
              src="/Gemini_Generated_Image_eao7cteao7cteao7-removebg-preview.png"
              alt="Vinfotech AI"
              className="w-32 h-32 object-contain mb-4 animate-float-3d"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-2">How can I help you today?</h3>
            <p className="text-sm text-gray-500 mb-6">Ask me anything about our services and solutions</p>

            <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
              {suggestedQuestions.slice(0, 3).map((sq, index) => (
                <button
                  key={sq.id}
                  onClick={() => handleSuggestedQuestionClick(sq)}
                  className="text-left px-4 py-2 rounded-lg bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 transition-all duration-300 text-sm text-gray-700 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {sq.question_text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up-fade`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 transition-all duration-300 hover:scale-[1.02] ${
                  message.type === 'user'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-100'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="px-6 py-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
            className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all bg-gray-50"
          />
          <button
            type="submit"
            disabled={!question.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Powered by Vinfotech AI
        </p>
      </div>
    </div>
  );
}
