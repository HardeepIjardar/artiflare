import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { clearRecaptchaVerifier } from '../../services/firebase';
import { User } from 'firebase/auth';

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

const PhoneLogin: React.FC<PhoneLoginProps> = ({ 
  onSuccess, 
  onError,
  isLoading = false,
  setIsLoading
}) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { phoneLogin, verifyPhoneCode } = useAuth();
  const recaptchaId = useRef(`recaptcha-container-${Math.random().toString(36).substr(2, 9)}`);
  const recaptchaMounted = useRef(false);

  useEffect(() => {
    // Only mount recaptcha if we're not in verification mode
    if (!isVerifying && !recaptchaMounted.current) {
      const container = document.getElementById(recaptchaId.current);
      if (container) {
        recaptchaMounted.current = true;
      }
    }

    // Cleanup function
    return () => {
      if (recaptchaMounted.current) {
        clearRecaptchaVerifier(recaptchaId.current);
        recaptchaMounted.current = false;
      }
    };
  }, [isVerifying]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading?.(true);
    
    try {
      const cleanedNumber = phoneNumber.replace(/^0+/, '').replace(/\s+/g, '');
      const fullPhone = `${selectedCountry.code}${cleanedNumber}`;
      
      const result = await phoneLogin(fullPhone, recaptchaId.current);
      if (result.error) {
        onError?.(result.error);
      } else {
        setConfirmationResult(result.confirmationResult);
        setIsVerifying(true);
      }
    } catch (error: any) {
      onError?.(error.message || 'An error occurred. Please try again.');
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
        <form onSubmit={handleSendCode} className="space-y-6">
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
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-in-out"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="mt-4">
            <div 
              id={recaptchaId.current}
              className="flex justify-center recaptcha-container"
              style={{ minHeight: '65px' }}
            ></div>
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