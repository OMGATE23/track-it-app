// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider , getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBpmOJ4DLpPsi7jb9RYgWT-EiSlRaMdAG0",
    authDomain: "hola-200b5.firebaseapp.com",
    projectId: "hola-200b5",
    storageBucket: "hola-200b5.appspot.com",
    messagingSenderId: "328123660740",
    appId: "1:328123660740:web:d88b3c066ef9a55180cc91",
    measurementId: "G-TT1EK6NB6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

export {auth  , db , provider}