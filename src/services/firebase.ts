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
  storageBucket: "artiflare-001-35be5.firebasestorage.app",
  messagingSenderId: "115283598563",
  appId: "1:115283598563:web:ffda51f61ebf8088e279d6",
  measurementId: "G-2V6V0S1P77"
};

// Initialize Firebase and services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Authentication providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const phoneProvider = new PhoneAuthProvider(auth);

// Add retry utility function at the top of the file
const retryOperation = async (operation: () => Promise<any>, maxAttempts = 3, delay = 2000) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      if (attempt === maxAttempts || !error.message?.includes('network')) {
        throw error;
      }
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
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

  // Create new reCAPTCHA verifier with normal size
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
        try {
          recaptchaVerifiers[containerId].clear();
          setupRecaptcha(containerId);
        } catch (e) {
          console.warn('Error handling reCAPTCHA expiration:', e);
        }
      }
    }
  }, auth);

  // Store the verifier reference
  recaptchaVerifiers[containerId] = verifier;
  window.recaptchaVerifier = verifier;

  try {
    // Render the reCAPTCHA widget
    await verifier.render();
    return verifier;
  } catch (error) {
    console.error('Error rendering reCAPTCHA:', error);
    throw error;
  }
};

export const clearRecaptchaVerifier = async (containerId: string) => {
  if (recaptchaVerifiers[containerId]) {
    try {
      await recaptchaVerifiers[containerId].clear();
      delete recaptchaVerifiers[containerId];
    } catch (e) {
      console.warn('Error clearing reCAPTCHA:', e);
    }
  }
  
  if (window.recaptchaVerifier) {
    delete window.recaptchaVerifier;
  }

  // Clean up DOM element
  const elem = document.getElementById(containerId);
  if (elem) {
    elem.innerHTML = '';
  }
};

const loginWithPhoneNumber = async (phoneNumber: string, containerId: string) => {
  try {
    const auth = getAuth();
    
    // Use the existing verifier if available, otherwise create a new one
    let verifier = recaptchaVerifiers[containerId];
    if (!verifier) {
      verifier = new RecaptchaVerifier(containerId, {
        size: 'normal',
        callback: (response: string) => {
          console.log('reCAPTCHA solved successfully');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          clearRecaptchaVerifier(containerId);
        }
      }, auth);

      // Store the verifier reference
      recaptchaVerifiers[containerId] = verifier;
      window.recaptchaVerifier = verifier;

      // Render the reCAPTCHA if it hasn't been rendered yet
      await verifier.render();
    }

    // Proceed with phone number verification
    console.log('Sending verification code to:', phoneNumber);
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    console.log('Verification code sent successfully');

    return { 
      confirmationResult, 
      error: null 
    };
  } catch (error: any) {
    console.error('Phone login error:', error);
    return { 
      confirmationResult: null, 
      error: error.message || 'Failed to send verification code. Please try again.' 
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

// Export all the functions
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
  subscribeToAuthChanges,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  loginWithGoogle,
  loginWithFacebook,
  logoutUser,
  resetPassword
}; 