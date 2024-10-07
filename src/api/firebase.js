// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC63oqpbrFhOsh7cDd2jTZujFhBVEdhnYw",
  authDomain: "note-app-server-cc206.firebaseapp.com",
  projectId: "note-app-server-cc206",
  storageBucket: "note-app-server-cc206.appspot.com",
  messagingSenderId: "586307826169",
  appId: "1:586307826169:web:c28acefef50fd3d70dcd28",
  measurementId: "G-W0BXZQEY0E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const analytics = getAnalytics(app);