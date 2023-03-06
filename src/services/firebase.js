import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
// const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: 'AIzaSyDXbzWEO_ow42Ym1GzIz42Gq1t_PLN8Ozk',
  authDomain: 'auniverse-97d59.firebaseapp.com',
  projectId: 'auniverse-97d59',
  storageBucket: 'auniverse-97d59.appspot.com',
  messagingSenderId: '111850061476',
  appId: '1:111850061476:web:8e072e26dcab8257d5b031',
  measurementId: 'G-HH3NZ9T16W',
  databaseURL: 'https://auniverse-97d59-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
  return auth.signOut();
};

export const addUser = (userId, email, password, favs, username) => {
  set(ref(database, 'users/' + userId), {
    email,
    favs,
    password,
    username,
  });
};

export const getUserInfo = userId => {
  return get(ref(database, `users/${userId}`));
};

export const addGameToFavourite = (userId, gameSlug, gameData) => {
  get(ref(database, `users/${userId}/favs`)).then(res => {
    set(ref(database, 'users/' + userId + '/favs'), {
      ...res.val(),
      [gameSlug]: gameData,
    });
  });
};

export const removeGameFromFavourite = (userId, gameSlug) => {
  remove(ref(database, `users/${userId}/favs/${gameSlug}`));
};

export const getFavouriteGames = userId => {
  console.log(
    `https://auniverse-97d59-default-rtdb.firebaseio.com/users/${userId}/favs`
  );
  return get(ref(database, `users/${userId}/favs`));
};