// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "put your api key",
  authDomain: "e-talk-support.firebaseapp.com",
  projectId: "e-talk-support",
  storageBucket: "e-talk-support.appspot.com",
  messagingSenderId: "1090459012286",
  appId: "1:1090459012286:web:68b0ee3dfbe89373a0a2ef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
