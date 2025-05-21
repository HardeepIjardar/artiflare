import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { setupRecaptcha } from '../../services/firebase';
import { User } from 'firebase/auth';

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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { phoneLogin, verifyPhoneCode } = useAuth();

  useEffect(() => {
    // Setup reCAPTCHA when component mounts
    setupRecaptcha('recaptcha-container');
  }, []);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading?.(true);
    try {
      const result = await phoneLogin(phoneNumber, 'recaptcha-container');
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
    <div className="w-full max-w-md mx-auto p-6">
      <div id="recaptcha-container" className="mb-4"></div>
      
      {!isVerifying ? (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>
      )}
    </div>
  );
};

export default PhoneLogin; 