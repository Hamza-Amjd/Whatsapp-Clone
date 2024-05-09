import { initializeApp ,getApp} from 'firebase/app';
// Optionally import the services that you want to use
import {getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
import {getStorage} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBLpaCKG7qAPKyNG6zQb77AutI6RzxbDgA",
    authDomain: "whatsapp-clone-2373d.firebaseapp.com",
    projectId: "whatsapp-clone-2373d",
    storageBucket: "whatsapp-clone-2373d.appspot.com",
    messagingSenderId: "225280699303",
    appId: "1:225280699303:web:d2d0ae057a6a9f0a156482",
    measurementId: "G-3ZHR90VE1J"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_APP = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(getApp());
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
export const signIn=(email:string, password:string)=>{
    return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
}
export const signUp=(email:string, password:string)=>{
    return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
}