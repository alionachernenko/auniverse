import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence, 
  browserLocalPersistence
} from 'firebase/auth';
import {  ref, set, get, remove } from 'firebase/database';
import apps from '../config/firebase'

const {auth, database} = apps

export const userSignUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const userLogIn = async (email, password) => {
    await setPersistence(auth, browserLocalPersistence);
  return await signInWithEmailAndPassword(auth, email, password);  
};

export const userSignOut = () => {
  return auth.signOut();
};

export const addNewUser = (userId, email, password, favs, username) => {
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

export {auth}