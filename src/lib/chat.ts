export interface SuggestedQuestion {
  id: string;
  question_text: string;
  category: string;
  display_order: number;
  is_active: boolean;
  click_count: number;
}

export interface ChatMessage {
  type: 'user' | 'assistant';
  text: string;
}

const parsedHistoryTtl = Number(import.meta.env.VITE_CHAT_HISTORY_TTL_MINUTES ?? '60');
const DEFAULT_CHAT_HISTORY_TTL_MINUTES = 60;
export const chatHistoryTtlMinutes =
  Number.isFinite(parsedHistoryTtl) && parsedHistoryTtl > 0
    ? parsedHistoryTtl
    : DEFAULT_CHAT_HISTORY_TTL_MINUTES;
export const chatHistoryTtlMs = chatHistoryTtlMinutes * 60 * 1000;
const CHAT_HISTORY_PREFIX = 'chat_history_';

interface StoredChatHistory {
  messages: ChatMessage[];
  suggestions: string[];
  feedback: Record<number, 'positive' | 'negative'>;
  expiresAt: number;
}

export function getSessionId(): string {
  let sessionId = sessionStorage.getItem('chat_session_id');

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    sessionStorage.setItem('chat_session_id', sessionId);
  }

  return sessionId;
}

function getHistoryKey(sessionId: string): string {
  return `${CHAT_HISTORY_PREFIX}${sessionId}`;
}

const EMPTY_CACHED_STATE = {
  messages: [] as ChatMessage[],
  suggestions: [] as string[],
  feedback: {} as Record<number, 'positive' | 'negative'>
};

function normalizeCachedState(rawState: Partial<StoredChatHistory> | null): typeof EMPTY_CACHED_STATE {
  if (!rawState) {
    return { ...EMPTY_CACHED_STATE };
  }

  const rawMessages = Array.isArray(rawState.messages) ? (rawState.messages as ChatMessage[]) : [];
  const rawSuggestions = Array.isArray(rawState.suggestions) ? (rawState.suggestions as string[]) : [];
  const rawFeedback = rawState.feedback && typeof rawState.feedback === 'object' ? rawState.feedback : {};

  return {
    messages: [...rawMessages],
    suggestions: [...rawSuggestions],
    feedback: { ...rawFeedback }
  };
}

export interface CachedChatState {
  messages: ChatMessage[];
  suggestions: string[];
  feedback: Record<number, 'positive' | 'negative'>;
}

export function loadChatHistory(sessionId: string): CachedChatState {
  if (typeof window === 'undefined') {
    return { ...EMPTY_CACHED_STATE };
  }
  if (!sessionId) {
    return { ...EMPTY_CACHED_STATE };
  }
  try {
    const storedValue = localStorage.getItem(getHistoryKey(sessionId));
    if (!storedValue) {
      return { ...EMPTY_CACHED_STATE };
    }

    const parsed = JSON.parse(storedValue) as Partial<StoredChatHistory>;
    if (!parsed || typeof parsed.expiresAt !== 'number') {
      localStorage.removeItem(getHistoryKey(sessionId));
      return { ...EMPTY_CACHED_STATE };
    }

    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(getHistoryKey(sessionId));
      return { ...EMPTY_CACHED_STATE };
    }

    return normalizeCachedState(parsed);
  } catch (error) {
    console.error('Failed to load chat history from cache:', error);
    return { ...EMPTY_CACHED_STATE };
  }
}

export function cacheChatHistory(sessionId: string, state: CachedChatState): void {
  if (typeof window === 'undefined') {
    return;
  }
  if (!sessionId) {
    return;
  }
  const storageKey = getHistoryKey(sessionId);

  if (!state.messages.length && !state.suggestions.length) {
    localStorage.removeItem(storageKey);
    return;
  }

  const payload: StoredChatHistory = {
    messages: [...state.messages],
    suggestions: [...state.suggestions],
    feedback: { ...state.feedback },
    expiresAt: Date.now() + chatHistoryTtlMs
  };

  try {
    localStorage.setItem(storageKey, JSON.stringify(payload));
  } catch (error) {
    console.error('Failed to cache chat history:', error);
  }
}

export function clearChatHistory(sessionId: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  if (!sessionId) {
    return;
  }
  localStorage.removeItem(getHistoryKey(sessionId));
}
