import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_db_QBGw2GQaLGUneJySYnKgo3X82szM",
  authDomain: "fourth-bc0b3.firebaseapp.com",
  projectId: "fourth-bc0b3",
  storageBucket: "fourth-bc0b3.firebasestorage.app",
  messagingSenderId: "43485389384",
  appId: "1:43485389384:web:5b97ecb296a20df744ae7d",
  measurementId: "G-7NDHWPT7N9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
