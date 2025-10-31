const chatApiUrl = import.meta.env.VITE_CHAT_API_URL || 'https://api.example.com';
const defaultUserId = import.meta.env.VITE_CHAT_DEFAULT_USER_ID || 'default_user';
const defaultTeamId = import.meta.env.VITE_CHAT_DEFAULT_TEAM_ID || 'default_team';

export interface StreamEventHandlers {
  onResponseChunk?: (content: string) => void;
  onCompleteResponse?: (content: string) => void;
  onSuggestedQuestions?: (questions: string[]) => void;
  onSources?: (sources: SourceDocument[]) => void;
  onMetadata?: (metadata: ResponseMetadata) => void;
  onDone?: () => void;
  onError?: (error: string) => void;
}

export interface SourceDocument {
  title: string;
  url: string;
  relevance: number;
}

export interface ResponseMetadata {
  processing_time?: number;
  tokens_used?: number;
  model?: string;
}

export interface StreamQueryRequest {
  user_id: string;
  team_id: string;
  session_id: string;
  question: string;
  top_k?: number;
}

export interface StreamEventData {
  type: 'response_chunk' | 'complete_response' | 'suggested_questions' | 'sources' | 'metadata' | 'done' | 'error';
  content?: any;
}

export async function streamQuery(
  sessionId: string,
  question: string,
  handlers: StreamEventHandlers,
  userId: string = defaultUserId,
  teamId: string = defaultTeamId
): Promise<void> {
  const requestPayload: StreamQueryRequest = {
    user_id: userId,
    team_id: teamId,
    session_id: sessionId,
    question: question
  };

  const response = await fetch(`${chatApiUrl}/chat/query/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestPayload)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (!response.body) {
    throw new Error('Response body is null');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonString = line.substring(6).trim();

          if (!jsonString) continue;

          try {
            const data: StreamEventData = JSON.parse(jsonString);

            switch (data.type) {
              case 'response_chunk':
                if (handlers.onResponseChunk && typeof data.content === 'string') {
                  handlers.onResponseChunk(data.content);
                }
                break;

              case 'complete_response':
                if (handlers.onCompleteResponse && typeof data.content === 'string') {
                  handlers.onCompleteResponse(data.content);
                }
                break;

              case 'suggested_questions':
                if (handlers.onSuggestedQuestions && Array.isArray(data.content)) {
                  handlers.onSuggestedQuestions(data.content);
                }
                break;

              case 'sources':
                if (handlers.onSources && Array.isArray(data.content)) {
                  handlers.onSources(data.content);
                }
                break;

              case 'metadata':
                if (handlers.onMetadata && typeof data.content === 'object') {
                  handlers.onMetadata(data.content);
                }
                break;

              case 'done':
                if (handlers.onDone) {
                  handlers.onDone();
                }
                break;

              case 'error':
                if (handlers.onError && typeof data.content === 'string') {
                  handlers.onError(data.content);
                }
                break;

              default:
                console.warn('Unknown event type:', data.type);
            }
          } catch (parseError) {
            console.error('Error parsing SSE data:', parseError, 'Raw data:', jsonString);
          }
        }
      }
    }

    if (buffer.trim() && buffer.startsWith('data: ')) {
      const jsonString = buffer.substring(6).trim();
      try {
        const data: StreamEventData = JSON.parse(jsonString);
        if (data.type === 'done' && handlers.onDone) {
          handlers.onDone();
        }
      } catch (parseError) {
        console.error('Error parsing final buffer:', parseError);
      }
    }
  } catch (error) {
    if (handlers.onError) {
      handlers.onError(error instanceof Error ? error.message : 'Unknown streaming error');
    }
    throw error;
  }
}

export function getDefaultUserId(): string {
  return defaultUserId;
}

export function getDefaultTeamId(): string {
  return defaultTeamId;
}
