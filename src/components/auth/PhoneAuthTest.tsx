import React, { useRef, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../services/firebase'; // Adjust path if needed

const PhoneAuthTest: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirmation, setConfirmation] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const recaptchaRef = useRef<HTMLDivElement>(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        recaptchaRef.current!,
        { size: 'normal' },
        auth
      );
    }
  };

  const sendCode = async () => {
    setError(null);
    setSuccess(null);
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    if (!appVerifier) {
      setError('reCAPTCHA not initialized');
      return;
    }
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmation(confirmationResult);
      setSuccess('Code sent!');
    } catch (err: any) {
      setError(err.message || 'Failed to send code');
    }
  };

  const verifyCode = async () => {
    setError(null);
    setSuccess(null);
    try {
      await confirmation.confirm(code);
      setSuccess('Phone number verified!');
    } catch (err: any) {
      setError(err.message || 'Failed to verify code');
    }
  };

  return (
    <div>
      <h2>Minimal Phone Auth Test</h2>
      <input
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="+1234567890"
      />
      <div ref={recaptchaRef}></div>
      <button onClick={sendCode} disabled={!phone}>Send Code</button>
      {confirmation && (
        <>
          <input
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Enter code"
          />
          <button onClick={verifyCode} disabled={!code}>Verify</button>
        </>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
};

export default PhoneAuthTest; 