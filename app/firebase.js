// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlTR4CReEkgj2e2Aef_ES4gIPTnHiF6ac",
  authDomain: "expense-tracker-90fed.firebaseapp.com",
  projectId: "expense-tracker-90fed",
  storageBucket: "expense-tracker-90fed.appspot.com",
  messagingSenderId: "254615506822",
  appId: "1:254615506822:web:135c358cd2aa051fe02607",
  measurementId: "G-7ZGWMS88LW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app);