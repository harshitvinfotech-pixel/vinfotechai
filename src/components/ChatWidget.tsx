// src/components/ChatWidget.tsx
import { useState, useEffect, useRef } from 'react';
import { Send, X, Maximize2, Minimize2, Sparkles, Mail } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  getSuggestedQuestions,
  saveChatConversation,
  getSessionId,
  type SuggestedQuestion,
  type ChatMessage
} from '../lib/chat';
import { streamQuery, type SourceDocument, type ResponseMetadata } from '../lib/streamingChat';
import { useTheme } from '../contexts/ThemeContext';

type WidgetState = 'collapsed' | 'preview' | 'full' | 'contact';

// Hardcoded fallback questions
const FALLBACK_QUESTIONS: SuggestedQuestion[] = [
  {
    id: 'fallback-1',
    question_text: 'What AI solutions does Vinfotech offer?',
    category: 'services',
    display_order: 1,
    is_active: true,
    click_count: 0
  },
  {
    id: 'fallback-2',
    question_text: 'How can AI improve my business operations?',
    category: 'general',
    display_order: 2,
    is_active: true,
    click_count: 0
  },
  {
    id: 'fallback-3',
    question_text: 'What industries do you specialize in?',
    category: 'services',
    display_order: 3,
    is_active: true,
    click_count: 0
  },
  {
    id: 'fallback-4',
    question_text: 'Tell me about your custom AI agent development',
    category: 'services',
    display_order: 4,
    is_active: true,
    click_count: 0
  },
  {
    id: 'fallback-5',
    question_text: 'How do you ensure data security in AI projects?',
    category: 'technical',
    display_order: 5,
    is_active: true,
    click_count: 0
  },
  {
    id: 'fallback-6',
    question_text: 'What is your AI project implementation timeline?',
    category: 'process',
    display_order: 6,
    is_active: true,
    click_count: 0
  }
];

