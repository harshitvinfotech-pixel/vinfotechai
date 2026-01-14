/**
 * Contact API Service
 * Handles sending contact form submissions to backend API for email notifications
 */

const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL || import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8000/api';

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  phone_number: string;
  company?: string;
  project_description: string;
  country_code?: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Submit contact form data to the backend API
 * This will trigger thank you email sending to the customer
 * and notification email to the admin
 */
export async function submitContactToApi(
  payload: ContactSubmissionPayload
): Promise<ContactSubmissionResponse> {
  try {
    const apiUrl = contactApiUrl.replace(/\/$/, '');
    
    console.log('Submitting to email API:', `${apiUrl}/contact/submit`);

    const response = await fetch(`${apiUrl}/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    let result: any;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      const text = await response.text();
      result = { message: text };
    }

    if (!response.ok) {
      console.error('Email API error:', result);
      return {
        success: false,
        error: result.message || result.error || `HTTP error! status: ${response.status}`
      };
    }

    console.log('Email API response:', result);

    return {
      success: true,
      message: result.message || 'Thank you for contacting us!'
    };
  } catch (error) {
    console.error('Email API network error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}
