import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';


export const firebaseConfig = {
    apiKey: "AIzaSyDsL0dyxp83Hd1tNsdc8p6YY09kpc4LLyY",
    authDomain: "real-estate-auth-9f1a2.firebaseapp.com",
    projectId: "real-estate-auth-9f1a2",
    storageBucket: "real-estate-auth-9f1a2.appspot.com",
    messagingSenderId: "672581857670",
    appId: "1:672581857670:web:b29e7114b5ac88beac7c07",
    measurementId: "G-QQM0MPGL7H"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);