export default function ChatWidget() {
  const { theme } = useTheme();
  const [widgetState, setWidgetState] = useState<WidgetState>('collapsed');
  const [isExpanded, setIsExpanded] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<SuggestedQuestion[]>([]);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([]);
  const [clickedSuggestions, setClickedSuggestions] = useState<Set<string>>(new Set());
  const [showPredefinedQuestions, setShowPredefinedQuestions] = useState(true);
  const [_sources, setSources] = useState<SourceDocument[]>([]);
  const [_metadata, setMetadata] = useState<ResponseMetadata | null>(null);
  const [completeResponse, setCompleteResponse] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastChunkRef = useRef<string>(''); // Track last chunk to prevent duplicates
  const isProcessingRef = useRef<boolean>(false); // Prevent concurrent processing
  const latestUserMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSuggestedQuestions();
    checkSessionState();
    resetSessionTimeout();
  }, []);

  // Show predefined questions ONLY when chat is completely empty (no messages and no dynamic suggestions)
  useEffect(() => {
    if (messages.length === 0 && dynamicSuggestions.length === 0) {
      setShowPredefinedQuestions(true);
    } else {
      setShowPredefinedQuestions(false);
    }
  }, [messages.length, dynamicSuggestions.length]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }
    };
  }, []);

  // Only auto-scroll when widget opens in full mode (not during streaming)
  useEffect(() => {
    if (widgetState === 'full' && messagesEndRef.current && messages.length > 0 && !isStreaming) {
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [widgetState]);

  const checkSessionState = () => {
    // Show predefined questions only when there are no messages
    // This allows them to reappear if the chat is cleared
    if (messages.length === 0) {
      setShowPredefinedQuestions(true);
    } else {
      setShowPredefinedQuestions(false);
    }
  };

  const resetSessionTimeout = () => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
    }
    // Clear session after 2 hours of inactivity
    sessionTimeoutRef.current = setTimeout(() => {
      sessionStorage.removeItem('chat_session_id');
      setMessages([]);
      setDynamicSuggestions([]);
      setClickedSuggestions(new Set());
      setShowPredefinedQuestions(true);
    }, 2 * 60 * 60 * 1000); // 2 hours
  };


  const loadSuggestedQuestions = async () => {
    const questions = await getSuggestedQuestions();
    
    // If no questions from database, use fallback hardcoded questions
    if (questions.length === 0) {
      console.log('No questions from database, using fallback questions');
      setSuggestedQuestions(FALLBACK_QUESTIONS);
    } else {
      setSuggestedQuestions(questions.slice(0, 6));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    await askQuestion(question);
  };

  const askQuestion = async (questionText: string) => {
    // Prevent duplicate calls
    if (isLoading || isStreaming || isProcessingRef.current) {
      console.log('⚠️ Prevented duplicate call');
      return;
    }

    isProcessingRef.current = true;
    lastChunkRef.current = ''; // Reset chunk tracking

    // Switch to full mode first if needed
    if (widgetState === 'preview') {
      setWidgetState('full');
      // Wait for widget to expand
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setQuestion('');
    setMessages(prev => [...prev, { type: 'user', text: questionText }]);
    setIsLoading(true);
    setIsStreaming(false);
    setCompleteResponse('');
    setDynamicSuggestions([]);
    setSources([]);
    setMetadata(null);

    // Hide predefined questions once user starts chatting
    setShowPredefinedQuestions(false);
    
    // Reset session timeout on activity
    resetSessionTimeout();

    // Force scroll to bottom after adding user message
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      });
    });

    // Cancel any existing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    // Don't add empty assistant message here - we'll add it when first chunk arrives

    try {
      let firstChunk = true;
      await streamQuery(
        getSessionId(),
        questionText,
        {
          onResponseChunk: (content: string) => {
            // Skip if this is a duplicate of the last chunk
            if (content === lastChunkRef.current) {
              console.log('🚫 Skipped duplicate chunk:', content);
              return;
            }
            lastChunkRef.current = content;
            
            console.log('✅ Processing chunk:', content);
            setIsLoading(false);
            setIsStreaming(true);
            
            setMessages(prev => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              
              // If this is the first chunk, add a new assistant message
              if (firstChunk || !lastMessage || lastMessage.type !== 'assistant') {
                firstChunk = false;
                return [...newMessages, { type: 'assistant', text: content }];
              }
              
              // Otherwise, append to existing assistant message
              if (lastMessage && lastMessage.type === 'assistant') {
                lastMessage.text += content;
              }
              return newMessages;
            });
          },
          onCompleteResponse: (content: string) => {
            // Store complete response for saving to DB, but DON'T append to messages
            // The response_chunk events already built the message
            setCompleteResponse(content);
          },
          onSuggestedQuestions: (questions: string[]) => {
            setDynamicSuggestions(questions);
          },
          onSources: (sourceDocs: SourceDocument[]) => {
            setSources(sourceDocs);
          },
          onMetadata: (meta: ResponseMetadata) => {
            setMetadata(meta);
          },
          onDone: async () => {
            setIsLoading(false);
            setIsStreaming(false);
            isProcessingRef.current = false; // Reset processing flag

            // Use the complete response if available, otherwise use the streamed text
            const lastMessageText = messages[messages.length - 1]?.text || '';
            const finalResponse = completeResponse || lastMessageText;
            
            if (finalResponse) {
              await saveChatConversation(
                getSessionId(),
                questionText,
                finalResponse,
                'streaming_api'
              );
            }
          },
          onError: (error: string) => {
            console.error('Streaming error:', error);
            isProcessingRef.current = false; // Reset processing flag
            setMessages(prev => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              if (lastMessage && lastMessage.type === 'assistant' && !lastMessage.text) {
                lastMessage.text = "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly for assistance.";
              }
              return newMessages;
            });
            setIsLoading(false);
            setIsStreaming(false);
          }
        }
      );
    } catch (error) {
      console.error('Error getting response:', error);
      isProcessingRef.current = false; // Reset processing flag
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.type === 'assistant' && !lastMessage.text) {
          lastMessage.text = "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly for assistance.";
        }
        return newMessages;
      });
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleSuggestedQuestionClick = async (sq: SuggestedQuestion | string) => {
    const questionText = typeof sq === 'string' ? sq : sq.question_text;
    
    // Mark this suggestion as clicked
    if (typeof sq === 'string') {
      setClickedSuggestions(prev => new Set([...prev, sq]));
    }
    
    await askQuestion(questionText);
  };

  const handleDynamicSuggestionClick = async (suggestion: string) => {
    setClickedSuggestions(prev => new Set([...prev, suggestion]));
    await askQuestion(suggestion);
  };

  const handleCollapsedClick = () => {
    // Always open in full mode directly
    setWidgetState('full');
  };

  const closeWidget = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setWidgetState('collapsed');
    setIsExpanded(false);
  };

  const openContactForm = () => {
    setWidgetState('contact');
  };

  const closeContactForm = () => {
    setWidgetState('full');
  };

  if (widgetState === 'collapsed') {
    return (
      <button
        onClick={handleCollapsedClick}
        className={`fixed bottom-6 right-6 text-white shadow-2xl transition-all duration-300 hover:scale-105 z-50 group rounded-full md:rounded-3xl ${theme === 'dark' ? 'shadow-emerald-500/20' : ''}`}
        style={{ backgroundColor: '#00B46A' }}
      >
        <div className="flex items-center gap-2 p-3 md:gap-3 md:px-5 md:py-4">
          <div className="flex items-center gap-3 hidden md:flex">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold text-lg">Ask Us Anything??</span>
          </div>
          <div className="relative md:hidden">
            <img
              src="/ai-bot.png"
              alt="AI Assistant"
              className="w-12 h-12 object-contain drop-shadow-xl animate-float-3d"
            />
            <div className="absolute -top-1 -right-1 bg-white text-emerald-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg">
              ?
            </div>
          </div>
          <img
            src="/ai-bot.png"
            alt="AI Assistant"
            className="w-16 h-16 object-contain drop-shadow-xl animate-float-3d hidden md:block"
          />
        </div>
      </button>
    );
  }

  if (widgetState === 'contact') {
    return (
      <div className="fixed bottom-6 right-6 w-[90vw] max-w-[420px] z-50">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="px-6 py-5 rounded-t-3xl" style={{ backgroundColor: '#00B46A' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-white font-bold text-lg">Contact Us</h3>
                  <p className="text-white/90 text-xs">We'll get back to you soon</p>
                </div>
              </div>
              <button
                onClick={closeContactForm}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:rotate-90"
                aria-label="Close contact form"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              alert('Form submission will be implemented with your backend');
              closeContactForm();
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (widgetState === 'preview') {
    return (
      <div className="fixed bottom-6 right-6 w-[90vw] max-w-[420px] z-50">
        <div className={`rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="px-6 py-5 rounded-t-3xl" style={{ backgroundColor: '#00B46A' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/ai-bot.png"
                  alt="Vinfotech AI"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h3 className="text-white font-bold text-lg">Ask Us Anything??</h3>
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
            {showPredefinedQuestions && suggestedQuestions.length > 0 && (
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
            )}

            {/* Show dynamic suggestions in preview mode when user has chat history */}
            {!showPredefinedQuestions && dynamicSuggestions.length > 0 && (
              <div className="grid grid-cols-1 gap-3 mb-4">
                <p className="text-xs font-medium text-gray-500 px-2 mb-2">Continue the conversation:</p>
                {dynamicSuggestions
                  .filter(suggestion => !clickedSuggestions.has(suggestion))
                  .slice(0, 3)
                  .map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleDynamicSuggestionClick(suggestion)}
                      className="text-left px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] group"
                    >
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0 group-hover:animate-pulse" />
                        <span className="text-[15px] text-gray-700 group-hover:text-emerald-800 font-medium">
                          {suggestion}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Or ask your own question..."
                className={`w-full px-4 py-3 pr-12 rounded-xl border outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-none ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'}`}
              />
              <button
                type="submit"
                disabled={!question.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <button
              onClick={openContactForm}
              className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Mail className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Contact Us</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-[450px] md:h-[700px] z-50 shadow-2xl flex flex-col overflow-hidden rounded-none md:rounded-3xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      style={{
        transformOrigin: 'bottom center',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        animation: 'slideUpFromBottom 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {/* Fixed Header */}
      <div
        className="flex items-center justify-between px-5 py-4 shadow-sm"
        style={{
          backgroundColor: '#00B46A',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/ai-bot.png"
            alt="Vinfotech AI"
            className="w-9 h-9 object-contain"
          />
          <div>
            <span className="font-bold text-white text-base">Vinfotech AI</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden md:flex p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
            aria-label={isExpanded ? 'Minimize' : 'Maximize'}
          >
            {isExpanded ? <Minimize2 className="w-5 h-5 text-white" /> : <Maximize2 className="w-5 h-5 text-white" />}
          </button>
          <button
            onClick={closeWidget}
            className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
            aria-label="Close chat"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <div ref={chatContainerRef} className={`flex-1 overflow-y-auto px-6 py-4 space-y-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <img
              src="/ai-bot.png"
              alt="Vinfotech AI"
              className="w-24 h-24 object-contain mb-6 animate-float-3d"
            />
            <h3 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>How can I help you today?</h3>
            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>Ask me anything about our services</p>

            {showPredefinedQuestions && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
                {suggestedQuestions.slice(0, 3).map((sq, index) => (
                  <button
                    key={sq.id}
                    onClick={() => handleSuggestedQuestionClick(sq)}
                    className={`text-left px-4 py-3 rounded-lg border transition-all duration-300 text-sm hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 hover:border-emerald-500 text-gray-200' : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-700'}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {sq.question_text}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                ref={index === messages.length - 1 && message.type === 'user' ? latestUserMessageRef : null}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start items-end gap-2'} animate-slide-up-fade`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {message.type === 'assistant' && (
                  <div className="flex-shrink-0 mb-1">
                    <img
                      src="/ai-bot.png"
                      alt="AI Assistant"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 transition-all duration-300 hover:scale-[1.02] ${
                  message.type === 'user'
                    ? 'bg-emerald-500 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-700 text-gray-100 shadow-sm border border-gray-600'
                      : 'bg-white text-gray-900 shadow-sm border border-gray-100'
                }`}>
                  {message.type === 'user' ? (
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  ) : (
                    <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => (
                            <a 
                              {...props} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium cursor-pointer"
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p {...props} className="mb-2 last:mb-0" />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul {...props} className="list-disc pl-4 mb-2 space-y-1" />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol {...props} className="list-decimal pl-4 mb-2 space-y-1" />
                          ),
                          li: ({ node, ...props }) => (
                            <li {...props} className="text-gray-700" />
                          ),
                          h1: ({ node, ...props }) => (
                            <h1 {...props} className="text-lg font-bold text-gray-900 mb-2 mt-3 first:mt-0" />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2 {...props} className="text-base font-bold text-gray-900 mb-2 mt-3 first:mt-0" />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3 {...props} className="text-sm font-bold text-gray-900 mb-1 mt-2 first:mt-0" />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong {...props} className="font-bold text-gray-900" />
                          ),
                          code: ({ node, inline, ...props }: any) => 
                            inline ? (
                              <code {...props} className="bg-gray-100 text-emerald-700 px-1 py-0.5 rounded text-xs font-mono" />
                            ) : (
                              <code {...props} className="block bg-gray-100 text-gray-800 p-2 rounded text-xs font-mono overflow-x-auto" />
                            )
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {(isLoading && !isStreaming) && (
              <div className="flex justify-start items-end gap-3 animate-slide-up-fade">
                <div className="flex-shrink-0 mb-1">
                  <img
                    src="/ai-bot.png"
                    alt="AI Assistant"
                    className="w-8 h-8 object-contain animate-pulse"
                  />
                </div>
                <div className={`rounded-2xl px-5 py-3 shadow-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Thinking</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {dynamicSuggestions.length > 0 && !isLoading && (
              <div className="flex justify-start animate-slide-up-fade pl-10">
                <div className="flex flex-col gap-3 max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <p className={`text-base font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>You can also ask:</p>
                  </div>
                  {dynamicSuggestions
                    .filter(suggestion => !clickedSuggestions.has(suggestion))
                    .map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleDynamicSuggestionClick(suggestion)}
                        className={`text-left px-4 py-2.5 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] group shadow-sm ${theme === 'dark' ? 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 border-emerald-500/30 hover:border-emerald-400' : 'bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-emerald-200 hover:border-emerald-300'}`}
                      >
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <span className={`text-sm font-medium leading-relaxed ${theme === 'dark' ? 'text-gray-100 group-hover:text-emerald-300' : 'text-gray-800 group-hover:text-emerald-700'}`}>
                            {suggestion}
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="px-6 py-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="relative mb-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
            className={`w-full px-4 py-3 pr-12 rounded-xl border outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
          />
          <button
            type="submit"
            disabled={!question.trim() || isLoading || isStreaming}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#00B46A' }}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        
        <button
          onClick={openContactForm}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mb-2 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' : 'bg-gray-100 hover:bg-gray-200 border-gray-200'}`}
        >
          <Mail className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Contact Us</span>
        </button>
        
        <p className={`text-xs text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
          Powered by Vinfotech AI
        </p>
      </div>
    </div>
  );
}
