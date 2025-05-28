// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBds0zVzYY6hNdEAVA2ow-W8bcHBDk5ALs",
  authDomain: "custom-portfolios-website.firebaseapp.com",
  projectId: "custom-portfolios-website",
  storageBucket: "custom-portfolios-website.firebasestorage.app",
  messagingSenderId: "35558043417",
  appId: "1:35558043417:web:69bfad8cf797d0584f1f88",
  measurementId: "G-W4ZT4DWLMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);