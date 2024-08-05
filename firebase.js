// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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