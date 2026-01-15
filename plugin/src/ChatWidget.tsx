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
  const [contactForm, setContactForm] = useState<ContactFormPayload | null>(null);
  const [contactFormData, setContactFormData] = useState<Record<string, string>>({});

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

  useEffect(() => {
    if (widgetState === 'full' && messages.length > 0 && chatContainerRef.current) {
      setTimeout(() => {
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
      }, 150);
    }
  }, [widgetState]);

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
            setContactForm(contactPayload);
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
        className={`vw-fixed vw-bottom-6 vw-right-6 vw-text-white vw-shadow-2xl vw-transition-all vw-duration-300 hover:vw-scale-105 vw-z-[9999] vw-group vw-rounded-full md:vw-rounded-3xl ${currentTheme === 'dark' ? 'vw-shadow-emerald-500/20' : ''}`}
        style={{ background: `linear-gradient(45deg, ${primaryColor}, ${adjustColorBrightness(primaryColor, -20)})` }}
      >
        <div className="vw-flex vw-items-center vw-gap-2 vw-p-3 md:vw-gap-3 md:vw-px-5 md:vw-py-4">
          <div className="vw-flex vw-items-center vw-gap-3 vw-hidden md:vw-flex">
            <Sparkles className="vw-w-5 vw-h-5" />
            <span className="vw-font-bold vw-text-lg">Ask Me Anything</span>
          </div>
          <div className="vw-relative md:vw-hidden">
            <img
              src={botAvatarUrl}
              alt={companyName}
              className="vw-w-12 vw-h-12 vw-object-contain vw-drop-shadow-xl"
            />
            <div className="vw-absolute vw--top-1 vw--right-1 vw-bg-white vw-text-emerald-600 vw-rounded-full vw-w-5 vw-h-5 vw-flex vw-items-center vw-justify-center vw-text-xs vw-font-bold vw-shadow-lg">
              ?
            </div>
          </div>
          <img
            src={botAvatarUrl}
            alt={companyName}
            className="vw-w-16 vw-h-16 vw-object-contain vw-drop-shadow-xl vw-hidden md:vw-block"
          />
        </div>
      </button>
    );
  }

  return (
    <div
      className={`vw-fixed vw-z-[9999] vw-shadow-2xl vw-flex vw-flex-col vw-overflow-hidden vw-transition-all vw-duration-500 vw-ease-in-out ${currentTheme === 'dark' ? 'vw-bg-gray-800' : 'vw-bg-white'}`}
      style={{
        top: isDesktop ? 'auto' : '0',
        left: isDesktop ? 'auto' : '0',
        right: isDesktop ? '24px' : '0',
        bottom: isDesktop ? '24px' : '0',
        width: isDesktop ? (isExpanded ? '800px' : '450px') : '100%',
        maxWidth: isDesktop ? 'calc(100vw - 48px)' : '100%',
        height: isDesktop ? '700px' : '100vh',
        minHeight: isDesktop ? '500px' : '100vh',
        maxHeight: isDesktop ? 'calc(100vh - 120px)' : '100vh',
        borderRadius: isDesktop ? '24px' : '0',
      }}
    >
      <div
        className="vw-flex vw-items-center vw-justify-between vw-px-5 vw-py-4 vw-shadow-sm vw-flex-shrink-0"
        style={{
          backgroundColor: primaryColor,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="vw-flex vw-items-center vw-gap-3">
          <img
            src={botAvatarUrl}
            alt={companyName}
            className="vw-w-9 vw-h-9 vw-object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="vw-font-bold vw-text-white vw-text-base">{companyName}</span>
        </div>
        <div className="vw-flex vw-items-center vw-gap-2">
          {isDesktop && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="vw-p-2 hover:vw-bg-white/20 vw-rounded-lg vw-transition-all vw-duration-300"
            >
              {isExpanded ? <Minimize2 className="vw-w-5 vw-h-5 vw-text-white" /> : <Maximize2 className="vw-w-5 vw-h-5 vw-text-white" />}
            </button>
          )}
          <button
            onClick={closeWidget}
            className="vw-p-2 hover:vw-bg-white/20 vw-rounded-lg vw-transition-all vw-duration-300"
          >
            <X className="vw-w-5 vw-h-5 vw-text-white" />
          </button>
        </div>
      </div>

      <div ref={chatContainerRef} className={`vw-flex-1 vw-overflow-y-auto vw-px-6 vw-py-4 vw-space-y-4 ${currentTheme === 'dark' ? 'vw-bg-gray-900' : 'vw-bg-gray-50'}`}>
        {messages.length === 0 ? (
          <div className="vw-flex vw-flex-col vw-items-center vw-justify-center vw-h-full vw-text-center vw-px-4">
            <img
              src={botAvatarUrl}
              alt={companyName}
              className="vw-w-24 vw-h-24 vw-object-contain vw-mb-6"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <h3 className={`vw-text-lg vw-font-bold vw-mb-1 ${currentTheme === 'dark' ? 'vw-text-white' : 'vw-text-gray-900'}`}>{welcomeMessage}</h3>

            {showPredefinedQuestions && !isLoadingSuggestions && initialSuggestions.length > 0 && (
              <div className="vw-grid vw-grid-cols-1 vw-gap-2 vw-w-full vw-max-w-sm vw-mt-6">
                {initialSuggestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestionClick(question)}
                    className={`vw-text-left vw-px-3 vw-py-2 vw-rounded-lg vw-border-2 vw-transition-all vw-duration-300 vw-text-sm hover:vw-scale-[1.02] vw-group ${currentTheme === 'dark' ? 'vw-bg-gray-700 hover:vw-bg-gray-600 vw-border-gray-600 vw-text-gray-200' : 'vw-bg-white vw-text-gray-700'}`}
                    style={{
                      borderColor: primaryColor + (currentTheme === 'dark' ? '60' : '40'),
                      backgroundColor: currentTheme === 'light' ? primaryColor + '08' : undefined
                    }}
                    onMouseEnter={(e) => {
                      if (currentTheme === 'light') {
                        e.currentTarget.style.backgroundColor = primaryColor + '15';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentTheme === 'light') {
                        e.currentTarget.style.backgroundColor = primaryColor + '08';
                      }
                    }}
                  >
                    <div className="vw-flex vw-items-start vw-gap-2">
                      <Sparkles className="vw-w-3.5 vw-h-3.5 vw-mt-0.5 vw-flex-shrink-0" style={{ color: primaryColor }} />
                      <span>{question}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {isLoadingSuggestions && (
              <div className="vw-flex vw-items-center vw-justify-center vw-gap-2 vw-text-emerald-500 vw-mt-6">
                <div className="vw-w-2 vw-h-2 vw-rounded-full vw-animate-bounce" style={{ animationDelay: '0ms', backgroundColor: primaryColor }}></div>
                <div className="vw-w-2 vw-h-2 vw-rounded-full vw-animate-bounce" style={{ animationDelay: '150ms', backgroundColor: primaryColor }}></div>
                <div className="vw-w-2 vw-h-2 vw-rounded-full vw-animate-bounce" style={{ animationDelay: '300ms', backgroundColor: primaryColor }}></div>
              </div>
            )}
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={index}>
                <div className={`vw-flex ${message.type === 'user' ? 'vw-justify-end' : 'vw-justify-start vw-items-start vw-gap-2'}`}>
                  {message.type === 'assistant' && (
                    <img
                      src={botAvatarUrl}
                      alt="AI"
                      className="vw-w-8 vw-h-8 vw-object-contain vw-mt-1"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className={`vw-max-w-[85%] vw-px-4 vw-py-3 vw-transition-all vw-duration-300 ${
                    message.type === 'user'
                      ? 'vw-rounded-tl-2xl vw-rounded-bl-2xl vw-rounded-br-2xl vw-text-white'
                      : currentTheme === 'dark'
                        ? 'vw-bg-gray-700 vw-text-gray-100 vw-border vw-border-gray-600 vw-rounded-2xl'
                        : 'vw-bg-white vw-text-gray-900 vw-border vw-border-gray-100 vw-rounded-2xl'
                  }`} style={message.type === 'user' ? { backgroundColor: primaryColor } : {}}>
                    {message.type === 'user' ? (
                      <p className="vw-text-base vw-leading-relaxed">{message.text}</p>
                    ) : (
                      <div className="vw-prose vw-prose-sm vw-max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: ({ node, ...props }) => (
                              <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: currentTheme === 'dark' ? '#34d399' : '#059669' }}
                              />
                            ),
                            p: ({ node, ...props }) => (
                              <p
                                {...props}
                                className="vw-mb-2 last:vw-mb-0"
                                style={{ color: currentTheme === 'dark' ? '#e5e7eb' : '#374151' }}
                              />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul {...props} className="vw-list-disc vw-pl-4 vw-mb-2 vw-space-y-1" />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol {...props} className="vw-list-decimal vw-pl-4 vw-mb-2 vw-space-y-1" />
                            ),
                            li: ({ node, ...props }) => (
                              <li
                                {...props}
                                style={{ color: currentTheme === 'dark' ? '#e5e7eb' : '#374151' }}
                              />
                            ),
                            h1: ({ node, ...props }) => (
                              <h1
                                {...props}
                                className="vw-text-lg vw-font-bold vw-mb-2 vw-mt-3 first:vw-mt-0"
                                style={{ color: currentTheme === 'dark' ? '#f9fafb' : '#111827' }}
                              />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2
                                {...props}
                                className="vw-text-base vw-font-bold vw-mb-2 vw-mt-3 first:vw-mt-0"
                                style={{ color: currentTheme === 'dark' ? '#f9fafb' : '#111827' }}
                              />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3
                                {...props}
                                className="vw-text-sm vw-font-bold vw-mb-1 vw-mt-2 first:vw-mt-0"
                                style={{ color: currentTheme === 'dark' ? '#f9fafb' : '#111827' }}
                              />
                            ),
                            strong: ({ node, ...props }) => (
                              <strong
                                {...props}
                                className="vw-font-bold"
                                style={{ color: currentTheme === 'dark' ? '#f9fafb' : '#111827' }}
                              />
                            ),
                            code: ({ node, inline, ...props }: any) =>
                              inline ? (
                                <code
                                  {...props}
                                  className="vw-px-1 vw-py-0.5 vw-rounded vw-text-xs vw-font-mono"
                                  style={{
                                    backgroundColor: currentTheme === 'dark' ? '#4b5563' : '#f3f4f6',
                                    color: currentTheme === 'dark' ? '#6ee7b7' : '#059669'
                                  }}
                                />
                              ) : (
                                <code
                                  {...props}
                                  className="vw-block vw-p-2 vw-rounded vw-text-xs vw-font-mono vw-overflow-x-auto"
                                  style={{
                                    backgroundColor: currentTheme === 'dark' ? '#4b5563' : '#f3f4f6',
                                    color: currentTheme === 'dark' ? '#f9fafb' : '#1f2937'
                                  }}
                                />
                              )
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>

                {message.type === 'assistant' && !isLoading && (
                  <div className="vw-flex vw-items-center vw-gap-3 vw-ml-10 vw-mt-2">
                    <button
                      onClick={() => handleFeedback(index, 'positive')}
                      className="vw-p-1 vw-transition-all vw-duration-300"
                    >
                      <ThumbsUp className={`vw-w-4 vw-h-4 ${messageFeedback[index] === 'positive' ? 'vw-text-green-500' : 'vw-text-gray-400'}`} />
                    </button>
                    <button
                      onClick={() => handleFeedback(index, 'negative')}
                      className="vw-p-1 vw-transition-all vw-duration-300"
                    >
                      <ThumbsDown className={`vw-w-4 vw-h-4 ${messageFeedback[index] === 'negative' ? 'vw-text-red-500' : 'vw-text-gray-400'}`} />
                    </button>
                    {messageFeedback[index] && (
                      <span className={`vw-text-xs ${currentTheme === 'dark' ? 'vw-text-gray-500' : 'vw-text-gray-400'}`}>
                        Thanks for your feedback!
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
            {(isLoading && !isStreaming) && (
              <div className="vw-flex vw-justify-start vw-items-start vw-gap-3">
                <div className="vw-flex-shrink-0 vw-mt-1 vw-relative">
                  <div className="vw-absolute vw-inset-0 vw-rounded-full vw-animate-spin" style={{
                    border: '2px solid transparent',
                    borderTopColor: primaryColor,
                    borderRightColor: primaryColor
                  }}></div>
                  <img
                    src={botAvatarUrl}
                    alt="AI"
                    className="vw-w-8 vw-h-8 vw-object-contain vw-relative vw-z-10"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className={`vw-rounded-2xl vw-px-5 vw-py-3 ${currentTheme === 'dark' ? 'vw-bg-gray-700' : 'vw-bg-white vw-border vw-border-gray-100'}`}>
                  <div className="vw-flex vw-items-center vw-gap-2">
                    <span className={`vw-text-base vw-font-medium ${currentTheme === 'dark' ? 'vw-text-gray-300' : 'vw-text-gray-600'}`}>
                      {loadingMessages[loadingMessageIndex]}
                    </span>
                    <div className="vw-flex vw-gap-1">
                      <div className="vw-w-2 vw-h-2 vw-rounded-full vw-animate-bounce" style={{ backgroundColor: primaryColor, animationDelay: '0ms' }}></div>
                      <div className="vw-w-2 vw-h-2 vw-rounded-full vw-animate-bounce" style={{ backgroundColor: primaryColor, animationDelay: '150ms' }}></div>
                      <div className="vw-w-2 vw-h-2 vw-rounded-full vw-animate-bounce" style={{ backgroundColor: primaryColor, animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {dynamicSuggestions.length > 0 && !isLoading && (
              <div className="vw-flex vw-justify-start vw-pl-10">
                <div className="vw-flex vw-flex-col vw-gap-2 vw-w-full vw-max-w-[85%]">
                  <div className="vw-flex vw-items-center vw-gap-2">
                    <Sparkles className="vw-w-3.5 vw-h-3.5" style={{ color: primaryColor }} />
                    <p className={`vw-text-sm vw-font-semibold ${currentTheme === 'dark' ? 'vw-text-gray-200' : 'vw-text-gray-700'}`}>You can also ask:</p>
                  </div>
                  {dynamicSuggestions
                    .filter(suggestion => !clickedSuggestions.has(suggestion))
                    .map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleDynamicSuggestionClick(suggestion)}
                        className={`vw-text-left vw-px-3 vw-py-2 vw-rounded-lg vw-border vw-transition-all vw-duration-300 hover:vw-scale-[1.02] vw-group vw-shadow-sm vw-w-full ${currentTheme === 'dark' ? 'vw-bg-gray-700 hover:vw-bg-gray-600 vw-border-gray-600' : 'vw-bg-white vw-text-gray-700'}`}
                        style={{
                          borderColor: primaryColor + (currentTheme === 'dark' ? '40' : '30'),
                          backgroundColor: currentTheme === 'light' ? primaryColor + '10' : undefined
                        }}
                        onMouseEnter={(e) => {
                          if (currentTheme === 'light') {
                            e.currentTarget.style.backgroundColor = primaryColor + '20';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentTheme === 'light') {
                            e.currentTarget.style.backgroundColor = primaryColor + '10';
                          }
                        }}
                      >
                        <div className="vw-flex vw-items-start vw-gap-2">
                          <Sparkles className="vw-w-3.5 vw-h-3.5 vw-mt-0.5 vw-flex-shrink-0 group-hover:vw-scale-110 vw-transition-transform" style={{ color: primaryColor }} />
                          <span className={`vw-text-sm vw-leading-snug ${currentTheme === 'dark' ? 'vw-text-gray-100' : 'vw-text-gray-800'}`}>
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

      <div className={`vw-px-6 vw-py-4 vw-border-t vw-flex-shrink-0 ${currentTheme === 'dark' ? 'vw-bg-gray-800 vw-border-gray-700' : 'vw-bg-white vw-border-gray-200'}`}>
        {contactForm ? (
          <div className="vw-space-y-3 vw-mb-3">
            {contactForm.fields.sort((a, b) => (a.order || 0) - (b.order || 0)).map((field) => (
              <div key={field.field_name}>
                <label className={`vw-block vw-text-sm vw-font-medium vw-mb-1 ${currentTheme === 'dark' ? 'vw-text-gray-200' : 'vw-text-gray-700'}`}>
                  {field.field_label}
                  {field.required && <span className="vw-text-red-500 vw-ml-1">*</span>}
                </label>
                {field.field_type === 'textarea' ? (
                  <textarea
                    value={contactFormData[field.field_name] || ''}
                    onChange={(e) => setContactFormData(prev => ({ ...prev, [field.field_name]: e.target.value }))}
                    placeholder={field.placeholder}
                    rows={3}
                    className={`vw-w-full vw-px-3 vw-py-2 vw-rounded-lg vw-border vw-outline-none vw-transition-all ${currentTheme === 'dark' ? 'vw-bg-gray-700 vw-border-gray-600 vw-text-white' : 'vw-bg-gray-50 vw-border-gray-200 vw-text-gray-900'}`}
                  />
                ) : (
                  <input
                    type={field.field_type}
                    value={contactFormData[field.field_name] || ''}
                    onChange={(e) => setContactFormData(prev => ({ ...prev, [field.field_name]: e.target.value }))}
                    placeholder={field.placeholder}
                    className={`vw-w-full vw-px-3 vw-py-2 vw-rounded-lg vw-border vw-outline-none vw-transition-all ${currentTheme === 'dark' ? 'vw-bg-gray-700 vw-border-gray-600 vw-text-white' : 'vw-bg-gray-50 vw-border-gray-200 vw-text-gray-900'}`}
                  />
                )}
              </div>
            ))}
            <div className="vw-flex vw-gap-2">
              <button
                onClick={async () => {
                  const allRequiredFilled = contactForm.fields
                    .filter(f => f.required)
                    .every(f => contactFormData[f.field_name]?.trim());

                  if (!allRequiredFilled) {
                    alert('Please fill all required fields');
                    return;
                  }

                  try {
                    const result = await apiRef.current.submitContactForm({
                      user_id: config.userId || 'default_user',
                      team_id: config.teamId || 'default_team',
                      session_id: sessionIdRef.current,
                      user_query: contactForm.original_query,
                      contact_data: contactFormData
                    });

                    if (result.success) {
                      setMessages(prev => [...prev, { type: 'assistant', text: result.message || 'Thank you! We\'ll be in touch soon.' }]);
                    } else {
                      setMessages(prev => [...prev, { type: 'assistant', text: result.error || 'Sorry, there was an error. Please try again.' }]);
                    }
                    setContactForm(null);
                    setContactFormData({});
                  } catch (error) {
                    console.error('Error submitting contact form:', error);
                    setMessages(prev => [...prev, { type: 'assistant', text: 'Sorry, there was an error. Please try again.' }]);
                  }
                }}
                className="vw-flex-1 vw-px-4 vw-py-2 vw-rounded-lg vw-text-white vw-font-medium vw-transition-all"
                style={{ backgroundColor: primaryColor }}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setContactForm(null);
                  setContactFormData({});
                }}
                className={`vw-px-4 vw-py-2 vw-rounded-lg vw-font-medium vw-transition-all ${currentTheme === 'dark' ? 'vw-bg-gray-700 vw-text-gray-200' : 'vw-bg-gray-200 vw-text-gray-700'}`}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="vw-relative vw-mb-3">
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
              className={`vw-w-full vw-px-4 vw-py-3 vw-pr-12 vw-rounded-xl vw-border vw-outline-none vw-transition-all vw-resize-none ${currentTheme === 'dark' ? 'vw-bg-gray-700 vw-border-gray-600 vw-text-white' : 'vw-bg-gray-50 vw-border-gray-200 vw-text-gray-900'}`}
              style={{ minHeight: '48px', maxHeight: '72px' }}
            />
            <button
              type="submit"
              disabled={!question.trim() || isLoading}
              className="vw-absolute vw-right-2 vw-bottom-3 vw-p-2 vw-rounded-full vw-text-white vw-transition-all disabled:vw-opacity-50"
              style={{ backgroundColor: primaryColor }}
            >
              <Send className="vw-w-4 vw-h-4" />
            </button>
          </form>
        )}

        {config.branding?.showPoweredBy !== false && (
          <p className={`vw-text-xs vw-text-center ${currentTheme === 'dark' ? 'vw-text-gray-500' : 'vw-text-gray-400'}`}>
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
