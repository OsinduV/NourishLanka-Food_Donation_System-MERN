// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-community-nourish-lanka.firebaseapp.com",
  projectId: "mern-community-nourish-lanka",
  storageBucket: "mern-community-nourish-lanka.appspot.com",
  messagingSenderId: "149558322853",
  appId: "1:149558322853:web:dff079270f2f48a4674f4c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
