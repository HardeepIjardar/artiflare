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
let recaptchaVerifier: RecaptchaVerifier | null = null;

const setupRecaptcha = (containerId: string) => {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved, allow phone auth
      },
      'expired-callback': () => {
        // Reset the reCAPTCHA
        recaptchaVerifier = null;
      }
    }, auth);
  }
  return recaptchaVerifier;
};

const loginWithPhoneNumber = async (phoneNumber: string, containerId: string) => {
  try {
    const verifier = setupRecaptcha(containerId);
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    return { 
      confirmationResult, 
      error: null 
    };
  } catch (error: any) {
    return { 
      confirmationResult: null, 
      error: error.message 
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

// Export everything needed
export {
  app,
  auth,
  db,
  storage,
  analytics,
  googleProvider,
  facebookProvider,
  phoneProvider,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  loginWithGoogle,
  loginWithFacebook,
  loginWithPhoneNumber,
  verifyPhoneCode,
  setupRecaptcha,
  logoutUser,
  resetPassword,
  subscribeToAuthChanges
}; 