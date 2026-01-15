// src/components/ChatWidget.tsx
import { useState, useEffect, useRef } from 'react';
import { Send, X, Maximize2, Minimize2, Sparkles, Mail, ThumbsUp, ThumbsDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  getSessionId,
  loadChatHistory,
  cacheChatHistory,
  clearChatHistory,
  chatHistoryTtlMs,
  type ChatMessage
} from '../lib/chat';
import {
  streamQuery,
  submitChatFeedback,
  submitContactForm,
  fetchInitialSuggestions,
  getDefaultUserId,
  getDefaultTeamId,
  type SourceDocument,
  type ResponseMetadata,
  type ContactFormPayload,
  type ContactFormField,
  type ContactFormSubmissionPayload
} from '../lib/streamingChat';
import { useTheme } from '../contexts/ThemeContext';

type WidgetState = 'collapsed' | 'preview' | 'full';

// Utility function to extract current page slug for case studies and blogs
const getCurrentPagePath = (): string | undefined => {
  const pathname = window.location.pathname;
  
  // Match paths starting with /case-studies/ or /blogs/ and extract only the slug part
  const match = pathname.match(/\/(?:case-studies|blogs)\/(.+)/);
  
  if (match && match[1]) {
    // Return only the slug part (after case-studies/ or blogs/)
    // e.g., "vision-based-attendance-productivity-monitoring" or "scalable-microservices-architecture-best-practices"
    return match[1];
  }
  
  return undefined;
};

// Hardcoded fallback questions (used only if API fails)
const FALLBACK_QUESTIONS: string[] = [
  'What AI solutions does Vinfotech offer?',
  'How can AI improve my business operations?',
  'What industries do you specialize in?'
];

const DEFAULT_CONTACT_FORM: ContactFormPayload = {
  message: "We'd love to connect you with our team. Share a few details and we'll reach out shortly.",
  original_query: '',
  fields: [
    {
      field_name: 'name',
      field_label: 'Full Name',
      field_type: 'text',
      required: true,
      placeholder: 'Your name',
      order: 1
    },
    {
      field_name: 'email',
      field_label: 'Email Address',
      field_type: 'email',
      required: true,
      placeholder: 'you@example.com',
      order: 2
    },
    {
      field_name: 'phone',
      field_label: 'Phone Number',
      field_type: 'tel',
      required: false,
      placeholder: '+1234567890',
      order: 3
    },
    {
      field_name: 'message',
      field_label: 'How can we help?',
      field_type: 'textarea',
      required: false,
      placeholder: 'Share any additional context...',
      order: 4
    }
  ]
};

