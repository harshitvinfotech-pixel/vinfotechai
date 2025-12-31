// src/components/ChatWidgetPlugin.tsx
// This component initializes the hosted Vinfotech Chat Widget plugin
// with configuration from environment variables

import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Environment variables (same as before)
const chatApiUrl = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8001/api';
const defaultUserId = import.meta.env.VITE_CHAT_DEFAULT_USER_ID || 'default_user';
const defaultTeamId = import.meta.env.VITE_CHAT_DEFAULT_TEAM_ID || 'default_team';
const poweredByUrl = import.meta.env.VITE_CHAT_POWERED_BY_URL || 'https://ai.vinfotech.com';

// Plugin URL - configurable via env for local development
const pluginBaseUrl = import.meta.env.VITE_CHAT_PLUGIN_BASE_URL || 'https://chatbot.vinfotech.com/v1.1.0';
const PLUGIN_URL = `${pluginBaseUrl}/vinfotech-chat-widget.es.js`;
const PLUGIN_CSS_URL = `${pluginBaseUrl}/vinfotech-chat-widget.css`;

// Extend Window interface for the plugin
declare global {
  interface Window {
    vinfotechChatConfig?: {
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
        poweredByUrl?: string;
      };
      behavior?: {
        autoOpen?: boolean;
        defaultState?: 'collapsed' | 'preview' | 'full';
        mobileFullscreen?: boolean;
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
    };
    VinfotechChatWidget?: {
      init: (config: Window['vinfotechChatConfig']) => void;
      destroy: () => void;
      isReady: () => boolean;
      getVersion: () => string;
      open: () => void;
      close: () => void;
    };
  }
}

export default function ChatWidgetPlugin() {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Set the configuration on window object FIRST (required before loading the plugin)
    window.vinfotechChatConfig = {
      apiUrl: chatApiUrl.replace(/\/$/, ''), // Remove trailing slash
      userId: defaultUserId,
      teamId: defaultTeamId,

      theme: {
        primaryColor: '#00B46A',
        mode: theme, // Use theme from context (light/dark)
      },

      branding: {
        companyName: 'Vinfotech AI',
        showPoweredBy: true,
        poweredByText: 'Powered by Vinfotech AI',
        poweredByUrl: poweredByUrl,
      },

      behavior: {
        autoOpen: false,
        defaultState: 'collapsed',
        mobileFullscreen: true,
      },

      messages: {
        welcomeMessage: 'Hi there! How can I assist you today?',
        placeholderText: 'Ask a question...',
        errorMessage: 'Oops! Something went wrong. Please try again.',
        offlineMessage: 'You appear to be offline. Please check your connection.',
      },

      suggestions: {
        enabled: true,
        fallbackQuestions: [
          'What AI solutions does Vinfotech offer?',
          'How can AI improve my business operations?',
          'What industries do you specialize in?',
        ],
      },

      // Custom CSS to override font and typography (matches main website styles)
      customization: {
        css: `
          #vinfotech-chat-widget-root,
          #vinfotech-chat-widget-root *,
          #vinfotech-chat-widget-root .vw-prose,
          #vinfotech-chat-widget-root .vw-prose * {
            font-family: 'Helvetica', 'Arial', sans-serif !important;
          }
          
          /* Match message text sizing */
          #vinfotech-chat-widget-root .vw-prose p,
          #vinfotech-chat-widget-root .vw-text-base {
            font-size: 16px !important;
            line-height: 1.6 !important;
            font-weight: 400 !important;
          }
          
          /* Match suggestion text sizing - text-sm (0.875rem) */
          #vinfotech-chat-widget-root .vw-text-sm {
            font-size: 0.875rem !important;
            line-height: 1.5 !important;
          }
          
          /* Match font weights */
          #vinfotech-chat-widget-root .vw-font-bold {
            font-weight: 700 !important;
          }
          
          #vinfotech-chat-widget-root .vw-font-semibold {
            font-weight: 600 !important;
          }
          
          #vinfotech-chat-widget-root .vw-font-medium {
            font-weight: 500 !important;
          }
          
          #vinfotech-chat-widget-root .vw-font-normal {
            font-weight: 400 !important;
          }
        `,
      },
    };

    // Check if CSS is already loaded, if not load it
    const existingCss = document.querySelector(`link[href="${PLUGIN_CSS_URL}"]`);
    if (!existingCss) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = PLUGIN_CSS_URL;
      document.head.appendChild(link);
    }

    // Check if script is already loaded and widget is available
    const existingScript = document.querySelector(`script[src="${PLUGIN_URL}"]`);
    if (existingScript) {
      // If script already exists but widget not initialized, manually init
      if (window.VinfotechChatWidget && !window.VinfotechChatWidget.isReady()) {
        window.VinfotechChatWidget.init(window.vinfotechChatConfig);
      }
      return;
    }

    // Load the plugin script dynamically
    const script = document.createElement('script');
    script.type = 'module';
    script.src = PLUGIN_URL;
    document.body.appendChild(script);

    // Poll for the widget to become available (ES modules execute asynchronously)
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max
    const pollInterval = setInterval(() => {
      attempts++;
      
      if (window.VinfotechChatWidget) {
        clearInterval(pollInterval);
        // Widget is available, check if it needs initialization
        if (!window.VinfotechChatWidget.isReady() && window.vinfotechChatConfig) {
          window.VinfotechChatWidget.init(window.vinfotechChatConfig);
        }
      } else if (attempts >= maxAttempts) {
        clearInterval(pollInterval);
        console.error('VinfotechChatWidget failed to load after 5 seconds');
      }
    }, 100);

    // Cleanup on unmount
    return () => {
      // Clear the polling interval
      clearInterval(pollInterval);
      // Destroy the widget if it exists
      if (window.VinfotechChatWidget?.isReady()) {
        window.VinfotechChatWidget.destroy();
      }
      // Remove the script
      const scriptToRemove = document.querySelector(`script[src="${PLUGIN_URL}"]`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      // Remove the CSS
      const cssToRemove = document.querySelector(`link[href="${PLUGIN_CSS_URL}"]`);
      if (cssToRemove) {
        cssToRemove.remove();
      }
      // Clean up config
      delete window.vinfotechChatConfig;
    };
  }, [theme]); // Re-initialize when theme changes

  // This component doesn't render anything - the plugin handles its own rendering
  return null;
}
