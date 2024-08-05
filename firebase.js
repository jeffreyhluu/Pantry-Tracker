// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import 'firebase/auth'; // or other Firebase services
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZagFOlOghrkI1VZnfy_ioAwVc6teXvvg",
  authDomain: "pantry-tracker-5db64.firebaseapp.com",
  projectId: "pantry-tracker-5db64",
  storageBucket: "pantry-tracker-5db64.appspot.com",
  messagingSenderId: "29927057815",
  appId: "1:29927057815:web:7090cc565e7ad9bc68bcd2",
  measurementId: "G-L2DSPLDFK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export { firestore };

if (typeof window !== 'undefined') {
  // Initialize Firebase only on the client-side
  const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    // other config
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

export default firebase;