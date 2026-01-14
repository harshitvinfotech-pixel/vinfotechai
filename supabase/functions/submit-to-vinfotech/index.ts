// Supabase Edge Function to proxy Vinfotech API requests
// Deploy with: supabase functions deploy submit-to-vinfotech

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const { name, email, phoneNo, message, budget } = await req.json();

    // Get timezone from request or use default
    const timeZone = 'GMT+0530 (Asia/Kolkata)';
    const pageUrl = req.headers.get('referer') || 'https://ai.vinfotech.com';

    // Prepare form data
    const formData = new URLSearchParams({
      name,
      email,
      phoneNo,
      message,
      budget: budget || '',
      ispopup: 'yes',
      page_url: pageUrl,
      form_submission_type: '20',
      timeZone,
    });

    console.log('Submitting to Vinfotech API:', Object.fromEntries(formData));

    // Call Vinfotech API
    const response = await fetch('https://www.vinfotech.com/action/add_enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData.toString(),
    });

    const result = await response.json();
    console.log('Vinfotech API response:', result);

    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: response.status,
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 500,
    });
  }
});
