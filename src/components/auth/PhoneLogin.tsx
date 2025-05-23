import React, { useState, useRef, useEffect, Component } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { clearRecaptchaVerifier } from '../../services/firebase';
import { User, RecaptchaVerifier, getAuth } from 'firebase/auth';

// Error Boundary Component
class PhoneInputErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Phone Input Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error in phone number input
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{this.state.error?.message || 'An unexpected error occurred. Please try again.'}</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => this.setState({ hasError: false, error: null })}
                  className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// List of countries and dial codes
const countries = [
  { name: 'India', code: '+91' },
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'Canada', code: '+1' },
  { name: 'Australia', code: '+61' },
  { name: 'Germany', code: '+49' },
  { name: 'France', code: '+33' },
  { name: 'Pakistan', code: '+92' },
  { name: 'Bangladesh', code: '+880' },
  { name: 'Nepal', code: '+977' },
  { name: 'China', code: '+86' },
  { name: 'Japan', code: '+81' },
  { name: 'South Africa', code: '+27' },
  { name: 'Brazil', code: '+55' },
  { name: 'Russia', code: '+7' },
  { name: 'UAE', code: '+971' },
  { name: 'Singapore', code: '+65' },
  { name: 'Sri Lanka', code: '+94' },
  { name: 'Afghanistan', code: '+93' },
  { name: 'Saudi Arabia', code: '+966' },
];

interface PhoneLoginProps {
  onSuccess?: (user: User) => void;
  onError?: (error: string) => void;
  isLoading?: boolean;
  setIsLoading?: (loading: boolean) => void;
}

declare global {
  interface Window {
    recaptchaVerifier?: any;
    recaptchaWidgetId?: any;
  }
}

const PhoneLogin: React.FC<PhoneLoginProps> = ({ 
  onSuccess, 
  onError,
  isLoading = false,
  setIsLoading
}) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { phoneLogin, verifyPhoneCode } = useAuth();
  const auth = getAuth();
  const recaptchaContainerId = 'recaptcha-container';

  useEffect(() => {
    // Create a container for reCAPTCHA if it doesn't exist
    let container = document.getElementById(recaptchaContainerId);
    if (!container) {
      container = document.createElement('div');
      container.id = recaptchaContainerId;
      container.className = 'flex justify-center my-4';
      document.getElementById('phone-form')?.appendChild(container);
    }

    // Cleanup function
    return () => {
      if (window.recaptchaVerifier) {
        clearRecaptchaVerifier(recaptchaContainerId);
      }
      container?.remove();
    };
  }, [isVerifying]);

  const validatePhoneNumber = (number: string) => {
    const cleanedNumber = number.replace(/^0+/, '').replace(/\s+/g, '');
    if (!cleanedNumber) {
      throw new Error('Phone number is required');
    }
    if (!/^\d+$/.test(cleanedNumber)) {
      throw new Error('Phone number should contain only digits');
    }
    if (cleanedNumber.length < 9 || cleanedNumber.length > 15) {
      throw new Error('Phone number should be between 9 and 15 digits');
    }
    return cleanedNumber;
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    try {
      validatePhoneNumber(value);
      setPhoneError(null);
    } catch (error: any) {
      setPhoneError(error.message);
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading?.(true);
    
    try {
      const cleanedNumber = validatePhoneNumber(phoneNumber);
      const fullPhone = `${selectedCountry.code}${cleanedNumber}`;
      
      const result = await phoneLogin(fullPhone, recaptchaContainerId);
      if (result.error) {
        onError?.(result.error);
      } else {
        setConfirmationResult(result.confirmationResult);
        setIsVerifying(true);
      }
    } catch (error: any) {
      onError?.(error.message || 'An error occurred. Please try again.');
      if (window.recaptchaVerifier) {
        clearRecaptchaVerifier(recaptchaContainerId);
      }
    } finally {
      setIsLoading?.(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading?.(true);
    try {
      const result = await verifyPhoneCode(confirmationResult, verificationCode);
      if (result.error) {
        onError?.(result.error);
      } else if (result.user) {
        onSuccess?.(result.user);
      }
    } catch (error: any) {
      onError?.(error.message);
    } finally {
      setIsLoading?.(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!isVerifying ? (
        <form id="phone-form" onSubmit={handleSendCode} className="space-y-6">
          <PhoneInputErrorBoundary>
            <div className="transform transition duration-300 ease-in-out hover:translate-y-[-2px]">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="flex gap-2">
                <select
                  className="appearance-none relative block w-36 px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-in-out"
                  value={selectedCountry.code}
                  onChange={e => {
                    const country = countries.find(c => c.code === e.target.value);
                    if (country) setSelectedCountry(country);
                  }}
                  disabled={isLoading}
                >
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
                <div className="flex-1">
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter phone number"
                    className={`appearance-none relative block w-full px-4 py-3 border ${
                      phoneError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                    } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ease-in-out`}
                    required
                    disabled={isLoading}
                  />
                  {phoneError && (
                    <p className="mt-2 text-sm text-red-600">
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </PhoneInputErrorBoundary>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-70 active:translate-y-[1px]"
            disabled={isLoading || !!phoneError}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Code...
              </span>
            ) : (
              "Send Verification Code"
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div className="transform transition duration-300 ease-in-out hover:translate-y-[-2px]">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={verificationCode}
              onChange={e => setVerificationCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-in-out"
              required
              disabled={isLoading}
              maxLength={6}
              pattern="[0-9]{6}"
            />
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-70 active:translate-y-[1px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify Code"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default PhoneLogin; 