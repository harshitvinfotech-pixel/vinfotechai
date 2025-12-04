export interface ChatWidgetConfig {
  version?: string;
  apiUrl: string;
  userId?: string;
  teamId?: string;

  theme?: {
    primaryColor?: string;
    mode?: 'light' | 'dark' | 'auto';
  };

  branding?: {
    companyName?: string;
    showPoweredBy?: boolean;
    poweredByText?: string;
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

  customization?: {
    css?: string;
    className?: string;
  };

  callbacks?: {
    onOpen?: () => void;
    onClose?: () => void;
  };
}

export interface ChatMessage {
  type: 'user' | 'assistant';
  text: string;
  timestamp?: number;
}

export const DEFAULT_CONFIG: Partial<ChatWidgetConfig> = {
  version: '1.0.0',
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
  }
};
