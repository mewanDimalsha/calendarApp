import { getAuth } from "firebase/auth";
import { getFirestore } from "@react-native-firebase/firestore";
import { initializeApp } from "@react-native-firebase/app";
import Constants from "expo-constants";

// Replace these values with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZTmTresDpTc-_AtydW0ec5plzoX5xdmY",
  authDomain: "chatapp-f4c46.firebaseapp.com",
  projectId: "chatapp-f4c46",
  storageBucket: "chatapp-f4c46.appspot.com",
  messagingSenderId: "894329103779",
  appId: "1:894329103779:web:136dc1bd09e651c851a616",
  measurementId: "G-6HC7KZNR5C",
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { auth, firestore };
