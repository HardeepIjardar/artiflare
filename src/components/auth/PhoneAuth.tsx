import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { RecaptchaVerifier, User } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { PhoneAuthProps } from '../../types/auth';

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

export const PhoneAuth: React.FC<PhoneAuthProps> = ({ onSuccess, onError, name }) => {
  const { phoneLogin, verifyPhoneCode } = useAuth();
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [recaptchaSolved, setRecaptchaSolved] = useState(false);
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

  // Initialize reCAPTCHA only when showRecaptcha is true
  useEffect(() => {
    if (showRecaptcha && !recaptchaVerifierRef.current && recaptchaContainerRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        recaptchaContainerRef.current,
        {
          size: 'normal',
          callback: () => setRecaptchaSolved(true),
          'expired-callback': () => {
            setRecaptchaSolved(false);
            setError('reCAPTCHA expired. Please try again.');
          },
        },
        auth
      );
      recaptchaVerifierRef.current.render().catch(console.error);
    }
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, [showRecaptcha]);

  const handlePhoneFocus = () => {
    setShowRecaptcha(true);
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // If reCAPTCHA is not shown, show it and return
    if (!showRecaptcha) {
      setShowRecaptcha(true);
      return;
    }
    // If reCAPTCHA is shown but not solved, do not proceed
    if (!recaptchaSolved) {
      setError('Please complete the reCAPTCHA.');
      return;
    }
    setIsLoading(true);
    try {
      if (!recaptchaVerifierRef.current) throw new Error('reCAPTCHA not ready');
      const fullPhone = `${selectedCountryCode}${phoneNumber}`;
      const confirmation = await phoneLogin(fullPhone, recaptchaVerifierRef.current);
      setConfirmationResult(confirmation);
    } catch (err: any) {
      // Handle timeout and expired reCAPTCHA
      const message = err.message || '';
      if (
        err.code === 'auth/timeout' ||
        message.toLowerCase().includes('timeout') ||
        message.toLowerCase().includes('expired')
      ) {
        setError('Request timed out or reCAPTCHA expired. Please try again.');
        setShowRecaptcha(false);
        setRecaptchaSolved(false);
        if (recaptchaVerifierRef.current) {
          recaptchaVerifierRef.current.clear();
          recaptchaVerifierRef.current = null;
        }
        return;
      }
      setError(message || 'Failed to send verification code');
      onError?.(message || 'Failed to send verification code');
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
      <form onSubmit={confirmationResult ? handleVerifyCode : handleSendCode} className="space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-2">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        {!confirmationResult && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="flex gap-2">
                <select
                  value={selectedCountryCode}
                  onChange={e => setSelectedCountryCode(e.target.value)}
                  className="w-28 px-3 py-3 border rounded-lg"
                >
                  {countryCodes.map(c => (
                    <option key={c.code} value={c.code}>{c.code} ({c.country})</option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="1234567890"
                  className="flex-1 px-4 py-3 border rounded-lg"
                  required
                />
              </div>
            </div>
            {/* Only render reCAPTCHA after send button is clicked */}
            {showRecaptcha && (
              <div ref={recaptchaContainerRef} className="mb-4" style={{ minHeight: 78 }} />
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-primary text-white"
            >
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </>
        )}
        {confirmationResult && (
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
      </form>
    </div>
  );
};

// Add type declaration for window object
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | null;
  }
} 