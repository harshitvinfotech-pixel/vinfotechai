import { useState, FormEvent } from 'react';
import { submitQuote, QuoteSubmission } from '../lib/supabase';
import { AlertCircle, Loader2 } from 'lucide-react';
import { validateProjectDescription, getCharacterCount, getRemainingCharacters } from '../lib/validation';
import CountryCodeSelect from './CountryCodeSelect';

interface QuoteFormProps {
  onShowSuccessConfirmation: () => void;
}

const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
  { code: '+44', country: 'UK', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
  { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
  { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
  { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE' },
  { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
  { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea' },
  { code: '+39', country: 'IT', flag: '🇮🇹', name: 'Italy' },
  { code: '+34', country: 'ES', flag: '🇪🇸', name: 'Spain' },
  { code: '+52', country: 'MX', flag: '🇲🇽', name: 'Mexico' },
  { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brazil' },
  { code: '+27', country: 'ZA', flag: '🇿🇦', name: 'South Africa' },
  { code: '+20', country: 'EG', flag: '🇪🇬', name: 'Egypt' },
  { code: '+234', country: 'NG', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+254', country: 'KE', flag: '🇰🇪', name: 'Kenya' },
  { code: '+62', country: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+60', country: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore' },
  { code: '+66', country: 'TH', flag: '🇹🇭', name: 'Thailand' },
  { code: '+84', country: 'VN', flag: '🇻🇳', name: 'Vietnam' },
  { code: '+63', country: 'PH', flag: '🇵🇭', name: 'Philippines' },
  { code: '+92', country: 'PK', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+880', country: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+94', country: 'LK', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+977', country: 'NP', flag: '🇳🇵', name: 'Nepal' },
  { code: '+90', country: 'TR', flag: '🇹🇷', name: 'Turkey' },
  { code: '+98', country: 'IR', flag: '🇮🇷', name: 'Iran' },
  { code: '+972', country: 'IL', flag: '🇮🇱', name: 'Israel' },
  { code: '+31', country: 'NL', flag: '🇳🇱', name: 'Netherlands' },
  { code: '+32', country: 'BE', flag: '🇧🇪', name: 'Belgium' },
  { code: '+41', country: 'CH', flag: '🇨🇭', name: 'Switzerland' },
  { code: '+43', country: 'AT', flag: '🇦🇹', name: 'Austria' },
  { code: '+46', country: 'SE', flag: '🇸🇪', name: 'Sweden' },
  { code: '+47', country: 'NO', flag: '🇳🇴', name: 'Norway' },
  { code: '+45', country: 'DK', flag: '🇩🇰', name: 'Denmark' },
  { code: '+358', country: 'FI', flag: '🇫🇮', name: 'Finland' },
  { code: '+48', country: 'PL', flag: '🇵🇱', name: 'Poland' },
  { code: '+351', country: 'PT', flag: '🇵🇹', name: 'Portugal' },
  { code: '+30', country: 'GR', flag: '🇬🇷', name: 'Greece' },
  { code: '+64', country: 'NZ', flag: '🇳🇿', name: 'New Zealand' },
  { code: '+54', country: 'AR', flag: '🇦🇷', name: 'Argentina' },
  { code: '+56', country: 'CL', flag: '🇨🇱', name: 'Chile' },
  { code: '+57', country: 'CO', flag: '🇨🇴', name: 'Colombia' },
  { code: '+51', country: 'PE', flag: '🇵🇪', name: 'Peru' },
  { code: '+593', country: 'EC', flag: '🇪🇨', name: 'Ecuador' },
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
    <div className="overflow-y-auto px-1">
      <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
        We'd love to build something amazing together. Share your project details and we'll get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2.5 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-200"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2.5 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-200"
            placeholder="john@company.com"
          />
        </div>

        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Phone Number *
          </label>
          <div className="flex gap-2">
            <CountryCodeSelect
              value={selectedCountryCode}
              onChange={setSelectedCountryCode}
              countryCodes={countryCodes}
            />
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 px-3 py-2.5 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-200"
              placeholder="555 123 4567"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2.5 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-200"
            placeholder="Company name"
          />
        </div>

        <div>
          <label htmlFor="project_description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Project Description *
          </label>
          <textarea
            id="project_description"
            name="project_description"
            required
            rows={4}
            value={formData.project_description}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 text-base border ${descriptionError ? 'border-red-400 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 ${descriptionError ? 'focus:ring-red-400' : 'focus:ring-brand-primary'} focus:border-transparent outline-none transition-all resize-none`}
            placeholder="Tell us about your project, goals, and requirements..."
          />
          <div className="mt-1.5 flex items-center justify-between">
            <div className="text-sm">
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
            <span className={`text-sm font-medium ${charCount >= 30 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
              {charCount} / 30
            </span>
          </div>
        </div>

        {submitStatus === 'error' && (
          <div className="flex flex-col gap-2 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-400 dark:border-red-600 rounded-lg text-red-900 dark:text-red-200 animate-slide-down">
            <div className="flex items-start gap-2.5">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center">
                <AlertCircle size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-base">Submission Failed</p>
                <p className="text-sm mt-0.5 text-red-700 dark:text-red-300">{errorMessage}</p>
              </div>
            </div>
            <p className="text-xs ml-10 text-red-600 dark:text-red-400">
              Please check your internet connection and try again. If the problem persists, contact us directly.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#00B46A] text-white px-5 py-2.5 rounded-lg text-base font-semibold hover:bg-[#009955] hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
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
