import { supabase } from './supabase';

export interface SuggestedQuestion {
  id: string;
  question_text: string;
  category: string;
  display_order: number;
  is_active: boolean;
  click_count: number;
}

export interface KnowledgeBaseEntry {
  id: string;
  keywords: string[];
  question_patterns: string[];
  response_text: string;
  category: string;
  priority: number;
}

export interface ChatMessage {
  type: 'user' | 'assistant';
  text: string;
}

export async function getSuggestedQuestions(): Promise<SuggestedQuestion[]> {
  const { data, error } = await supabase
    .from('suggested_questions')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching suggested questions:', error);
    return [];
  }

  return data || [];
}

export async function incrementQuestionClick(questionId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_question_clicks', { question_id: questionId });

  if (error) {
    console.error('Error incrementing click count:', error);
  }
}

export async function findResponse(question: string): Promise<string> {
  const { data: knowledgeBase, error } = await supabase
    .from('knowledge_base')
    .select('*')
    .eq('is_active', true)
    .order('priority', { ascending: false });

  if (error) {
    console.error('Error fetching knowledge base:', error);
    return getFallbackResponse();
  }

  if (!knowledgeBase || knowledgeBase.length === 0) {
    return getFallbackResponse();
  }

  const normalizedQuestion = question.toLowerCase().trim();

  for (const entry of knowledgeBase) {
    const matchesKeyword = entry.keywords.some((keyword: string) =>
      normalizedQuestion.includes(keyword.toLowerCase())
    );

    const matchesPattern = entry.question_patterns.some((pattern: string) =>
      normalizedQuestion.includes(pattern.toLowerCase())
    );

    if (matchesKeyword || matchesPattern) {
      return entry.response_text;
    }
  }

  return getFallbackResponse();
}

function getFallbackResponse(): string {
  return "Thank you for your question! I'd be happy to help you learn more about our services and solutions. For detailed information specific to your needs, please click 'Get a Quote' and our team will get back to you within 24 hours with a personalized response.";
}

export async function saveChatConversation(
  sessionId: string,
  userQuestion: string,
  assistantResponse: string,
  responseSource: 'knowledge_base' | 'fallback'
): Promise<void> {
  const { error } = await supabase
    .from('chat_conversations')
    .insert([{
      session_id: sessionId,
      user_question: userQuestion,
      assistant_response: assistantResponse,
      response_source: responseSource
    }]);

  if (error) {
    console.error('Error saving conversation:', error);
  }
}

export function getSessionId(): string {
  let sessionId = sessionStorage.getItem('chat_session_id');

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    sessionStorage.setItem('chat_session_id', sessionId);
  }

  return sessionId;
}
