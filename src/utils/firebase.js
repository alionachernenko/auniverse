import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { ref, set, get, remove } from 'firebase/database';
import apps from '../config/firebase';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as sRef } from 'firebase/storage';

const { auth, database, storage } = apps;

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

export const uploadAvatar = (photo, userId) => {
  uploadBytes(
    sRef(storage, `/userpics/${photo.files[0].name}`),
    photo.files[0]
  ).then(() => {
    getDownloadURL(sRef(storage, `/userpics/${photo.files[0].name}`)).then(
      url => {
        set(ref(database, 'users/' + userId + '/photoUrl'), url);
      }
    );
  });
};

export const getUserInfo = userId => {
  return get(ref(database, `users/${userId}`));
};

export const getUsers = () => {
  return get(ref(database, `users`));
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

export const addUserToFriensInvitationsList = (id, userId) => {
  get(ref(database, `users/${id}/friendsInvites`)).then(res => {
    set(ref(database, 'users/' + id + '/friendsInvites'), {
      ...res.val(),
      [userId]: userId,
    });
  });
};

export const acceptInvitationAndAddUser = async (id, userId) => {
  await set(ref(database, 'users/' + userId + '/friends'), {
    [id]: id,
  });
  return await remove(
    ref(database, 'users/' + userId + '/friendsInvites/' + id)
  );
};

export const getFavouriteGames = userId => {
  return get(ref(database, `users/${userId}/favs`));
};

export const getFriendList = userId => {
  return get(ref(database, `users/${userId}/friends`));
};

export { auth };
