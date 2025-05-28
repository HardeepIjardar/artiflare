import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../../services/firebase';

interface PhoneAuthProps {
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
}

// Country codes data with ISO codes for mapping
const countryCodes = [
  { code: '+1', country: 'US/Canada', iso: ['US', 'CA'] },
  { code: '+44', country: 'UK', iso: ['GB'] },
  { code: '+91', country: 'India', iso: ['IN'] },
  { code: '+61', country: 'Australia', iso: ['AU'] },
  { code: '+86', country: 'China', iso: ['CN'] },
  { code: '+81', country: 'Japan', iso: ['JP'] },
  { code: '+49', country: 'Germany', iso: ['DE'] },
  { code: '+33', country: 'France', iso: ['FR'] },
  { code: '+39', country: 'Italy', iso: ['IT'] },
  { code: '+34', country: 'Spain', iso: ['ES'] },
  { code: '+55', country: 'Brazil', iso: ['BR'] },
  { code: '+52', country: 'Mexico', iso: ['MX'] },
  { code: '+27', country: 'South Africa', iso: ['ZA'] },
  { code: '+971', country: 'UAE', iso: ['AE'] },
  { code: '+966', country: 'Saudi Arabia', iso: ['SA'] },
  { code: '+65', country: 'Singapore', iso: ['SG'] },
  { code: '+60', country: 'Malaysia', iso: ['MY'] },
  { code: '+62', country: 'Indonesia', iso: ['ID'] },
  { code: '+63', country: 'Philippines', iso: ['PH'] },
  { code: '+84', country: 'Vietnam', iso: ['VN'] },
];

const PhoneAuth: React.FC<PhoneAuthProps> = ({ onSuccess, onError }) => {
  const { phoneLogin, verifyPhoneCode } = useAuth();
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  // Function to get country code from ISO code
  const getCountryCodeFromISO = (isoCode: string): string => {
    const country = countryCodes.find(country => 
      country.iso.includes(isoCode.toUpperCase())
    );
    return country?.code || '+1'; // Default to US/Canada if not found
  };

  // Detect user's location and set country code
  useEffect(() => {
    const detectUserLocation = async () => {
      try {
        // First try to get location from IP using ipapi.co
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code) {
          const countryCode = getCountryCodeFromISO(data.country_code);
          setSelectedCountryCode(countryCode);
        }
      } catch (error) {
        console.error('Error detecting location:', error);
        // Fallback to browser's geolocation if IP detection fails
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const data = await response.json();
                
                if (data.address?.country_code) {
                  const countryCode = getCountryCodeFromISO(data.address.country_code);
                  setSelectedCountryCode(countryCode);
                }
              } catch (error) {
                console.error('Error getting country from coordinates:', error);
              }
            },
            (error) => {
              console.error('Error getting geolocation:', error);
            }
          );
        }
      } finally {
        setIsDetectingLocation(false);
      }
    };

    detectUserLocation();
  }, []);

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

      const fullPhoneNumber = `${selectedCountryCode}${phoneNumber}`;
      const result = await phoneLogin(fullPhoneNumber, recaptchaVerifierRef.current);
      
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
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={selectedCountryCode}
                  onChange={(e) => setSelectedCountryCode(e.target.value)}
                  className="appearance-none relative block w-28 px-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 pr-8"
                  disabled={isDetectingLocation}
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} ({country.country})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  {isDetectingLocation ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
              </div>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="1234567890"
                className="flex-1 appearance-none relative block px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                required
                disabled={isDetectingLocation}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading || isDetectingLocation}
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