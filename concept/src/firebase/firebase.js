import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGQPitNTzJftCQRsEblgNreQ2CLJ6saBc",
    authDomain: "concept-e-learn.firebaseapp.com",
    projectId: "concept-e-learn",
    storageBucket: "concept-e-learn.appspot.com",
    messagingSenderId: "1071311389440",
    appId: "1:1071311389440:web:4d6d1e20d81ffb47bc29e5",
    measurementId: "G-EMQ1YFKP98"
  };

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
export const schema = {"USERS": "users", "RESOURCES":"resources"};