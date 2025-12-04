import { useState, useEffect, useRef } from 'react';
import { Send, X, Maximize2, Minimize2, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ChatWidgetConfig, ChatMessage } from './types';
import { ChatAPI, type ContactFormPayload } from './api';
import { ChatStorage } from './storage';
import { getSessionId, detectTheme } from './utils';

type WidgetState = 'collapsed' | 'preview' | 'full';

interface ChatWidgetProps {
  config: ChatWidgetConfig;
}

const FALLBACK_QUESTIONS: string[] = [
  'What AI solutions does Vinfotech offer?',
  'How can AI improve my business operations?',
  'What industries do you specialize in?'
];

export function ChatWidget({ config }: ChatWidgetProps) {
  const sessionIdRef = useRef<string>(getSessionId());
  const apiRef = useRef<ChatAPI>(new ChatAPI(config.apiUrl));
  const storageRef = useRef<ChatStorage>(
    new ChatStorage('vinfotech_chat_', 60, true)
  );

  const cachedStateRef = useRef(storageRef.current.loadChatHistory(sessionIdRef.current));
  const [widgetState, setWidgetState] = useState<WidgetState>(
    config.behavior?.defaultState || 'collapsed'
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(cachedStateRef.current.messages);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [initialSuggestions, setInitialSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>(cachedStateRef.current.suggestions);
  const [clickedSuggestions, setClickedSuggestions] = useState<Set<string>>(new Set());
  const [showPredefinedQuestions, setShowPredefinedQuestions] = useState(
    cachedStateRef.current.messages.length === 0
  );
  const [messageFeedback, setMessageFeedback] = useState<Record<number, 'positive' | 'negative'>>(
    cachedStateRef.current.feedback
  );
  const [currentTheme, setCurrentTheme] = useState(detectTheme(config.theme?.mode));
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isProcessingRef = useRef<boolean>(false);

  const primaryColor = config.theme?.primaryColor || '#00B46A';
  const companyName = config.branding?.companyName || 'AI Assistant';
  const botAvatarUrl = '/ai-bot.png';
  const welcomeMessage = config.messages?.welcomeMessage || 'How can I help you today?';
  const placeholderText = config.messages?.placeholderText || 'Ask a question...';

  const loadingMessages = [
    'Thinking',
    'Processing',
    'Gathering information...',
    'Just a sec..'
  ];

  useEffect(() => {
    if (config.behavior?.autoOpen) {
      setWidgetState('full');
    }

    loadInitialSuggestions();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = () => setCurrentTheme(detectTheme(config.theme?.mode));
    mediaQuery.addEventListener('change', handleThemeChange);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      window.removeEventListener('resize', handleResize);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    if (isLoading && !isStreaming) {
      const interval = setInterval(() => {
        setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setLoadingMessageIndex(0);
    }
  }, [isLoading, isStreaming]);

  useEffect(() => {
    if (messages.length === 0 && dynamicSuggestions.length === 0) {
      setShowPredefinedQuestions(true);
    } else {
      setShowPredefinedQuestions(false);
    }
  }, [messages.length, dynamicSuggestions.length]);

  useEffect(() => {
    const sessionId = sessionIdRef.current;
    if (!sessionId) return;

    if (messages.length === 0 && dynamicSuggestions.length === 0) {
      storageRef.current.clearChatHistory(sessionId);
      return;
    }

    storageRef.current.saveChatHistory(sessionId, {
      messages,
      suggestions: dynamicSuggestions,
      feedback: messageFeedback
    });
  }, [messages, dynamicSuggestions, messageFeedback]);

  const loadInitialSuggestions = async () => {
    if (initialSuggestions.length > 0 || isLoadingSuggestions || !config.suggestions?.enabled) return;

    setIsLoadingSuggestions(true);
    try {
      const suggestions = await apiRef.current.fetchInitialSuggestions(
        config.userId || 'default_user',
        config.teamId || 'default_team'
      );

      if (suggestions.length > 0) {
        setInitialSuggestions(suggestions);
      } else if (config.suggestions?.fallbackQuestions) {
        setInitialSuggestions(config.suggestions.fallbackQuestions);
      } else {
        setInitialSuggestions(FALLBACK_QUESTIONS);
      }
    } catch (error) {
      console.error('Failed to load suggestions:', error);
      if (config.suggestions?.fallbackQuestions) {
        setInitialSuggestions(config.suggestions.fallbackQuestions);
      } else {
        setInitialSuggestions(FALLBACK_QUESTIONS);
      }
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const askQuestion = async (questionText: string, queryType?: number) => {
    if (isLoading || isStreaming || isProcessingRef.current) return;

    isProcessingRef.current = true;

    if (widgetState === 'preview') {
      setWidgetState('full');
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setQuestion('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setMessages(prev => [...prev, { type: 'user', text: questionText }]);
    setIsLoading(true);
    setIsStreaming(false);
    setDynamicSuggestions([]);
    setShowPredefinedQuestions(false);

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

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      let firstChunk = true;
      await apiRef.current.streamQuery(
        sessionIdRef.current,
        questionText,
        {
          onResponseChunk: (content: string) => {
            setIsLoading(false);
            setIsStreaming(true);

            setMessages(prev => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];

              if (firstChunk || !lastMessage || lastMessage.type !== 'assistant') {
                firstChunk = false;
                return [...newMessages, { type: 'assistant', text: content }];
              }

              if (lastMessage && lastMessage.type === 'assistant') {
                lastMessage.text += content;
              }
              return newMessages;
            });
          },
          onSuggestedQuestions: (questions: string[]) => {
            setDynamicSuggestions(questions);
          },
          onContactForm: (contactPayload: ContactFormPayload) => {
            setIsLoading(false);
            setIsStreaming(false);
            isProcessingRef.current = false;
            setMessages(prev => [
              ...prev,
              { type: 'assistant', text: contactPayload.message }
            ]);
          },
          onDone: () => {
            setIsLoading(false);
            setIsStreaming(false);
            isProcessingRef.current = false;
          },
          onError: (error: string) => {
            console.error('Streaming error:', error);
            isProcessingRef.current = false;
            const errorMsg = config.messages?.errorMessage || "I apologize, but I'm having trouble connecting right now.";
            setMessages(prev => [...prev, { type: 'assistant', text: errorMsg }]);
            setIsLoading(false);
            setIsStreaming(false);
          }
        },
        config.userId || 'default_user',
        config.teamId || 'default_team',
        queryType
      );
    } catch (error) {
      console.error('Error getting response:', error);
      isProcessingRef.current = false;
      const errorMsg = config.messages?.errorMessage || "I apologize, but I'm having trouble connecting right now.";
      setMessages(prev => [...prev, { type: 'assistant', text: errorMsg }]);
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;
    await askQuestion(question, 1);
  };

  const handleSuggestedQuestionClick = async (questionText: string) => {
    await askQuestion(questionText, 0);
  };

  const handleDynamicSuggestionClick = async (suggestion: string) => {
    setClickedSuggestions(prev => new Set(prev).add(suggestion));
    await askQuestion(suggestion, 0);
  };

  const handleCollapsedClick = () => {
    setWidgetState('full');
    if (config.callbacks?.onOpen) {
      config.callbacks.onOpen();
    }
  };

  const closeWidget = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setWidgetState('collapsed');
    setIsExpanded(false);
    if (config.callbacks?.onClose) {
      config.callbacks.onClose();
    }
  };

  const handleFeedback = async (messageIndex: number, feedbackType: 'positive' | 'negative') => {
    if (messageFeedback[messageIndex] === feedbackType) return;

    setMessageFeedback(prev => ({
      ...prev,
      [messageIndex]: feedbackType
    }));

    try {
      await apiRef.current.submitChatFeedback(
        sessionIdRef.current,
        feedbackType === 'positive' ? 1 : 0
      );
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  if (widgetState === 'collapsed') {
    return (
      <button
        onClick={handleCollapsedClick}
        className={`fixed bottom-6 right-6 text-white shadow-2xl transition-all duration-300 hover:scale-105 z-50 group rounded-full md:rounded-3xl ${currentTheme === 'dark' ? 'shadow-emerald-500/20' : ''}`}
        style={{ background: `linear-gradient(45deg, ${primaryColor}, ${adjustColorBrightness(primaryColor, -20)})` }}
      >
        <div className="flex items-center gap-2 p-3 md:gap-3 md:px-5 md:py-4">
          <div className="flex items-center gap-3 hidden md:flex">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold text-lg">Ask Us Anything?</span>
          </div>
          <div className="relative md:hidden">
            <img
              src={botAvatarUrl}
              alt={companyName}
              className="w-12 h-12 object-contain drop-shadow-xl"
            />
            <div className="absolute -top-1 -right-1 bg-white text-emerald-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg">
              ?
            </div>
          </div>
          <img
            src={botAvatarUrl}
            alt={companyName}
            className="w-16 h-16 object-contain drop-shadow-xl hidden md:block"
          />
        </div>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      style={{
        top: isDesktop ? 'auto' : '80px',
        left: isDesktop ? 'auto' : '0',
        right: isDesktop ? '24px' : '0',
        bottom: isDesktop ? '24px' : '0',
        width: isDesktop ? (isExpanded ? '800px' : '450px') : '100%',
        maxWidth: isDesktop ? 'calc(100vw - 48px)' : '100%',
        height: isDesktop ? '700px' : 'calc(100vh - 80px)',
        minHeight: isDesktop ? '500px' : 'auto',
        maxHeight: isDesktop ? 'calc(100vh - 120px)' : 'calc(100vh - 80px)',
        borderRadius: isDesktop ? '24px' : '0',
      }}
    >
      <div
        className="flex items-center justify-between px-5 py-4 shadow-sm flex-shrink-0"
        style={{
          backgroundColor: primaryColor,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src={botAvatarUrl}
            alt={companyName}
            className="w-9 h-9 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="font-bold text-white text-base">{companyName}</span>
        </div>
        <div className="flex items-center gap-2">
          {isDesktop && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300"
            >
              {isExpanded ? <Minimize2 className="w-5 h-5 text-white" /> : <Maximize2 className="w-5 h-5 text-white" />}
            </button>
          )}
          <button
            onClick={closeWidget}
            className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div ref={chatContainerRef} className={`flex-1 overflow-y-auto px-6 py-4 space-y-4 ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <img
              src={botAvatarUrl}
              alt={companyName}
              className="w-24 h-24 object-contain mb-6"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <h3 className={`text-lg font-bold mb-1 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{welcomeMessage}</h3>

            {showPredefinedQuestions && !isLoadingSuggestions && initialSuggestions.length > 0 && (
              <div className="grid grid-cols-1 gap-2 w-full max-w-sm mt-6">
                {initialSuggestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestionClick(question)}
                    className={`text-left px-3 py-2 rounded-lg border-2 transition-all duration-300 text-sm hover:scale-[1.02] group ${currentTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-200' : 'bg-white hover:bg-green-50 border-gray-200 text-gray-700'}`}
                    style={{ borderColor: currentTheme === 'dark' ? '' : primaryColor + '40' }}
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                      <span>{question}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {isLoadingSuggestions && (
              <div className="flex items-center justify-center gap-2 text-emerald-500 mt-6">
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0ms', backgroundColor: primaryColor }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '150ms', backgroundColor: primaryColor }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '300ms', backgroundColor: primaryColor }}></div>
              </div>
            )}
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={index}>
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start items-start gap-2'}`}>
                  {message.type === 'assistant' && (
                    <img
                      src={botAvatarUrl}
                      alt="AI"
                      className="w-8 h-8 object-contain mt-1"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className={`max-w-[85%] px-4 py-3 transition-all duration-300 ${
                    message.type === 'user'
                      ? 'rounded-tl-2xl rounded-bl-2xl rounded-br-2xl text-white'
                      : currentTheme === 'dark'
                        ? 'bg-gray-700 text-gray-100 border border-gray-600 rounded-2xl'
                        : 'bg-white text-gray-900 border border-gray-100 rounded-2xl'
                  }`} style={message.type === 'user' ? { backgroundColor: primaryColor } : {}}>
                    {message.type === 'user' ? (
                      <p className="text-base leading-relaxed">{message.text}</p>
                    ) : (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>

                {message.type === 'assistant' && !isLoading && (
                  <div className="flex items-center gap-3 ml-10 mt-2">
                    <button
                      onClick={() => handleFeedback(index, 'positive')}
                      className="p-1 transition-all duration-300"
                    >
                      <ThumbsUp className={`w-4 h-4 ${messageFeedback[index] === 'positive' ? 'text-green-500' : 'text-gray-400'}`} />
                    </button>
                    <button
                      onClick={() => handleFeedback(index, 'negative')}
                      className="p-1 transition-all duration-300"
                    >
                      <ThumbsDown className={`w-4 h-4 ${messageFeedback[index] === 'negative' ? 'text-red-500' : 'text-gray-400'}`} />
                    </button>
                    {messageFeedback[index] && (
                      <span className={`text-xs ${currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                        Thanks for your feedback!
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
            {(isLoading && !isStreaming) && (
              <div className="flex justify-start items-start gap-3">
                <div className="flex-shrink-0 mt-1 relative">
                  <div className="absolute inset-0 rounded-full animate-spin" style={{
                    border: '2px solid transparent',
                    borderTopColor: primaryColor,
                    borderRightColor: primaryColor
                  }}></div>
                  <img
                    src={botAvatarUrl}
                    alt="AI"
                    className="w-8 h-8 object-contain relative z-10"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className={`rounded-2xl px-5 py-3 ${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-white border border-gray-100'}`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-base font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {loadingMessages[loadingMessageIndex]}
                    </span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: primaryColor, animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: primaryColor, animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: primaryColor, animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {dynamicSuggestions.length > 0 && !isLoading && (
              <div className="flex justify-start pl-10">
                <div className="flex flex-col gap-2 w-full max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                    <p className={`text-sm font-semibold ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>You can also ask:</p>
                  </div>
                  {dynamicSuggestions
                    .filter(suggestion => !clickedSuggestions.has(suggestion))
                    .map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleDynamicSuggestionClick(suggestion)}
                        className={`text-left px-3 py-2 rounded-lg border transition-all duration-300 hover:scale-[1.02] group shadow-sm w-full ${currentTheme === 'dark' ? 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 border-emerald-500/30' : 'bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-emerald-200'}`}
                      >
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: primaryColor }} />
                          <span className={`text-sm leading-snug ${currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
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

      <div className={`px-6 py-4 border-t flex-shrink-0 ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <form onSubmit={handleSubmit} className="relative mb-3">
          <textarea
            ref={textareaRef}
            rows={1}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
            placeholder={placeholderText}
            className={`w-full px-4 py-3 pr-12 rounded-xl border outline-none transition-all resize-none ${currentTheme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
            style={{ minHeight: '48px', maxHeight: '72px' }}
          />
          <button
            type="submit"
            disabled={!question.trim() || isLoading}
            className="absolute right-2 bottom-3 p-2 rounded-full text-white transition-all disabled:opacity-50"
            style={{ backgroundColor: primaryColor }}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {config.branding?.showPoweredBy !== false && (
          <p className={`text-xs text-center ${currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            {config.branding?.poweredByText || 'Powered by Vinfotech AI'}
          </p>
        )}
      </div>
    </div>
  );
}

function adjustColorBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}
