// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  


const firebaseConfig = {
  apiKey: "AIzaSyAN9BnfD8zkSH20skL22GkHIOc2pcpl9R8",
  authDomain: "mechano-ed20f.firebaseapp.com",
  projectId: "mechano-ed20f",
  storageBucket: "mechano-ed20f.firebasestorage.app",
  messagingSenderId: "1099191215122",
  appId: "1:1099191215122:web:bee3951cacf93b1cbd24cb",
  measurementId: "G-V5ZB9CL7SL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;