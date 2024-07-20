// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc,addDoc, getDoc,getDocs, increment,collection  } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const storage = getStorage(app);
// Export all functions and variables at once
export {storage,app, auth, db, doc, setDoc,addDoc,getDocs,collection, getDoc, increment };
