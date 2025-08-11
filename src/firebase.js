// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC14EQXFs7qgv4PGokujk5wuuXkuyHCwoU",
  authDomain: "tedxhitam.firebaseapp.com",
  databaseURL: "https://tedxhitam-default-rtdb.firebaseio.com", // 👈 important!
  projectId: "tedxhitam",
  storageBucket: "tedxhitam.appspot.com",
  messagingSenderId: "530420470566",
  appId: "1:530420470566:web:2d5db2f7edabe9806d27e7",
  measurementId: "G-QMPPZTXCJE"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };