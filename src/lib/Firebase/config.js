// Import the functions you need from the SDKs you need
// const VITE_FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBWiDVuDWfdbFarxCeu-WUsrxj7EnaLAvY",
  authDomain: "apilink-55977.firebaseapp.com",
  projectId: "apilink-55977",
  storageBucket: "apilink-55977.appspot.com",
  messagingSenderId: "830576935653",
  appId: "1:830576935653:web:234d412e8151bc2723ca0c",
  measurementId: "G-J9EEX304YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export all functions and variables at once
export {auth, db};
