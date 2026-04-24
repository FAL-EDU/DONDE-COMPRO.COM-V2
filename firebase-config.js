import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
 apiKey: "AIzaSyBYdnEmzLEV6aroL1uNBNrkWdfEGpSDHkw",
  authDomain: "donde-compro-oficial.firebaseapp.com",
  projectId: "donde-compro-oficial",
  storageBucket: "donde-compro-oficial.firebasestorage.app",
  messagingSenderId: "113447539181",
  appId: "1:113447539181:web:6d91fc4fe96bb83d82d7e4",
  measurementId: "G-GSQW41YN14"    
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
