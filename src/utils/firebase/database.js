import { ref, set, get, remove } from 'firebase/database';
import { nanoid } from 'nanoid';

import { database } from '../../config/firebase';

export const addNewUser = (userId, email, favs, username) => {
  set(ref(database, 'users/' + userId), {
    id: userId,
    email,
    favs,
    username,
  });
};

//users
export const fetchUserInfo = userId => {
  return get(ref(database, `users/${userId}`));
};

export const fetchUsers = () => {
  return get(ref(database, `users`));
};

//bookmarks

export const fetchBookmarks = userId => {
  return get(ref(database, `users/${userId}/bookmarks`));
};

export const addGameToBookmarks = (userId, gameSlug, gameData) => {
  get(ref(database, `users/${userId}/bookmarks`)).then(res => {
    set(ref(database, 'users/' + userId + '/bookmarks'), {
      ...res.val(),
      [gameSlug]: gameData,
    }).catch(error => console.log(error));
  });
};

export const removeGameFromBookmarks = (userId, gameSlug) => {
  remove(ref(database, `users/${userId}/bookmarks/${gameSlug}`));
};

//friends

export const fetchFriendsList = userId => {
  return get(ref(database, `users/${userId}/friends`));
};

export const removeFriend = (id, userId) => {
  remove(ref(database, 'users/' + id + '/friends/' + userId));
  remove(ref(database, 'users/' + userId + '/friends/' + id));
};

export const fetchFriendsInvitationsList = userId => {
  return get(ref(database, `users/${userId}/friendsInvitations`));
};

export const removeFriendFromInvitationsList = (id, userId) => {
  remove(ref(database, 'users/' + userId + '/friendsInvitations/' + id));
};

export const addUserToFriendsInvitationsList = (id, userId) => {
  get(ref(database, `users/${id}/friendsInvitations`)).then(res => {
    set(ref(database, 'users/' + id + '/friendsInvitations'), {
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

  remove(ref(database, 'users/' + userId + '/friendsInvitations/' + id));
  remove(ref(database, 'users/' + id + '/friendsInvitations/' + userId));
};

//comments

export const leaveComment = (userId, gameSlug, text) => {
  get(ref(database, '/comments/' + gameSlug))
    .then(res =>
      set(ref(database, `/comments/` + gameSlug), {
        ...res.val(),
        [`${userId}-${nanoid()}`]: text,
      })
    )
    .catch(error => console.log(error));
};

export const fetchComments = gameSlug => {
  return get(ref(database, '/comments/' + gameSlug));
};

//ussername

export const changeUsername = (userId, username) => {
  set(ref(database, 'users/' + userId + '/username'), username);
};

//feedback

export const leaveFeedbackMessage = (text, userId, feedbackId) => {
  set(ref(database, `/feedback/${feedbackId}`), {
    author: userId,
    text,
  });
};
