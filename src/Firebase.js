import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "carechain-b8e7d.firebaseapp.com",
  projectId: "carechain-b8e7d",
  storageBucket: "carechain-b8e7d.firebasestorage.app",
  messagingSenderId: "60716676760",
  appId: "1:60716676760:web:b3f88757951cca978482ed",
  measurementId: "G-MV79F768NC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const db = getFirestore(app);

