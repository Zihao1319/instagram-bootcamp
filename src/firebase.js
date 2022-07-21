// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXFgQjgaotvmmQWkV6sxbOSh7rESxLuXg",
  authDomain: "rocketgram-49b26.firebaseapp.com",
  projectId: "rocketgram-49b26",
  storageBucket: "gs://rocketgram-49b26.appspot.com/",
  messagingSenderId: "57226642041",
  appId: "1:57226642041:web:89de29861af18cd8464aa8",
  measurementId: "G-3SFJPHHL8Y",
  // The value of `databaseURL` depends on the location of the database
  databaseURL:
    "https://rocketgram-49b26-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the database service and export the reference for other modules
export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
