// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-51c1b.firebaseapp.com",
  projectId: "mern-auth-51c1b",
  storageBucket: "mern-auth-51c1b.appspot.com",
  messagingSenderId: "155641338238",
  appId: "1:155641338238:web:82de4ccbe1e9932f5bfb2f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
