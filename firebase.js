// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFJ8HPTSG2aVlKmskZSQVbAizMaiJVj_4",
  authDomain: "note-keeper-01.firebaseapp.com",
  projectId: "note-keeper-01",
  storageBucket: "note-keeper-01.appspot.com",
  messagingSenderId: "369158044131",
  appId: "1:369158044131:web:aed275237b15e5956608d6",
  measurementId: "G-561JCGGQW8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
// const analytics = getAnalytics(app);
