import type { ChatMessage } from './types';

interface StoredChatHistory {
  messages: ChatMessage[];
  suggestions: string[];
  feedback: Record<number, 'positive' | 'negative'>;
  expiresAt: number;
}

export class ChatStorage {
  private storagePrefix: string;
  private ttlMs: number;
  private useLocalStorage: boolean;

  constructor(storagePrefix: string = 'vinfotech_chat_', ttlMinutes: number = 60, useLocalStorage: boolean = true) {
    this.storagePrefix = storagePrefix;
    this.ttlMs = ttlMinutes * 60 * 1000;
    this.useLocalStorage = useLocalStorage;
  }

  private getHistoryKey(sessionId: string): string {
    return `${this.storagePrefix}history_${sessionId}`;
  }

  private getStorage(): Storage | null {
    if (typeof window === 'undefined') return null;
    return this.useLocalStorage ? localStorage : sessionStorage;
  }

  loadChatHistory(sessionId: string): {
    messages: ChatMessage[];
    suggestions: string[];
    feedback: Record<number, 'positive' | 'negative'>;
  } {
    const emptyState = {
      messages: [],
      suggestions: [],
      feedback: {}
    };

    const storage = this.getStorage();
    if (!storage || !sessionId) {
      return emptyState;
    }

    try {
      const storedValue = storage.getItem(this.getHistoryKey(sessionId));
      if (!storedValue) {
        return emptyState;
      }

      const parsed = JSON.parse(storedValue) as StoredChatHistory;
      if (!parsed || typeof parsed.expiresAt !== 'number') {
        storage.removeItem(this.getHistoryKey(sessionId));
        return emptyState;
      }

      if (Date.now() > parsed.expiresAt) {
        storage.removeItem(this.getHistoryKey(sessionId));
        return emptyState;
      }

      return {
        messages: Array.isArray(parsed.messages) ? parsed.messages : [],
        suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
        feedback: parsed.feedback && typeof parsed.feedback === 'object' ? parsed.feedback : {}
      };
    } catch (error) {
      console.error('Failed to load chat history from cache:', error);
      return emptyState;
    }
  }

  saveChatHistory(sessionId: string, state: {
    messages: ChatMessage[];
    suggestions: string[];
    feedback: Record<number, 'positive' | 'negative'>;
  }): void {
    const storage = this.getStorage();
    if (!storage || !sessionId) {
      return;
    }

    const storageKey = this.getHistoryKey(sessionId);

    if (!state.messages.length && !state.suggestions.length) {
      storage.removeItem(storageKey);
      return;
    }

    const payload: StoredChatHistory = {
      messages: [...state.messages],
      suggestions: [...state.suggestions],
      feedback: { ...state.feedback },
      expiresAt: Date.now() + this.ttlMs
    };

    try {
      storage.setItem(storageKey, JSON.stringify(payload));
    } catch (error) {
      console.error('Failed to cache chat history:', error);
    }
  }

  clearChatHistory(sessionId: string): void {
    const storage = this.getStorage();
    if (!storage || !sessionId) {
      return;
    }
    storage.removeItem(this.getHistoryKey(sessionId));
  }
}
