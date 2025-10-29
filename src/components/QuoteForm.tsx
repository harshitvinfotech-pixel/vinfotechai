import { useState, FormEvent } from 'react';
import { submitQuote, QuoteSubmission } from '../lib/supabase';
import { AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { validateProjectDescription, getCharacterCount, getRemainingCharacters } from '../lib/validation';

interface QuoteFormProps {
  onShowSuccessConfirmation: () => void;
}

const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+971', country: 'AE', flag: '🇦🇪' },
  { code: '+966', country: 'SA', flag: '🇸🇦' },
];

export default function QuoteForm({ onShowSuccessConfirmation }: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteSubmission>({
    name: '',
    email: '',
    phone_number: '',
    company: '',
    project_description: '',
  });

  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    setDescriptionError('');

    const validation = validateProjectDescription(formData.project_description);
    if (!validation.isValid) {
      setDescriptionError(validation.error || 'Invalid project description');
      setIsSubmitting(false);
      return;
    }

    try {
      const submissionData = {
        ...formData,
        phone_number: `${selectedCountryCode}${phoneNumber}`,
      };

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
      setPhoneNumber('');
      setSelectedCountryCode('+1');
      setCharCount(0);

      onShowSuccessConfirmation();
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'project_description') {
      setCharCount(getCharacterCount(value));
      if (descriptionError) {
        const validation = validateProjectDescription(value);
        if (validation.isValid) {
          setDescriptionError('');
        }
      }
    }
  };

  return (
    <div>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        We'd love to build something amazing together. Share your project details and we'll get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
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
          <label htmlFor="email" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
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
          <label htmlFor="phone_number" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Phone Number *
          </label>
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                className="appearance-none h-full px-3 py-3 pr-8 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-300 hover:border-brand-primary/50 cursor-pointer"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none"
              />
            </div>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-300 hover:border-brand-primary/50"
              placeholder="555 123 4567"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-300 hover:border-brand-primary/50"
            placeholder="Company name"
          />
        </div>

        <div>
          <label htmlFor="project_description" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Project Description *
          </label>
          <textarea
            id="project_description"
            name="project_description"
            required
            rows={4}
            value={formData.project_description}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${descriptionError ? 'border-red-400 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 ${descriptionError ? 'focus:ring-red-400' : 'focus:ring-brand-primary'} focus:border-transparent outline-none transition-all resize-none`}
            placeholder="Tell us about your project, goals, and requirements..."
          />
          <div className="mt-2 flex items-center justify-between">
            <div className="text-base">
              {descriptionError ? (
                <span className="text-red-600 dark:text-red-400 font-medium">{descriptionError}</span>
              ) : (
                <span className={`${charCount >= 30 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {charCount >= 30 ? (
                    <span className="flex items-center gap-1">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      Meets minimum requirement
                    </span>
                  ) : (
                    `${getRemainingCharacters(formData.project_description)} more characters needed`
                  )}
                </span>
              )}
            </div>
            <span className={`text-base font-medium ${charCount >= 30 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
              {charCount} / 30
            </span>
          </div>
        </div>

        {submitStatus === 'error' && (
          <div className="flex flex-col gap-2 p-5 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-400 dark:border-red-600 rounded-xl text-red-900 dark:text-red-200 shadow-lg animate-slide-down">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center">
                <AlertCircle size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-xl">Submission Failed</p>
                <p className="text-base mt-1 text-red-700 dark:text-red-300">{errorMessage}</p>
              </div>
            </div>
            <p className="text-sm ml-13 text-red-600 dark:text-red-400">
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
