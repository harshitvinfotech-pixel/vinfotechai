/**
 * Contact API Service
 * Handles sending contact form submissions to Vinfotech enquiry system
 */

const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL || 'https://www.vinfotech.com';
const formSubmissionType = import.meta.env.VITE_CONTACT_FORM_TYPE || '20';

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
  sid?: number;
}

/**
 * Submit contact form data to Vinfotech enquiry system
 * This will trigger thank you email sending to the customer
 * and notification to the Vinfotech team
 */
export async function submitContactToApi(
  payload: ContactSubmissionPayload
): Promise<ContactSubmissionResponse> {
  try {
    const apiUrl = contactApiUrl.replace(/\/$/, '');
    
    // Prepare form data in application/x-www-form-urlencoded format
    const formData = new URLSearchParams();
    formData.append('name', payload.name);
    formData.append('email', payload.email);
    formData.append('phoneNo', payload.phone_number);
    formData.append('message', payload.project_description);
    formData.append('page_url', window.location.href);
    formData.append('form_submission_type', formSubmissionType);
    
    // Add company as part of message if provided
    if (payload.company) {
      const messageWithCompany = `Company: ${payload.company}\n\n${payload.project_description}`;
      formData.set('message', messageWithCompany);
    }
    
    console.log('Submitting to Vinfotech enquiry API:', `${apiUrl}/action/add_enquiry`);

    const response = await fetch(`${apiUrl}/action/add_enquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });

    const result = await response.json();
    
    console.log('Vinfotech API response:', result);

    // Check API response format
    if (result.message === 'success') {
      return {
        success: true,
        message: 'Thank you for contacting us! We will be in touch shortly.',
        sid: result.sid
      };
    } else if (result.message === 'fail' && result.errors) {
      // Handle validation errors
      const errorMessages = Object.values(result.errors).join(', ');
      return {
        success: false,
        error: errorMessages
      };
    } else {
      return {
        success: false,
        error: result.message || 'Submission failed. Please try again.'
      };
    }
  } catch (error) {
    console.error('Email API network error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred'
    };
  }
}