export default function ChatWidget() {
  const { theme } = useTheme();
  const sessionIdRef = useRef<string>(getSessionId());
  const cachedStateRef = useRef(loadChatHistory(sessionIdRef.current));
  const [widgetState, setWidgetState] = useState<WidgetState>('collapsed');
  const [isExpanded, setIsExpanded] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(cachedStateRef.current.messages);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [initialSuggestions, setInitialSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>(cachedStateRef.current.suggestions);
  const [clickedSuggestions, setClickedSuggestions] = useState<Set<string>>(new Set());
  const [showPredefinedQuestions, setShowPredefinedQuestions] = useState(
    cachedStateRef.current.messages.length === 0 && cachedStateRef.current.suggestions.length === 0
  );
  const [_sources, setSources] = useState<SourceDocument[]>([]);
  const [_metadata, setMetadata] = useState<ResponseMetadata | null>(null);
  const [completeResponse, setCompleteResponse] = useState('');
  const [contactFormData, setContactFormData] = useState<ContactFormPayload | null>(null);
  const [contactFormValues, setContactFormValues] = useState<Record<string, string>>({});
  const [contactFormErrors, setContactFormErrors] = useState<Record<string, string>>({});
  const [contactOriginalQuery, setContactOriginalQuery] = useState('');
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSubmissionResult, setContactSubmissionResult] =
    useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastChunkRef = useRef<string>(''); // Track last chunk to prevent duplicates
  const isProcessingRef = useRef<boolean>(false); // Prevent concurrent processing
  const latestUserMessageRef = useRef<HTMLDivElement>(null);
  const lastUserQuestionRef = useRef<string>('');
  const contactAutoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [messageFeedback, setMessageFeedback] = useState<Record<number, 'positive' | 'negative'>>(cachedStateRef.current.feedback);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const loadingMessages = [
    'Thinking',
    'Processing',
    'Gathering information...',
    'Just a sec..'
  ];

  useEffect(() => {
    checkSessionState();
    resetSessionTimeout();
    // Prefetch suggestions on component mount (when user visits website)
    loadInitialSuggestions();

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load initial suggestions from API (prefetch on mount)
  const loadInitialSuggestions = async () => {
    // Skip if already loaded or currently loading
    if (initialSuggestions.length > 0 || isLoadingSuggestions) return;

    setIsLoadingSuggestions(true);
    try {
      const result = await fetchInitialSuggestions(getDefaultUserId(), getDefaultTeamId());
      
      if (result.success && result.suggestions && result.suggestions.length > 0) {
        setInitialSuggestions(result.suggestions);
        console.log('✅ Initial suggestions loaded:', result.suggestions);
      } else {
        // Use fallback questions if API fails
        setInitialSuggestions(FALLBACK_QUESTIONS);
        console.log('⚠️ Using fallback suggestions');
      }
    } catch (error) {
      console.error('Failed to load initial suggestions:', error);
      setInitialSuggestions(FALLBACK_QUESTIONS);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Cycle through loading messages
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

  // Show predefined questions ONLY when chat is completely empty (no messages and no dynamic suggestions)
  useEffect(() => {
    if (messages.length === 0 && dynamicSuggestions.length === 0) {
      setShowPredefinedQuestions(true);
    } else {
      setShowPredefinedQuestions(false);
    }
  }, [messages.length, dynamicSuggestions.length]);

  useEffect(() => {
    const sessionId = sessionIdRef.current;
    if (!sessionId) {
      return;
    }

    if (messages.length === 0 && dynamicSuggestions.length === 0) {
      clearChatHistory(sessionId);
      return;
    }

    cacheChatHistory(sessionId, {
      messages,
      suggestions: dynamicSuggestions,
      feedback: messageFeedback
    });
  }, [messages, dynamicSuggestions, messageFeedback]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }
      if (contactAutoCloseTimeoutRef.current) {
        clearTimeout(contactAutoCloseTimeoutRef.current);
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
    // Clear session after configured inactivity window
    sessionTimeoutRef.current = setTimeout(() => {
      const currentSessionId = sessionIdRef.current;
      if (currentSessionId) {
        clearChatHistory(currentSessionId);
      }
      sessionStorage.removeItem('chat_session_id');
      sessionIdRef.current = '';
      setMessages([]);
      setDynamicSuggestions([]);
      setClickedSuggestions(new Set());
      setMessageFeedback({});
      setShowPredefinedQuestions(true);
      // Reload initial suggestions on session reset
      loadInitialSuggestions();
    }, chatHistoryTtlMs);
  };

  const clearContactAutoClose = () => {
    if (contactAutoCloseTimeoutRef.current) {
      clearTimeout(contactAutoCloseTimeoutRef.current);
      contactAutoCloseTimeoutRef.current = null;
    }
  };

  const buildInitialContactValues = (fields: ContactFormField[]) => {
    const values: Record<string, string> = {};
    fields.forEach(field => {
      // Use pre-filled value from backend if available, otherwise empty string
      values[field.field_name] = field.value || '';
    });
    return values;
  };

  const initializeContactForm = (payload: ContactFormPayload, fallbackQuery?: string) => {
    const sortedFields = [...payload.fields].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    clearContactAutoClose();
    setContactFormData({
      ...payload,
      fields: sortedFields
    });
    setContactFormValues(buildInitialContactValues(sortedFields));
    setContactFormErrors({});
    setContactSubmissionResult(null);
    setContactOriginalQuery(payload.original_query || fallbackQuery || lastUserQuestionRef.current || '');
    // Keep in full mode to show inline form
    if (widgetState !== 'full') {
      setWidgetState('full');
    }
    // Scroll to show the form
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const updateContactFormValue = (fieldName: string, value: string) => {
    setContactFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    if (contactFormErrors[fieldName]) {
      setContactFormErrors(prev => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const validateContactForm = (fields: ContactFormField[]) => {
    const errors: Record<string, string> = {};
    fields.forEach(field => {
      const rawValue = contactFormValues[field.field_name] ?? '';
      const value = field.field_type === 'textarea' ? rawValue.trim() : rawValue.trim();
      if (field.required && !value) {
        errors[field.field_name] = `${field.field_label} is required`;
      }
    });
    setContactFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const activeFields = contactFormData
      ? contactFormData.fields
      : [...DEFAULT_CONTACT_FORM.fields].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (!validateContactForm(activeFields)) {
      return;
    }

    const normalizedContactData = activeFields.reduce<Record<string, string>>((acc, field) => {
      const value = contactFormValues[field.field_name] ?? '';
      acc[field.field_name] = value.trim();
      return acc;
    }, {});

    setIsContactSubmitting(true);
    setContactSubmissionResult(null);
    clearContactAutoClose();

    try {
      const sessionId = sessionIdRef.current || getSessionId();
      sessionIdRef.current = sessionId;
      const formConfig = contactFormData ?? DEFAULT_CONTACT_FORM;
      const payload: ContactFormSubmissionPayload = {
        user_id: getDefaultUserId(),
        team_id: getDefaultTeamId(),
        session_id: sessionId,
        user_query: contactOriginalQuery || formConfig.original_query || lastUserQuestionRef.current || '',
        contact_data: normalizedContactData
      };

      const result = await submitContactForm(payload);

      if (result.success) {
        // Show success message in the chat
        const successMessage = result.data?.message || '✅ Thank you for reaching out! Your details have been submitted successfully. Our team will contact you shortly. Feel free to ask any other questions!';
        setMessages(prev => [
          ...prev,
          { type: 'assistant', text: successMessage }
        ]);
        
        // Clear form and return to chat interface
        setContactFormValues(buildInitialContactValues(activeFields));
        setContactFormErrors({});
        setContactFormData(null);
        setIsContactSubmitting(false);
        setWidgetState('full');
        
        // Scroll to the success message
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setContactSubmissionResult({
          type: 'error',
          message: result.error || 'Unable to submit your details. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setContactSubmissionResult({
        type: 'error',
        message: 'Network error. Please try again.'
      });
    } finally {
      setIsContactSubmitting(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    await askQuestion(question, 1); // 1 = typed (manual) query
  };

  // Auto-resize textarea based on content (max 3 lines)
  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setQuestion(textarea.value);
    
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Calculate line height (approximately 24px for text-base)
    const lineHeight = 24;
    const maxLines = 3;
    const maxHeight = lineHeight * maxLines;
    
    // Set height based on content, but cap at max 3 lines
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;
  };

  const askQuestion = async (questionText: string, queryType?: number) => {
    // Prevent duplicate calls
    if (isLoading || isStreaming || isProcessingRef.current) {
      console.log('⚠️ Prevented duplicate call');
      return;
    }

    isProcessingRef.current = true;
    lastChunkRef.current = ''; // Reset chunk tracking
    const sessionId = sessionIdRef.current || getSessionId();
    sessionIdRef.current = sessionId;

    // Get current page path if on case study or blog page
    const currentPagePath = getCurrentPagePath();
    if (currentPagePath) {
      console.log('📄 Current page:', currentPagePath);
    }

    // Switch to full mode first if needed
    if (widgetState === 'preview') {
      setWidgetState('full');
      // Wait for widget to expand
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    clearContactAutoClose();
    lastUserQuestionRef.current = questionText;

    setQuestion('');
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setMessages(prev => [...prev, { type: 'user', text: questionText }]);
    setIsLoading(true);
    setIsStreaming(false);
    setCompleteResponse('');
    setDynamicSuggestions([]);
    setSources([]);
    setMetadata(null);
    setContactFormData(null);
    setContactFormValues({});
    setContactFormErrors({});
    setContactSubmissionResult(null);

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
        sessionId,
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
          onContactForm: (contactPayload: ContactFormPayload) => {
            console.log('📮 Contact form requested');
            setIsLoading(false);
            setIsStreaming(false);
            isProcessingRef.current = false;
            setDynamicSuggestions([]);
            setSources([]);
            setMetadata(null);
            setCompleteResponse('');
            // Add assistant message explaining the form
            setMessages(prev => [
              ...prev,
              { type: 'assistant', text: contactPayload.message }
            ]);
            // Show inline contact form
            initializeContactForm(contactPayload, lastUserQuestionRef.current);
          },
          onDone: async () => {
            setIsLoading(false);
            setIsStreaming(false);
            isProcessingRef.current = false; // Reset processing flag
            setCompleteResponse('');
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
        },
        getDefaultUserId(),
        getDefaultTeamId(),
        queryType, // Pass the query_type parameter: 0 = suggested (clicked), 1 = typed (manual)
        currentPagePath // Pass only the slug part (e.g., "vision-based-attendance-productivity-monitoring" or "scalable-microservices-architecture-best-practices")
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

  const handleSuggestedQuestionClick = async (questionText: string) => {
    // Mark this suggestion as clicked
    setClickedSuggestions(prev => new Set([...prev, questionText]));
    await askQuestion(questionText, 0); // 0 = suggested (clicked) query
  };

  const handleDynamicSuggestionClick = async (suggestion: string) => {
    setClickedSuggestions(prev => new Set([...prev, suggestion]));
    await askQuestion(suggestion, 0); // 0 = suggested (clicked) query
  };

  const handleCollapsedClick = () => {
    // Always open in full mode directly
    setWidgetState('full');
  };

  const closeWidget = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    clearContactAutoClose();
    setWidgetState('collapsed');
    setIsExpanded(false);
  };

  const openContactForm = () => {
    const manualPayload: ContactFormPayload = {
      ...DEFAULT_CONTACT_FORM,
      original_query: lastUserQuestionRef.current || ''
    };
    manualPayload.fields = DEFAULT_CONTACT_FORM.fields.map(field => ({ ...field }));
    initializeContactForm(manualPayload, lastUserQuestionRef.current || question);
  };

  const closeContactForm = () => {
    clearContactAutoClose();
    setIsContactSubmitting(false);
    setContactSubmissionResult(null);
    setContactFormErrors({});
    setContactFormData(null);
    // Stay in full mode
    if (widgetState !== 'full') {
      setWidgetState('full');
    }
  };

  const handleFeedback = async (messageIndex: number, feedbackType: 'positive' | 'negative') => {
    try {
      const message = messages[messageIndex];
      if (!message || message.type !== 'assistant') return;

      // If clicking the same button, don't do anything
      if (messageFeedback[messageIndex] === feedbackType) return;

      // Immediately update UI for better UX (optimistic update)
      setMessageFeedback(prev => ({
        ...prev,
        [messageIndex]: feedbackType
      }));

      // Try to submit to backend, but keep UI state regardless of result
      try {
        const sessionId = sessionIdRef.current || getSessionId();
        sessionIdRef.current = sessionId;

        await submitChatFeedback(
          sessionId,
          feedbackType === 'positive' ? 1 : 0
        );
      } catch (submitError) {
        // Log error but don't revert UI - user feedback is still valid
        console.error('Error submitting feedback to backend:', submitError);
      }
    } catch (error) {
      console.error('Critical error in handleFeedback:', error);
    }
  };

  if (widgetState === 'collapsed') {
    return (
      <button
        onClick={handleCollapsedClick}
        className={`fixed bottom-6 right-6 text-white shadow-2xl transition-all duration-300 hover:scale-105 z-50 group rounded-full md:rounded-3xl ${theme === 'dark' ? 'shadow-emerald-500/20' : ''}`}
        style={{ background: 'linear-gradient(45deg, rgba(0, 207, 85, 1) 0%, rgba(0, 180, 106, 1) 23%, rgba(0, 156, 92, 1) 47%, rgba(0, 171, 71, 1) 75%, rgba(14, 116, 74, 1) 100%)' }}
      >
        <div className="flex items-center gap-2 p-3 md:gap-3 md:px-5 md:py-4">
          <div className="flex items-center gap-3 hidden md:flex">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold text-lg">Ask Us Anything?</span>
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
            {showPredefinedQuestions && initialSuggestions.length > 0 && (
              <div className="grid grid-cols-1 gap-2 mb-4">
                {initialSuggestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestionClick(question)}
                    className="text-left px-3 py-2 rounded-lg bg-white hover:bg-emerald-50 border-2 border-gray-200 hover:border-emerald-500 transition-all duration-300 group hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] hover:shadow-md"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-sm text-gray-700 group-hover:text-emerald-700 font-medium leading-snug">
                        {question}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Show dynamic suggestions in preview mode when user has chat history */}
            {!showPredefinedQuestions && dynamicSuggestions.length > 0 && (
              <div className="grid grid-cols-1 gap-2 mb-4">
                <p className="text-xs font-medium text-gray-500 px-2 mb-1">Continue the conversation:</p>
                {dynamicSuggestions
                  .filter(suggestion => !clickedSuggestions.has(suggestion))
                  .slice(0, 3)
                  .map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleDynamicSuggestionClick(suggestion)}
                      className="text-left px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] group"
                    >
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0 group-hover:animate-pulse" />
                        <span className="text-sm text-gray-700 group-hover:text-emerald-800 font-medium leading-snug">
                          {suggestion}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative">
              <textarea
                rows={1}
                value={question}
                onChange={handleQuestionChange}
                onKeyDown={(e) => {
                  // Submit on Enter (without Shift)
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any);
                  }
                }}
                placeholder="Or ask your own question..."
                className={`w-full px-4 py-3 pr-12 rounded-xl border outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-none resize-none overflow-y-auto scrollbar-hide ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'}`}
                style={{ 
                  minHeight: '48px',
                  maxHeight: '72px',
                  lineHeight: '24px'
                }}
              />
              <button
                type="submit"
                disabled={!question.trim() || isLoading}
                className="absolute right-2 bottom-3 p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
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
      className={`fixed z-50 shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      style={{
        // Mobile: full screen with top margin to avoid header
        top: isDesktop ? '0' : '80px',
        left: '0',
        right: '0',
        bottom: '0',
        width: '100%',
        height: isDesktop ? '100%' : 'calc(100vh - 80px)',
        borderRadius: '0',
        // Desktop: positioned bottom-right with dynamic width
        ...(isDesktop && {
          top: 'auto',
          left: 'auto',
          bottom: '24px',
          right: '24px',
          width: isExpanded ? '800px' : '450px',
          maxWidth: 'calc(100vw - 48px)',
          height: '700px',
          minHeight: '500px',
          maxHeight: 'calc(100vh - 120px)',
          borderRadius: '24px',
        }),
        transformOrigin: 'bottom right',
      }}
    >
      {/* Fixed Header */}
      <div
        className="flex items-center justify-between px-5 py-4 shadow-sm flex-shrink-0"
        style={{
          backgroundColor: '#00B46A',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '72px',
          maxHeight: '72px',
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
        <div className="flex items-center gap-2">
          {isDesktop && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label={isExpanded ? 'Minimize' : 'Maximize'}
            >
              {isExpanded ? (
                <Minimize2 className="w-5 h-5 text-white transition-transform duration-300" />
              ) : (
                <Maximize2 className="w-5 h-5 text-white transition-transform duration-300" />
              )}
            </button>
          )}
          <button
            onClick={closeWidget}
            className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300 hover:rotate-90"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div ref={chatContainerRef} className={`flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-hide ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <img
              src="/ai-bot.png"
              alt="Vinfotech AI"
              className="w-24 h-24 object-contain mb-6 animate-float-3d"
            />
            <h3 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>How can I help you today?</h3>
            <p className={`text-base mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>Ask me anything about our services</p>

            {showPredefinedQuestions && !isLoadingSuggestions && (
              <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
                {initialSuggestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestionClick(question)}
                    className={`text-left px-3 py-2 rounded-lg border-2 transition-all duration-300 text-sm hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] group hover:shadow-md ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 hover:border-emerald-500 text-gray-200' : 'bg-white hover:bg-emerald-50 border-gray-200 hover:border-emerald-500 text-gray-700'}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`} />
                      <span className={`leading-snug ${theme === 'dark' ? 'group-hover:text-emerald-300' : 'group-hover:text-emerald-700'}`}>
                        {question}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {isLoadingSuggestions && (
              <div className="flex items-center justify-center gap-2 text-emerald-500">
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0ms', backgroundColor: '#00B46A' }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '150ms', backgroundColor: '#00B46A' }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '300ms', backgroundColor: '#00B46A' }}></div>
              </div>
            )}
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                ref={index === messages.length - 1 && message.type === 'user' ? latestUserMessageRef : null}
                className="animate-slide-up-fade"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start items-start gap-2'}`}>
                  {message.type === 'assistant' && (
                    <div className="flex-shrink-0 mt-1">
                      <img
                        src="/ai-bot.png"
                        alt="AI Assistant"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  )}
                  <div className={`relative max-w-[85%] px-4 py-3 transition-all duration-300 hover:scale-[1.02] ${
                    message.type === 'user'
                      ? 'bg-emerald-500 text-white rounded-tl-2xl rounded-bl-2xl rounded-br-2xl'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-100 shadow-sm border border-gray-600 rounded-2xl'
                        : 'bg-white text-gray-900 shadow-sm border border-gray-100 rounded-2xl'
                  }`}>
                  {message.type === 'user' && (
                    <div className="absolute top-0 -right-0 w-3 h-3 bg-emerald-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
                  )}
                  {message.type === 'user' ? (
                    <p className="text-base leading-relaxed whitespace-pre-line font-normal">{message.text}</p>
                  ) : (
                    <div className="prose prose-sm max-w-none" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => (
                            <a
                              {...props}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline font-medium cursor-pointer"
                              style={{ color: theme === 'dark' ? '#34d399' : '#059669' }}
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p
                              {...props}
                              className="mb-2 last:mb-0"
                              style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }}
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul {...props} className="list-disc pl-4 mb-2 space-y-1" />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol {...props} className="list-decimal pl-4 mb-2 space-y-1" />
                          ),
                          li: ({ node, ...props }) => (
                            <li
                              {...props}
                              style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }}
                            />
                          ),
                          h1: ({ node, ...props }) => (
                            <h1
                              {...props}
                              className="text-lg font-bold mb-2 mt-3 first:mt-0"
                              style={{ color: theme === 'dark' ? '#f9fafb' : '#111827' }}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              {...props}
                              className="text-base font-bold mb-2 mt-3 first:mt-0"
                              style={{ color: theme === 'dark' ? '#f9fafb' : '#111827' }}
                            />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3
                              {...props}
                              className="text-sm font-bold mb-1 mt-2 first:mt-0"
                              style={{ color: theme === 'dark' ? '#f9fafb' : '#111827' }}
                            />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong
                              {...props}
                              className="font-bold"
                              style={{ color: theme === 'dark' ? '#f9fafb' : '#111827' }}
                            />
                          ),
                          code: ({ node, inline, ...props }: any) =>
                            inline ? (
                              <code
                                {...props}
                                className="px-1 py-0.5 rounded text-xs font-mono"
                                style={{
                                  backgroundColor: theme === 'dark' ? '#4b5563' : '#f3f4f6',
                                  color: theme === 'dark' ? '#6ee7b7' : '#059669'
                                }}
                              />
                            ) : (
                              <code
                                {...props}
                                className="block p-2 rounded text-xs font-mono overflow-x-auto"
                                style={{
                                  backgroundColor: theme === 'dark' ? '#4b5563' : '#f3f4f6',
                                  color: theme === 'dark' ? '#f9fafb' : '#1f2937'
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

                {/* Feedback buttons for assistant messages */}
                {message.type === 'assistant' && !isLoading && (
                  <div className="flex items-center gap-3 ml-10 mt-2">
                    <button
                      onClick={() => handleFeedback(index, 'positive')}
                      className="p-1 transition-all duration-300 hover:scale-110 active:scale-95"
                      title="Helpful response"
                    >
                      <ThumbsUp className={`w-4 h-4 transition-colors duration-300 ${
                        messageFeedback[index] === 'positive'
                          ? 'text-emerald-500 stroke-2'
                          : theme === 'dark'
                            ? 'text-gray-400 hover:text-emerald-500'
                            : 'text-gray-400 hover:text-emerald-500'
                      }`} />
                    </button>
                    <button
                      onClick={() => handleFeedback(index, 'negative')}
                      className="p-1 transition-all duration-300 hover:scale-110 active:scale-95"
                      title="Not helpful"
                    >
                      <ThumbsDown className={`w-4 h-4 transition-colors duration-300 ${
                        messageFeedback[index] === 'negative'
                          ? 'text-red-500 stroke-2'
                          : theme === 'dark'
                            ? 'text-gray-400 hover:text-red-500'
                            : 'text-gray-400 hover:text-red-500'
                      }`} />
                    </button>
                    {messageFeedback[index] && (
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                        Thanks for your feedback!
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
            {(isLoading && !isStreaming) && (
              <div className="flex justify-start items-start gap-3 animate-slide-up-fade">
                <div className="flex-shrink-0 mt-1 relative">
                  <div className="absolute inset-0 rounded-full animate-spin" style={{
                    border: '2px solid transparent',
                    borderTopColor: '#00B46A',
                    borderRightColor: '#00B46A'
                  }}></div>
                  <img
                    src="/ai-bot.png"
                    alt="AI Assistant"
                    className="w-8 h-8 object-contain relative z-10"
                  />
                </div>
                <div className={`rounded-2xl px-5 py-3 shadow-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{loadingMessages[loadingMessageIndex]}</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#00B46A', animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#00B46A', animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#00B46A', animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {dynamicSuggestions.length > 0 && !isLoading && (
              <div className="flex justify-start animate-slide-up-fade pl-10">
                <div className="flex flex-col gap-2 w-full max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>You can also ask:</p>
                  </div>
                  {dynamicSuggestions
                    .filter(suggestion => !clickedSuggestions.has(suggestion))
                    .map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleDynamicSuggestionClick(suggestion)}
                        className={`text-left px-3 py-2 rounded-lg border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] group shadow-sm w-full ${theme === 'dark' ? 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 border-emerald-500/30 hover:border-emerald-400' : 'bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-emerald-200 hover:border-emerald-300'}`}
                      >
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 mt-0.5 text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <span className={`text-sm font-normal leading-snug ${theme === 'dark' ? 'text-gray-100 group-hover:text-emerald-300' : 'text-gray-800 group-hover:text-emerald-700'}`}>
                            {suggestion}
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}
            {contactFormData && widgetState === 'full' && (
              <div className="flex justify-start animate-slide-up-fade pl-10">
                <div className={`max-w-[85%] w-full rounded-2xl shadow-lg border p-6 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-5 h-5 text-emerald-500" />
                    <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Share Your Details
                    </h3>
                  </div>

                  {contactSubmissionResult && (
                    <div
                      className={`rounded-xl px-4 py-3 text-sm mb-4 border ${
                        contactSubmissionResult.type === 'success'
                          ? theme === 'dark'
                            ? 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : theme === 'dark'
                            ? 'bg-red-500/10 text-red-300 border-red-500/30'
                            : 'bg-red-50 text-red-600 border-red-200'
                      }`}
                    >
                      {contactSubmissionResult.message}
                    </div>
                  )}

                  <form className="space-y-4" onSubmit={handleContactSubmit}>
                    {contactFormData.fields.map(field => {
                      const value = contactFormValues[field.field_name] ?? '';
                      const error = contactFormErrors[field.field_name];
                      const baseInputClasses =
                        'w-full px-4 py-2.5 rounded-lg outline-none transition-all duration-200 focus:ring-2';
                      const themeInputClasses = theme === 'dark'
                        ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20';
                      const inputClasses = `${baseInputClasses} ${themeInputClasses} ${
                        error
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                          : ''
                      }`;
                      const labelClasses = `block text-sm font-medium mb-1.5 ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`;

                      return (
                        <div key={field.field_name}>
                          <label className={labelClasses}>
                            {field.field_label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {field.field_type === 'textarea' ? (
                            <textarea
                              rows={3}
                              required={field.required}
                              value={value}
                              onChange={(e) => updateContactFormValue(field.field_name, e.target.value)}
                              className={`${inputClasses} resize-none`}
                              placeholder={field.placeholder || ''}
                            />
                          ) : (
                            <input
                              type={field.field_type}
                              required={field.required}
                              value={value}
                              onChange={(e) => updateContactFormValue(field.field_name, e.target.value)}
                              className={inputClasses}
                              placeholder={field.placeholder || ''}
                            />
                          )}
                          {error && (
                            <p className="mt-1 text-xs text-red-500">
                              {error}
                            </p>
                          )}
                        </div>
                      );
                    })}

                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isContactSubmitting}
                        className="flex-1 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isContactSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={closeContactForm}
                        disabled={isContactSubmitting}
                        className={`px-4 py-3 font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${
                          theme === 'dark'
                            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className={`px-6 py-4 border-t flex-shrink-0 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <form onSubmit={handleSubmit} className="relative mb-3">
          <textarea
            ref={textareaRef}
            rows={1}
            value={question}
            onChange={handleQuestionChange}
            onKeyDown={(e) => {
              // Submit on Enter (without Shift)
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
            placeholder="Ask a question..."
            className={`w-full px-4 py-3 pr-12 rounded-xl border outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none overflow-y-auto scrollbar-hide ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
            style={{ 
              minHeight: '48px',
              maxHeight: '72px',
              lineHeight: '24px'
            }}
          />
          <button
            type="submit"
            disabled={!question.trim() || isLoading || isStreaming}
            className="absolute right-2 bottom-3 p-2 rounded-full text-white transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ backgroundColor: '#00B46A' }}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className={`text-xs text-center mt-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
          Powered by Vinfotech AI
        </p>
      </div>
    </div>
  );
}
