import type { ChatWidgetConfig } from './types';
import { DEFAULT_CONFIG } from './types';

export function mergeConfig(userConfig: Partial<ChatWidgetConfig>): ChatWidgetConfig {
  return {
    apiUrl: userConfig.apiUrl || '',
    userId: userConfig.userId || 'default_user',
    teamId: userConfig.teamId || 'default_team',
    theme: {
      ...DEFAULT_CONFIG.theme,
      ...userConfig.theme
    },
    branding: {
      ...DEFAULT_CONFIG.branding,
      ...userConfig.branding
    },
    behavior: {
      ...DEFAULT_CONFIG.behavior,
      ...userConfig.behavior
    },
    messages: {
      ...DEFAULT_CONFIG.messages,
      ...userConfig.messages
    },
    suggestions: {
      ...DEFAULT_CONFIG.suggestions,
      ...userConfig.suggestions
    },
    privacy: {
      ...DEFAULT_CONFIG.privacy,
      ...userConfig.privacy
    },
    customization: userConfig.customization,
    callbacks: userConfig.callbacks,
    analytics: {
      ...DEFAULT_CONFIG.analytics,
      ...userConfig.analytics
    }
  } as ChatWidgetConfig;
}

export function detectTheme(mode?: 'light' | 'dark' | 'auto'): 'light' | 'dark' {
  if (mode === 'light' || mode === 'dark') {
    return mode;
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'light';
}

export function getSessionId(storageKey: string = 'vinfotech_chat_session'): string {
  if (typeof window === 'undefined') {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  let sessionId = sessionStorage.getItem(storageKey);

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    sessionStorage.setItem(storageKey, sessionId);
  }

  return sessionId;
}

export function validateConfig(config: Partial<ChatWidgetConfig>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.apiUrl) {
    errors.push('apiUrl is required');
  }

  if (config.apiUrl && !isValidUrl(config.apiUrl)) {
    errors.push('apiUrl must be a valid URL');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
}

export function injectStyles(css: string, id: string = 'vinfotech-widget-custom-styles') {
  if (typeof document === 'undefined') return;

  let styleEl = document.getElementById(id) as HTMLStyleElement;

  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = id;
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = css;
}

export function removeStyles(id: string = 'vinfotech-widget-custom-styles') {
  if (typeof document === 'undefined') return;

  const styleEl = document.getElementById(id);
  if (styleEl) {
    styleEl.remove();
  }
}
