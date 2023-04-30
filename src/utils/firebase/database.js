import {
  ref,
  set,
  get,
  remove,
  serverTimestamp,
} from 'firebase/database';

import { database, firestore } from '../../config/firebase';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';

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

export const addGameToBookmarks = async (userId, gameSlug, gameData) => {
  const res = await get(ref(database, `users/${userId}/bookmarks`));
  return await set(ref(database, 'users/' + userId + '/bookmarks'), {
    ...res.val(),
    [gameSlug]: gameData,
  });
};

export const removeGameFromBookmarks = (userId, gameSlug) => {
  return remove(ref(database, `users/${userId}/bookmarks/${gameSlug}`));
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

export const leaveComment = (userId, gameSlug, text, id) => {
  get(ref(database, '/comments/' + gameSlug))
    .then(res =>
      set(ref(database, `/comments/` + gameSlug), {
        [id]: {
          id,
          author: userId,
          text,
          date: serverTimestamp(),
        },
        ...res.val(),
      })
    )
    .catch(error => console.log(error));
};

export const leaveReply = (refer, commentObject) => {
  get(ref(database, refer)).then(() =>
    set(ref(database, refer), commentObject)
  );
};

export const fetchComments = gameSlug => {
  return get(ref(database, '/comments/' + gameSlug));
};

export const removeComment = (gameSlug, id) => {
  remove(ref(database, `/comments/${gameSlug}/${id}`));
};

export const removeReply = refer => {
  remove(ref(database, refer));
};
export const fetchCommentReplies = refer => {
  return get(ref(database, refer));
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

//messages

export const createNewChat = async (senderId, recepientId, message) => {
  const chat = {
    members: [senderId, recepientId],
    senderId,
    recepientId,
    messages: [message],
    typing: null
  };
  try {
    return await addDoc(collection(firestore, 'chats'), chat);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const addNewMessage = async (chatId, message) => {
  const chatsRef = doc(firestore, 'chats', chatId);

  await updateDoc(chatsRef, {
    messages: arrayUnion(message),
  });
};
