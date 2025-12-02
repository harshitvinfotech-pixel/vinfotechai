export interface ChatWidgetConfig {
  apiUrl: string;
  userId?: string;
  teamId?: string;

  theme?: {
    primaryColor?: string;
    mode?: 'light' | 'dark' | 'auto';
  };

  branding?: {
    companyName?: string;
    logoUrl?: string;
    botAvatarUrl?: string;
    poweredByText?: string;
    showPoweredBy?: boolean;
  };

  behavior?: {
    autoOpen?: boolean;
    defaultState?: 'collapsed' | 'preview' | 'full';
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    mobileFullscreen?: boolean;
    enableSound?: boolean;
  };

  messages?: {
    welcomeMessage?: string;
    placeholderText?: string;
    errorMessage?: string;
    offlineMessage?: string;
  };

  suggestions?: {
    enabled?: boolean;
    fallbackQuestions?: string[];
  };

  privacy?: {
    enableLocalStorage?: boolean;
    sessionTtlMinutes?: number;
    enableCookies?: boolean;
  };

  customization?: {
    css?: string;
    className?: string;
  };

  callbacks?: {
    onOpen?: () => void;
    onClose?: () => void;
    onMessage?: (message: string) => void;
    onError?: (error: Error) => void;
  };

  analytics?: {
    enabled?: boolean;
    trackEvents?: boolean;
  };
}

export interface ChatMessage {
  type: 'user' | 'assistant';
  text: string;
  timestamp?: number;
}

export const DEFAULT_CONFIG: Partial<ChatWidgetConfig> = {
  theme: {
    primaryColor: '#00B46A',
    mode: 'auto'
  },
  branding: {
    companyName: 'AI Assistant',
    showPoweredBy: true,
    poweredByText: 'Powered by Vinfotech AI'
  },
  behavior: {
    autoOpen: false,
    defaultState: 'collapsed',
    position: 'bottom-right',
    mobileFullscreen: true,
    enableSound: false
  },
  messages: {
    welcomeMessage: 'How can I help you today?',
    placeholderText: 'Ask a question...',
    errorMessage: "I apologize, but I'm having trouble connecting right now. Please try again.",
    offlineMessage: 'You appear to be offline. Please check your connection.'
  },
  suggestions: {
    enabled: true,
    fallbackQuestions: [
      'What services do you offer?',
      'How can you help my business?',
      'Tell me about your solutions'
    ]
  },
  privacy: {
    enableLocalStorage: true,
    sessionTtlMinutes: 60,
    enableCookies: false
  },
  analytics: {
    enabled: false,
    trackEvents: false
  }
};
