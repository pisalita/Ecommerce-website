import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ecommerce-website-b9587.firebaseapp.com",
  projectId: "ecommerce-website-b9587",
  storageBucket: "ecommerce-website-b9587.appspot.com",
  messagingSenderId: "901072794338",
  appId: "1:901072794338:web:12000facd9e3869ae4a4bb",
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
