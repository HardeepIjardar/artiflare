import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { setupRecaptcha, clearRecaptchaVerifier } from '../../services/firebase';
import { User } from 'firebase/auth';

// List of countries and dial codes (shortened for brevity, add all as needed)
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
  // ... add all countries as needed
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
  const recaptchaInitialized = useRef(false);
  const recaptchaId = useRef(`recaptcha-container-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!recaptchaInitialized.current) {
      setupRecaptcha(recaptchaId.current);
      recaptchaInitialized.current = true;
    }
    return () => {
      clearRecaptchaVerifier(recaptchaId.current);
      recaptchaInitialized.current = false;
    };
  }, []);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading?.(true);
    try {
      // Remove leading zeros and spaces from phone number
      const cleanedNumber = phoneNumber.replace(/^0+/, '').replace(/\s+/g, '');
      const fullPhone = `${selectedCountry.code}${cleanedNumber}`;
      const result = await phoneLogin(fullPhone, 'recaptcha-container');
      if (result.error) {
        onError?.(result.error);
      } else {
        setConfirmationResult(result.confirmationResult);
        setIsVerifying(true);
      }
    } catch (error: any) {
      onError?.(error.message);
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
    <div className="card w-full max-w-md mx-auto p-8 animate-fadeIn">
      <div id={recaptchaId.current} className="mb-4"></div>
      
      {!isVerifying ? (
        <form onSubmit={handleSendCode} className="space-y-6">
          <div>
            <label htmlFor="phone" className="label">
              Phone Number
            </label>
            <div className="flex gap-2 flex-col sm:flex-row">
              <select
                className="input w-full sm:w-28"
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
                placeholder="1234567890"
                className="input flex-1"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div>
            <label htmlFor="code" className="label">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="input"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>
      )}
    </div>
  );
};

export default PhoneLogin; 