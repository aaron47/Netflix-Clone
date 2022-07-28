// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbRU7elfNR0qAt2nPmwl8Ksawc0q8483Q",
  authDomain: "netflix-clone-b6ab1.firebaseapp.com",
  projectId: "netflix-clone-b6ab1",
  storageBucket: "netflix-clone-b6ab1.appspot.com",
  messagingSenderId: "1000421501173",
  appId: "1:1000421501173:web:22b6a424b47f8db024fdbc"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth();

export default app;
export {auth, db};