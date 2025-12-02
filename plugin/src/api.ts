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

export interface StreamEventData {
  type: 'response_chunk' | 'complete_response' | 'suggested_questions' | 'sources' | 'metadata' | 'contact_form' | 'done' | 'error';
  content?: any;
}

export class ChatAPI {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl.replace(/\/$/, '');
  }

  async streamQuery(
    sessionId: string,
    question: string,
    handlers: StreamEventHandlers,
    userId: string,
    teamId: string,
    queryType?: number,
    currentPage?: string
  ): Promise<void> {
    const requestPayload = {
      user_id: userId,
      team_id: teamId,
      session_id: sessionId,
      question: question,
      ...(queryType !== undefined && { query_type: queryType }),
      ...(currentPage && { current_page: currentPage })
    };

    const response = await fetch(`${this.apiUrl}/chat/query/stream`, {
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
              }
            } catch (parseError) {
              console.error('Error parsing SSE data:', parseError);
            }
          }
        }
      }
    } catch (error) {
      if (handlers.onError) {
        handlers.onError(error instanceof Error ? error.message : 'Unknown streaming error');
      }
      throw error;
    }
  }

  async fetchInitialSuggestions(userId: string, teamId: string): Promise<string[]> {
    try {
      const url = new URL(`${this.apiUrl}/chat/suggestions`);
      url.searchParams.append('user_id', userId);
      url.searchParams.append('team_id', teamId);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.suggestions || [];
    } catch (error) {
      console.error('Error fetching initial suggestions:', error);
      return [];
    }
  }

  async submitChatFeedback(sessionId: string, feedback: 0 | 1): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/chat/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session_id: sessionId,
          feedback
        })
      });

      const result = await response.json();
      return result.status === 'success';
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return false;
    }
  }

  async submitContactForm(payload: {
    user_id: string;
    team_id: string;
    session_id: string;
    user_query: string;
    contact_data: Record<string, string>;
  }): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const response = await fetch(`${this.apiUrl}/chat/contact-submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success === true || result.status === 'success') {
        return {
          success: true,
          message: result.data?.message || result.message || 'Thank you for reaching out! Our team will contact you shortly.'
        };
      }

      return {
        success: false,
        error: result.message || result.error || 'Submission failed'
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return {
        success: false,
        error: 'Network error occurred'
      };
    }
  }
}
