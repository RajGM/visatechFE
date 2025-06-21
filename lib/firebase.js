// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
} from 'firebase/firestore';

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2AqnmO1ZeSkelGVRFmeVtdEzkrxFiTgI",
  authDomain: "visatech-germany.firebaseapp.com",
  projectId: "visatech-germany",
  storageBucket: "visatech-germany.firebasestorage.app",
  messagingSenderId: "925593050840",
  appId: "1:925593050840:web:9a5fc894bddd1b1d4c81ad",
  measurementId: "G-3CK25R16DW"
};

// Initialize Firebase app only once
const app = initializeApp(firebaseConfig);

//const auth = app.auth();
const db = getFirestore(app);

// Auth exports
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();

export { app, db, auth, googleAuthProvider, signInWithPopup, signOut};
// Connect to Firestore emulator if running in development mode
