// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "shop-4cbc9.firebaseapp.com",
  projectId: "shop-4cbc9",
  storageBucket: "shop-4cbc9.appspot.com",
  messagingSenderId: "354028742753",
  appId: "1:354028742753:web:1212e6c43516bf980a2220",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
