import { database, storage } from '../../config/firebase';
import {
  uploadBytes,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';
import { set, ref as dbRef } from 'firebase/database';
import { nanoid } from 'nanoid';

//avatar

export const addAvatar = async (
  file,
  userId,
  setPhotoPath,
  setIsAvatarLoading
) => {
  uploadBytes(ref(storage, `/userpics/${file.name}`), file)
    .then(() => {
      return getDownloadURL(ref(storage, `/userpics/${file.name}`));
    })
    .then(res => {
      set(dbRef(database, 'users/' + userId + '/photoUrl'), res);
      setPhotoPath(res);
      setIsAvatarLoading(false);
    });
};

//feedback

export const leaveFeedbackPhotos = (file, userId, feedbackId) => {
  const id = nanoid();
  const storageRef = ref(
    storage,
    `/feedback/${feedbackId}/${feedbackId}-${id}-${userId}`
  );
  uploadString(storageRef, file, 'data_url');
};
