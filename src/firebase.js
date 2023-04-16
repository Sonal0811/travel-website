// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFWrUBNjgd72skZgEwu_ZCG6idCLIPurY",
  authDomain: "travelbuddy-a3d32.firebaseapp.com",
  projectId: "travelbuddy-a3d32",
  storageBucket: "travelbuddy-a3d32.appspot.com",
  messagingSenderId: "1095410972905",
  appId: "1:1095410972905:web:2ae09cec641ca297f59878"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();