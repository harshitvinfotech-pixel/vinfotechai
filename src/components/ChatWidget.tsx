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
  const [sources, setSources] = useState<SourceDocument[]>([]);
  const [metadata, setMetadata] = useState<ResponseMetadata | null>(null);
  const [completeResponse, setCompleteResponse] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastChunkRef = useRef<string>(''); // Track last chunk to prevent duplicates
  const isProcessingRef = useRef<boolean>(false); // Prevent concurrent processing

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isStreaming]);

  // Auto-scroll to bottom when widget opens in full mode
  useEffect(() => {
    if (widgetState === 'full' && messagesEndRef.current && messages.length > 0) {
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

    if (widgetState === 'preview') {
      setWidgetState('full');
    }

    // Cancel any existing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setMessages(prev => [...prev, { type: 'assistant', text: '' }]);

    try {
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
    const isMobile = window.innerWidth < 768;
    // If there are existing messages, open in full mode to show chat history
    if (messages.length > 0) {
      setWidgetState('full');
    } else if (isMobile) {
      setWidgetState('full');
    } else {
      setWidgetState('preview');
    }
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
    setWidgetState(messages.length > 0 ? 'full' : 'preview');
  };

  if (widgetState === 'collapsed') {
    return (
      <button
        onClick={handleCollapsedClick}
        className="fixed bottom-6 right-6 text-white shadow-2xl transition-all duration-300 hover:scale-105 z-50 group rounded-full md:rounded-3xl"
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
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
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
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-none"
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
      className={`fixed ${isExpanded ? 'inset-1' : 'bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto md:w-[450px] md:h-[700px]'} z-50 bg-white shadow-2xl flex flex-col overflow-hidden ${isExpanded ? 'md:rounded-3xl' : 'rounded-t-3xl md:rounded-3xl'}`}
      style={{
        height: isExpanded ? '100%' : 'calc(100% - 60px)',
        maxHeight: isExpanded ? '100%' : 'min(85vh, 700px)',
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
            <span
              className="font-medium text-white text-base"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 500 }}
            >
              Vinfotech AI
            </span>
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

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-white" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#E5E7EB #FFFFFF'
      }}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <img
              src="/ai-bot.png"
              alt="Vinfotech AI"
              className="w-24 h-24 object-contain mb-4 opacity-90"
            />
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A1A' }}>How can I help you today?</h3>
            <p className="text-sm mb-6" style={{ color: '#9CA3AF' }}>Ask me anything about our services</p>

            {showPredefinedQuestions && (
              <div className="flex flex-col gap-2.5 w-full max-w-md">
                {suggestedQuestions.slice(0, 3).map((sq, index) => (
                  <button
                    key={sq.id}
                    onClick={() => handleSuggestedQuestionClick(sq)}
                    className="text-left px-4 py-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 text-sm"
                    style={{
                      color: '#1A1A1A',
                      border: '1px solid #E5E7EB'
                    }}
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
              <div key={index}>
                <div
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'text-white shadow-sm'
                      : 'bg-white shadow-md'
                  }`}
                  style={{
                    backgroundColor: message.type === 'user' ? '#00B46A' : '#FFFFFF',
                    color: message.type === 'user' ? '#FFFFFF' : '#1A1A1A'
                  }}>
                    {message.type === 'user' ? (
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    ) : (
                      <div className="text-sm leading-relaxed prose prose-sm max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: ({ node, ...props }) => (
                              <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#00B46A' }}
                                className="hover:underline font-medium cursor-pointer"
                              />
                            ),
                            p: ({ node, ...props }) => (
                              <p {...props} className="mb-2 last:mb-0" style={{ color: '#1A1A1A' }} />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul {...props} className="list-disc pl-4 mb-2 space-y-1" />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol {...props} className="list-decimal pl-4 mb-2 space-y-1" />
                            ),
                            li: ({ node, ...props }) => (
                              <li {...props} style={{ color: '#1A1A1A' }} />
                            ),
                            h1: ({ node, ...props }) => (
                              <h1 {...props} className="text-base font-bold mb-2 mt-3 first:mt-0" style={{ color: '#1A1A1A' }} />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2 {...props} className="text-sm font-bold mb-2 mt-3 first:mt-0" style={{ color: '#1A1A1A' }} />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3 {...props} className="text-sm font-semibold mb-1 mt-2 first:mt-0" style={{ color: '#1A1A1A' }} />
                            ),
                            strong: ({ node, ...props }) => (
                              <strong {...props} className="font-bold" style={{ color: '#1A1A1A' }} />
                            ),
                            code: ({ node, inline, ...props }: any) =>
                              inline ? (
                                <code {...props} className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono" style={{ color: '#00B46A' }} />
                              ) : (
                                <code {...props} className="block bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto" style={{ color: '#1A1A1A' }} />
                              )
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>

                {/* Show suggestions after bot messages */}
                {message.type === 'assistant' &&
                 index === messages.length - 1 &&
                 dynamicSuggestions.length > 0 &&
                 !isLoading && (
                  <div className="mt-3 flex flex-col gap-2">
                    <p className="text-xs font-medium px-1" style={{ color: '#9CA3AF' }}>You can also ask:</p>
                    <div className="flex flex-wrap gap-2">
                      {dynamicSuggestions
                        .filter(suggestion => !clickedSuggestions.has(suggestion))
                        .map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleDynamicSuggestionClick(suggestion)}
                            className="text-left px-3 py-2 rounded-full text-xs transition-all duration-200 hover:shadow-md"
                            style={{
                              backgroundColor: '#F3F4F6',
                              color: '#1A1A1A',
                              border: '1px solid #E5E7EB'
                            }}
                          >
                            {suggestion}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {(isLoading && !isStreaming) && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#00B46A', animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#00B46A', animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#00B46A', animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Fixed Footer */}
      <div
        className="px-4 py-3 bg-white"
        style={{
          borderTop: '1px solid #E5E7EB',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)'
        }}
      >
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about our services..."
            className="w-full px-4 py-3 pr-12 rounded-full outline-none transition-all"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              color: '#1A1A1A'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#00B46A';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 180, 106, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E5E7EB';
              e.target.style.boxShadow = 'none';
            }}
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

        <p className="text-xs text-center mt-2" style={{ color: '#9CA3AF' }}>
          Powered by Vinfotech AI
        </p>
      </div>
    </div>
  );
}
