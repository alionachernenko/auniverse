import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getDatabase} from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'auniverse-97d59.firebaseapp.com',
    projectId: 'auniverse-97d59',
    storageBucket: 'auniverse-97d59.appspot.com',
    messagingSenderId: '111850061476',
    appId: '1:111850061476:web:8e072e26dcab8257d5b031',
    measurementId: 'G-HH3NZ9T16W',
    databaseURL: 'https://auniverse-97d59-default-rtdb.firebaseio.com/',
  };

const app = initializeApp(firebaseConfig)

const firebaseApps = {
    auth: getAuth(app),
    database: getDatabase(app)
}

export default firebaseApps

  
  