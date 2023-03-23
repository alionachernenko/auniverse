import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDXbzWEO_ow42Ym1GzIz42Gq1t_PLN8Ozk',
  authDomain: 'auniverse-97d59.firebaseapp.com',
  databaseURL: 'https://auniverse-97d59-default-rtdb.firebaseio.com',
  projectId: 'auniverse-97d59',
  storageBucket: 'auniverse-97d59.appspot.com',
  messagingSenderId: '111850061476',
  appId: '1:111850061476:web:8e072e26dcab8257d5b031',
  measurementId: 'G-HH3NZ9T16W',
};

const app = initializeApp(firebaseConfig);

const firebaseApps = {
  auth: getAuth(app),
  database: getDatabase(app),
  storage: getStorage(app),
};

export default firebaseApps;
