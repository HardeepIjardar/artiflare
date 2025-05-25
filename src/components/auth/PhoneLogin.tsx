import React, { useState, useRef, useEffect, Component } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { clearRecaptchaVerifier, setupRecaptcha } from '../../services/firebase';
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

interface VerificationResult {
  confirmationResult?: any;
  error: string | null;
  user?: User | null;
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
  const [recaptchaInitialized, setRecaptchaInitialized] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const { phoneLogin, verifyPhoneCode } = useAuth();
  const auth = getAuth();
  const recaptchaContainerId = 'recaptcha-container';
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Cleanup function
    return () => {
      if (window.recaptchaVerifier) {
        clearRecaptchaVerifier(recaptchaContainerId);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handlePhoneInputFocus = async () => {
    if (!recaptchaInitialized) {
      try {
        setRecaptchaError(null);
        
        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Create a container for reCAPTCHA if it doesn't exist
        let container = document.getElementById(recaptchaContainerId);
        if (!container) {
          container = document.createElement('div');
          container.id = recaptchaContainerId;
          container.className = 'flex justify-center my-4';
          document.getElementById('phone-form')?.appendChild(container);
        }

        // Set a timeout for reCAPTCHA initialization
        const initializationPromise = setupRecaptcha(recaptchaContainerId);
        const timeoutPromise = new Promise((_, reject) => {
          timeoutRef.current = setTimeout(() => {
            reject(new Error('reCAPTCHA initialization timed out'));
          }, 20000); // 20 seconds timeout
        });

        await Promise.race([initializationPromise, timeoutPromise]);
        setRecaptchaInitialized(true);

      } catch (error: any) {
        console.error('Error initializing reCAPTCHA:', error);
        setRecaptchaError(error.message);
        setRecaptchaInitialized(false);
        clearRecaptchaVerifier(recaptchaContainerId);
        
        if (error.message.includes('timeout')) {
          onError?.('reCAPTCHA initialization timed out. Please refresh the page and try again.');
        } else {
          onError?.('Failed to initialize phone verification. Please ensure you are using an authorized domain.');
        }
      } finally {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    }
  };

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
    setCodeSent(false);
    setRecaptchaError(null);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    try {
      const cleanedNumber = validatePhoneNumber(phoneNumber);
      const fullPhone = `${selectedCountry.code}${cleanedNumber}`;
      
      console.log('Sending verification code to:', fullPhone); // Debug log
      
      // Set a timeout for the phone verification
      const verificationPromise = phoneLogin(fullPhone, recaptchaContainerId);
      const timeoutPromise = new Promise<VerificationResult>((_, reject) => {
        timeoutRef.current = setTimeout(() => {
          reject(new Error('Phone verification request timed out'));
        }, 60000); // 60 seconds timeout
      });

      const result = await Promise.race([verificationPromise, timeoutPromise]) as VerificationResult;
      
      console.log('Verification result:', result); // Debug log
      
      if (result.error) {
        if (result.error.includes('auth/invalid-app-credential')) {
          setRecaptchaError('Domain not authorized. Please contact support or try again later.');
          onError?.('Domain not authorized for phone authentication. Please ensure you are using an authorized domain.');
        } else {
          onError?.(result.error);
        }
        // Reset states on error
        setIsVerifying(false);
        setCodeSent(false);
      } else if (result.confirmationResult) {
        // Successfully sent verification code
        console.log('Code sent successfully, updating states'); // Debug log
        setConfirmationResult(result.confirmationResult);
        setCodeSent(true);
        setIsVerifying(true);
        setRecaptchaError(null);
        // Clear any existing reCAPTCHA since we don't need it anymore
        clearRecaptchaVerifier(recaptchaContainerId);
      }
    } catch (error: any) {
      console.error('Send code error:', error);
      
      // Handle specific error cases
      let errorMessage = 'Failed to send verification code. Please try again.';
      
      if (error.message.includes('timeout')) {
        errorMessage = 'The request timed out. Please check your internet connection and try again.';
      } else if (error.code === 'auth/invalid-app-credential') {
        errorMessage = 'Domain not authorized. Please contact support or try again later.';
        setRecaptchaError('Domain not authorized. Please contact support or try again later.');
      } else if (error.code === 'auth/captcha-check-failed') {
        errorMessage = 'reCAPTCHA verification failed. Please try again.';
        setRecaptchaError('reCAPTCHA verification failed. Please try again.');
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.code === 'auth/invalid-phone-number') {
        errorMessage = 'Invalid phone number format. Please check the number and try again.';
      }
      
      onError?.(errorMessage);
      
      // Reset states on error
      setIsVerifying(false);
      setCodeSent(false);
      
      // Reset reCAPTCHA if there's an error
      clearRecaptchaVerifier(recaptchaContainerId);
      setRecaptchaInitialized(false);
      
    } finally {
      setIsLoading?.(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading?.(true);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    try {
      // Set a timeout for the verification
      const verificationPromise = verifyPhoneCode(confirmationResult, verificationCode);
      const timeoutPromise = new Promise<VerificationResult>((_, reject) => {
        timeoutRef.current = setTimeout(() => {
          reject(new Error('Code verification timed out'));
        }, 30000); // 30 seconds timeout
      });

      const result = await Promise.race([verificationPromise, timeoutPromise]) as VerificationResult;
      
      if (result.error) {
        onError?.(result.error);
      } else if (result.user) {
        onSuccess?.(result.user);
      }
    } catch (error: any) {
      let errorMessage = error.message;
      if (error.message.includes('timeout')) {
        errorMessage = 'The verification timed out. Please try again.';
      }
      onError?.(errorMessage);
    } finally {
      setIsLoading?.(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
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
                    onFocus={handlePhoneInputFocus}
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

          {recaptchaError && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    reCAPTCHA Error
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{recaptchaError}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-70 active:translate-y-[1px]"
            disabled={isLoading || !!phoneError || !recaptchaInitialized}
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
          {codeSent && (
            <div className="rounded-md bg-green-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Verification code sent to {selectedCountry.code}{phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          )}

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
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-70 active:translate-y-[1px]"
            disabled={isLoading || verificationCode.length !== 6}
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

          <button
            type="button"
            onClick={() => {
              setIsVerifying(false);
              setCodeSent(false);
              setVerificationCode('');
            }}
            className="w-full text-center text-sm text-primary hover:text-primary-700 transition-colors duration-300"
          >
            Try a different phone number
          </button>
        </form>
      )}
    </div>
  );
};

export default PhoneLogin; 