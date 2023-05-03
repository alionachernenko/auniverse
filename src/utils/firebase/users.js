import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

import { auth } from 'config/firebase';

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

export { auth };
