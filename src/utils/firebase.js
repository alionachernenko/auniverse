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
import { nanoid } from 'nanoid';

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
    }).catch(error => console.log(error));
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
    }).catch(error => console.log(error));
  });
};

export const acceptInvitationAndAddUser = async (id, userId) => {
  const res = await Promise.all([
    get(ref(database, `users/${userId}/friends`)),
    get(ref(database, `users/${id}/friends`)),
  ]);

  const [myFriends, usersFriends] = res;
  set(ref(database, 'users/' + userId + '/friends'), {
    ...myFriends.val(),
    [id]: id,
  });

  set(ref(database, 'users/' + id + '/friends'), {
    ...usersFriends.val(),
    [userId]: userId,
  });

  remove(ref(database, 'users/' + userId + '/friendsInvites/' + id));
  remove(ref(database, 'users/' + id + '/friendsInvites/' + userId));
};

export const getFavouriteGames = userId => {
  return get(ref(database, `users/${userId}/favs`));
};

export const getFriendsInvitationsList = userId => {
  return get(ref(database, `users/${userId}/friendsInvites`));
};

export const getFriendsList = userId => {
  return get(ref(database, `users/${userId}/friends`));
};

export const removeFriend = (id, userId) => {
  remove(ref(database, 'users/' + id + '/friends/' + userId));
  remove(ref(database, 'users/' + userId + '/friends/' + id));
};

export const leaveComment = (userId, gameSlug, text) => {
  console.log('hi', database, gameSlug, userId);
  get(ref(database, '/comments/' + gameSlug))
    .then(res =>
      set(ref(database, `/comments/` + gameSlug), {
        ...res.val(),
        [`${userId}-${nanoid()}`]: text,
      })
    )
    .catch(error => console.log(error));
};

export const getComments = gameSlug => {
  return get(ref(database, '/comments/' + gameSlug));
};

export const addAvatar = async (
  file,
  userId,
  setPhotoPath,
  setIsAvatarLoading
) => {
  uploadBytes(sRef(storage, `/userpics/${file.name}`), file)
    .then(res => {
      return getDownloadURL(sRef(storage, `/userpics/${file.name}`));
    })
    .then(res => {
      set(ref(database, 'users/' + userId + '/photoUrl'), res);
      setPhotoPath(res);
      setIsAvatarLoading(false);
    });
};

export const changeUsername = (userId, username) => {
  set(ref(database, 'users/' + userId + '/username'), username);
};
export { auth };
