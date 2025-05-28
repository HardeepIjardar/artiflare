import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../../services/firebase';

interface PhoneAuthProps {
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
}

const PhoneAuth: React.FC<PhoneAuthProps> = ({ onSuccess, onError }) => {
  const { phoneLogin, verifyPhoneCode } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize reCAPTCHA verifier
    const initializeRecaptcha = () => {
      if (!recaptchaVerifierRef.current && recaptchaContainerRef.current) {
        try {
          // Clear any existing reCAPTCHA
          if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
          }

          // Create new reCAPTCHA verifier
          const verifier = new RecaptchaVerifier(recaptchaContainerRef.current, {
            size: 'normal',
            callback: () => {
              // reCAPTCHA solved, allow signInWithPhoneNumber
              setError(null);
            },
            'expired-callback': () => {
              // Reset reCAPTCHA
              setError('reCAPTCHA expired. Please try again.');
              if (recaptchaVerifierRef.current) {
                recaptchaVerifierRef.current.clear();
                recaptchaVerifierRef.current = null;
              }
            }
          }, auth);

          // Store verifier in both ref and window object
          recaptchaVerifierRef.current = verifier;
          window.recaptchaVerifier = verifier;
        } catch (err) {
          console.error('Error initializing reCAPTCHA:', err);
          setError('Failed to initialize reCAPTCHA. Please refresh the page.');
        }
      }
    };

    initializeRecaptcha();

    return () => {
      // Cleanup reCAPTCHA when component unmounts
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (err) {
          console.error('Error clearing reCAPTCHA:', err);
        }
        recaptchaVerifierRef.current = null;
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!recaptchaVerifierRef.current) {
        throw new Error('reCAPTCHA not initialized');
      }

      const result = await phoneLogin(phoneNumber, recaptchaVerifierRef.current);
      
      if (result.error) {
        setError(result.error);
        onError?.(result.error);
      } else {
        setConfirmationResult(result.confirmationResult);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to send verification code';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!confirmationResult) {
        throw new Error('No confirmation result available');
      }

      const result = await verifyPhoneCode(confirmationResult, verificationCode);
      
      if (result.error) {
        setError(result.error);
        onError?.(result.error);
      } else if (result.user) {
        onSuccess?.(result.user);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to verify code';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div ref={recaptchaContainerRef} className="mb-4"></div>
      
      {!confirmationResult ? (
        <form onSubmit={handleSendCode} className="space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Verification Code'
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 disabled:opacity-70"
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
              'Verify Code'
            )}
          </button>
        </form>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md animate-fadeIn">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

// Add type declaration for window object
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | null;
  }
}

export default PhoneAuth; 