import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
  User,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Add this at the top of the file, after imports

declare global {
  interface Window {
    [key: string]: any;
    recaptchaVerifier?: any;
    recaptchaWidgetId?: any;
    grecaptcha?: any;
  }
}

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0iSHDuOcPrm-yEaNm9zFxGma1gJENa2k",
  authDomain: "artiflare-001-35be5.firebaseapp.com",
  projectId: "artiflare-001-35be5",
  storageBucket: "artiflare-001-35be5.appspot.com",
  messagingSenderId: "115283598563",
  appId: "1:115283598563:web:ffda51f61ebf8088e279d6",
  measurementId: "G-2V6V0S1P77"
};

// Initialize Firebase and services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage(); // Set language to device default for SMS
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Authentication providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const phoneProvider = new PhoneAuthProvider(auth);

// Utility function for retrying operations
const retryOperation = async (operation: () => Promise<any>, maxAttempts = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts) break;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

// Authentication functions
const registerWithEmailAndPassword = async (
  email: string, 
  password: string,
  displayName?: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update display name if provided
    if (displayName && user) {
      await updateProfile(user, { displayName });
    }
    
    return { user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

const loginWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

const loginWithFacebook = async () => {
  try {
    const userCredential = await signInWithPopup(auth, facebookProvider);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

// Phone authentication
let recaptchaVerifiers: { [key: string]: RecaptchaVerifier } = {};

const clearRecaptchaVerifier = (containerId: string) => {
  if (recaptchaVerifiers[containerId]) {
    try {
      recaptchaVerifiers[containerId].clear();
      delete recaptchaVerifiers[containerId];
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = '';
      }
    } catch (e) {
      console.warn('Error clearing reCAPTCHA:', e);
    }
  }
};

export const setupRecaptcha = async (containerId: string) => {
  const auth = getAuth();
  
  // If there's an existing verifier for this container, clean it up first
  if (recaptchaVerifiers[containerId]) {
    try {
      await recaptchaVerifiers[containerId].clear();
      delete recaptchaVerifiers[containerId];
    } catch (e) {
      console.warn('Error clearing existing reCAPTCHA:', e);
    }
  }

  // Clean up any existing DOM elements
  const elem = document.getElementById(containerId);
  if (elem) {
    elem.innerHTML = '';
  }

  // Create new reCAPTCHA verifier with normal size and timeout
  const verifier = new RecaptchaVerifier(containerId, {
    size: 'normal',
    callback: (response: any) => {
      console.log('reCAPTCHA solved successfully');
      // Add success class to container
      const container = document.getElementById(containerId);
      if (container) {
        container.classList.add('recaptcha-success');
      }
    },
    'expired-callback': () => {
      console.log('reCAPTCHA expired');
      // Remove success class and add expired class
      const container = document.getElementById(containerId);
      if (container) {
        container.classList.remove('recaptcha-success');
        container.classList.add('recaptcha-expired');
      }
      // Re-render the reCAPTCHA
      if (recaptchaVerifiers[containerId]) {
        clearRecaptchaVerifier(containerId);
        setupRecaptcha(containerId);
      }
    },
    'error-callback': () => {
      console.log('reCAPTCHA error');
      clearRecaptchaVerifier(containerId);
    }
  }, auth);

  // Store the verifier reference
  recaptchaVerifiers[containerId] = verifier;
  window.recaptchaVerifier = verifier;

  try {
    // Set a timeout for the render operation
    const renderPromise = verifier.render();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('reCAPTCHA render timeout')), 30000); // 30 seconds timeout
    });

    // Race between render and timeout
    await Promise.race([renderPromise, timeoutPromise]);
    return verifier;
  } catch (error) {
    console.error('Error rendering reCAPTCHA:', error);
    clearRecaptchaVerifier(containerId);
    throw error;
  }
};

// Utility function to format phone number
const formatPhoneNumber = (phoneNumber: string, countryCode: string = '+91'): string => {
  // Remove any non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // If the number already includes the country code, return as is
  if (cleaned.startsWith('91')) {
    return '+' + cleaned;
  }
  
  // Remove leading zeros
  const withoutLeadingZeros = cleaned.replace(/^0+/, '');
  
  // Add country code if not present
  return countryCode + withoutLeadingZeros;
};

const loginWithPhoneNumber = async (phoneNumber: string, containerId: string) => {
  try {
    const auth = getAuth();
    
    // Format phone number
    const formattedPhone = formatPhoneNumber(phoneNumber);
    console.log('Attempting phone authentication for:', formattedPhone);

    // Clear any existing verifier
    clearRecaptchaVerifier(containerId);
    
    // Create new verifier with normal size for better reliability
    const verifier = new RecaptchaVerifier(containerId, {
      size: 'normal',
      callback: (response: any) => {
        console.log('reCAPTCHA solved:', response);
      },
      'expired-callback': () => {
        console.log('reCAPTCHA expired');
        clearRecaptchaVerifier(containerId);
      }
    }, auth);

    // Store the verifier reference
    recaptchaVerifiers[containerId] = verifier;
    
    // Render the reCAPTCHA first
    await verifier.render();
    console.log('reCAPTCHA rendered successfully');

    // Then attempt to send the verification code
    const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, verifier);
    console.log('Verification code sent successfully');
    
    return { 
      confirmationResult, 
      error: null 
    };

  } catch (error: any) {
    console.error('Phone login error:', error);
    clearRecaptchaVerifier(containerId);

    let errorMessage = 'Failed to send verification code. Please try again.';
    
    if (error.code === 'auth/invalid-phone-number') {
      errorMessage = 'Please enter a valid phone number.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many attempts. Please try again later.';
    } else if (error.code === 'auth/operation-not-allowed') {
      errorMessage = 'Phone authentication is not enabled. Please contact support.';
    } else if (error.code === 'auth/invalid-app-credential') {
      errorMessage = 'Please complete the reCAPTCHA verification.';
    } else if (error.message?.includes('timeout')) {
      errorMessage = 'The operation timed out. Please check your internet connection and try again.';
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = 'Network error. Please check your internet connection and try again.';
    }

    return { 
      confirmationResult: null, 
      error: errorMessage
    };
  }
};

const verifyPhoneCode = async (confirmationResult: any, code: string) => {
  try {
    const userCredential = await confirmationResult.confirm(code);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Current user subscription
const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Export all the functions and services
export {
  auth,
  db,
  storage,
  analytics,
  googleProvider,
  facebookProvider,
  phoneProvider,
  retryOperation,
  loginWithPhoneNumber,
  verifyPhoneCode,
  clearRecaptchaVerifier,
  subscribeToAuthChanges,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  loginWithGoogle,
  loginWithFacebook,
  logoutUser,
  resetPassword
}; 