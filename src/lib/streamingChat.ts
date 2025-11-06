const chatApiUrl = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8001/api';
const defaultUserId = import.meta.env.VITE_CHAT_DEFAULT_USER_ID || 'default_user';
const defaultTeamId = import.meta.env.VITE_CHAT_DEFAULT_TEAM_ID || 'default_team';
const normalizedChatApiUrl = chatApiUrl.replace(/\/$/, '');

export interface StreamEventHandlers {
  onResponseChunk?: (content: string) => void;
  onCompleteResponse?: (content: string) => void;
  onSuggestedQuestions?: (questions: string[]) => void;
  onSources?: (sources: SourceDocument[]) => void;
  onMetadata?: (metadata: ResponseMetadata) => void;
  onDone?: () => void;
  onError?: (error: string) => void;
  onContactForm?: (contactForm: ContactFormPayload) => void;
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
  type: 'response_chunk' | 'complete_response' | 'suggested_questions' | 'sources' | 'metadata' | 'contact_form' | 'done' | 'error';
  content?: any;
}

export interface ContactFormField {
  field_name: string;
  field_label: string;
  field_type: 'text' | 'email' | 'tel' | 'textarea';
  required: boolean;
  placeholder?: string;
  order?: number;
}

export interface ContactFormPayload {
  message: string;
  original_query: string;
  fields: ContactFormField[];
}

interface ChatApiSuccess<T> {
  status: 'success';
  data: T;
}

interface ChatApiError {
  status: 'error';
  message: string;
  error_code?: string;
}

type ChatApiResponse<T> = ChatApiSuccess<T> | ChatApiError;

interface FeedbackApiData {
  saved: boolean;
  feedback: number;
  message?: string;
}

interface ContactSubmissionData {
  submitted: boolean;
  submission_id?: string;
  message?: string;
}

async function postToChatApi<T>(path: string, body: unknown): Promise<ChatApiResponse<T>> {
  try {
    const response = await fetch(`${normalizedChatApiUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    return result as ChatApiResponse<T>;
  } catch (error) {
    console.error(`Error calling ${path}:`, error);
    throw error;
  }
}

export async function submitChatFeedback(sessionId: string, feedback: 0 | 1) {
  const result = await postToChatApi<FeedbackApiData>('/chat/feedback', {
    session_id: sessionId,
    feedback
  });

  if (result.status === 'success') {
    return {
      success: true,
      data: result.data
    };
  }

  return {
    success: false,
    error: result.message,
    errorCode: result.error_code
  };
}

export interface ContactFormSubmissionPayload {
  user_id: string;
  team_id: string;
  session_id: string;
  user_query: string;
  contact_data: Record<string, string>;
}

export async function submitContactForm(payload: ContactFormSubmissionPayload) {
  try {
    const response = await fetch(`${normalizedChatApiUrl}/chat/contact-submission`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    // Check for success in the direct response format (not wrapped in status)
    if (result.success === true || result.status === 'success') {
      return {
        success: true,
        data: {
          ...result.data,
          message: result.data?.message || result.message || '✅ Thank you for reaching out! Your details have been submitted successfully. Our team will contact you shortly at the email/phone you provided. Is there anything else I can help you with?'
        }
      };
    }

    return {
      success: false,
      error: result.message || result.error || 'Submission failed',
      errorCode: result.error_code
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      error: 'Network error occurred'
    };
  }
}

export async function streamQuery(
  sessionId: string,
  question: string,
  handlers: StreamEventHandlers,
  userId: string = defaultUserId,
  teamId: string = defaultTeamId
): Promise<void> {
  console.log('🚀 streamQuery called for question:', question.substring(0, 50));
  
  const requestPayload: StreamQueryRequest = {
    user_id: userId,
    team_id: teamId,
    session_id: sessionId,
    question: question
  };

  const response = await fetch(`${normalizedChatApiUrl}/chat/query/stream`, {
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
  let chunkCount = 0;

  console.log('📡 Starting to read stream...');

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
                  chunkCount++;
                  console.log(`📦 Chunk #${chunkCount}:`, JSON.stringify(data.content));
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

              case 'contact_form':
                if (handlers.onContactForm && typeof data.content === 'object') {
                  handlers.onContactForm(data.content as ContactFormPayload);
                }
                await reader.cancel();
                return;

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
