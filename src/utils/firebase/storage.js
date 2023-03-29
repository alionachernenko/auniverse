import { database, storage } from '../../config/firebase';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { set, ref as dbRef } from 'firebase/database';

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
  uploadBytes(
    ref(storage, `/feedback/${feedbackId}/${file.name}-${userId}`),
    file,
    {
      contentType: 'image/jpeg',
    }
  );
};
