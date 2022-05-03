import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0axuU9-4fDNUkbYRHeN_jkVwluUo7GeA",
  authDomain: "proyectos-react-6b1dd.firebaseapp.com",
  projectId: "proyectos-react-6b1dd",
  storageBucket: "proyectos-react-6b1dd.appspot.com",
  messagingSenderId: "308084598198",
  appId: "1:308084598198:web:c89b5e9f69b3af4e444d17",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
