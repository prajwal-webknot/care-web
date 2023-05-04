import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyA2LAOZEJmC84HvuhxU-wtFQchzPWibAzE",
  authDomain: "ultratech-care.firebaseapp.com",
  projectId: "ultratech-care",
  storageBucket: "ultratech-care.appspot.com",
  messagingSenderId: "630608056216",
  appId: "1:630608056216:web:d0b72bc657c4f931c0e5ed",
  measurementId: "G-TR7Z6CLFQQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);