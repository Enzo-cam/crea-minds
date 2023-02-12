import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase'
import {getFireStore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.DB_APIKEY,
  authDomain: process.env.DB_AUTH_DOMAIN,
  projectId: process.env.DB_PROJECT_ID,
  storageBucket: process.env.DB_STORAGE_BUCKET,
  messagingSenderId: process.env.DB_MESSAGING_SENDER,
  appId: process.env.DB_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
//
export const db = getFireStore(app)