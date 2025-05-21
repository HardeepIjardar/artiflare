import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0iSHDuOcPrm-yEaNm9zFxGma1gJENa2k",
  authDomain: "artiflare-001-35be5.firebaseapp.com",
  projectId: "artiflare-001-35be5",
  storageBucket: "artiflare-001-35be5.appspot.com",
  messagingSenderId: "115283598563",
  appId: "1:115283598563:web:ffda51f61ebf8088e279d6",
  measurementId: "G-2V6V0S1P77"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); 