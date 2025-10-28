import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface QuoteSubmission {
  name: string;
  email: string;
  phone_number: string;
  company?: string;
  project_description: string;
}

export async function submitQuote(data: QuoteSubmission) {
  const { data: result, error } = await supabase
    .from('quote_submissions')
    .insert([data])
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  return result;
}
