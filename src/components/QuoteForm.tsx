import { useState, FormEvent } from 'react';
import { submitQuote, QuoteSubmission } from '../lib/supabase';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface QuoteFormProps {
  onSuccess: () => void;
}

export default function QuoteForm({ onSuccess }: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteSubmission>({
    name: '',
    email: '',
    phone_number: '',
    company: '',
    project_description: '',
  });


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const submissionData = formData;

      console.log('Submitting quote:', submissionData);

      const result = await submitQuote(submissionData);
      console.log('Quote submitted successfully:', result);

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone_number: '',
        company: '',
        project_description: '',
      });

      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error) {
      console.error('Quote submission error:', error);
      setSubmitStatus('error');

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else if (typeof error === 'object' && error !== null) {
        const errObj = error as any;
        setErrorMessage(errObj.message || errObj.hint || 'Failed to submit quote request');
      } else {
        setErrorMessage('Failed to submit quote request. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        We'd love to build something amazing together. Share your project details and we'll get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-300 hover:border-brand-primary/50"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-300 hover:border-brand-primary/50"
            placeholder="john@company.com"
          />
        </div>

        <div>
          <label htmlFor="phone_number" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            required
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-300 hover:border-brand-primary/50"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-300 hover:border-brand-primary/50"
            placeholder="Acme Corporation"
          />
        </div>

        <div>
          <label htmlFor="project_description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Project Description *
          </label>
          <textarea
            id="project_description"
            name="project_description"
            required
            rows={4}
            value={formData.project_description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all resize-none"
            placeholder="Tell us about your project, goals, and challenges..."
          />
        </div>

        {submitStatus === 'success' && (
          <div className="flex flex-col gap-3 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-400 dark:border-green-600 rounded-xl text-green-900 dark:text-green-200 shadow-lg animate-slide-down">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center animate-bounce-subtle">
                <CheckCircle size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-xl">Request Submitted Successfully!</p>
                <p className="text-sm mt-1.5 text-green-800 dark:text-green-200">
                  Thank you for choosing Vinfotech! We've received your project details.
                </p>
              </div>
            </div>
            <div className="ml-15 space-y-2 text-sm text-green-800 dark:text-green-300">
              <p className="flex items-center gap-2">
                <CheckCircle size={16} className="flex-shrink-0" />
                <span>Our team will review your requirements carefully</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle size={16} className="flex-shrink-0" />
                <span>You'll receive a personalized response within 24 hours</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle size={16} className="flex-shrink-0" />
                <span>Check your email for confirmation</span>
              </p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="flex flex-col gap-2 p-5 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-400 dark:border-red-600 rounded-xl text-red-900 dark:text-red-200 shadow-lg animate-slide-down">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center">
                <AlertCircle size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">Submission Failed</p>
                <p className="text-sm mt-1 text-red-700 dark:text-red-300">{errorMessage}</p>
              </div>
            </div>
            <p className="text-xs ml-13 text-red-600 dark:text-red-400">
              Please check your internet connection and try again. If the problem persists, contact us directly.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#00B46A] text-white px-6 py-3.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00B46A]/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 active:scale-100"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Request'
          )}
        </button>
      </form>
    </div>
  );
}
