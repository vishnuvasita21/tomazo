import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACFIpFpScuGQCl7MUQVYUTIgMDdbwWe4U",
  authDomain: "tomazo-1e483.firebaseapp.com",
  projectId: "tomazo-1e483",
  storageBucket: "tomazo-1e483.appspot.com",
  messagingSenderId: "828760454904",
  appId: "1:828760454904:web:b0274a49862e07aea12d0d",
  measurementId: "G-S0JKDFCY2S",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
