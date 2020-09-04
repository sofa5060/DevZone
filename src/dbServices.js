import firebase from "./fbConfig";
import uuid from "uuid/dist/v4";
const storageRef = firebase.storage().ref();
const db = firebase.firestore();

export const uploadImage = async (image) => {
  const uploadTask = await storageRef.child("images/" + uuid()).put(image);
  let downloadURL = uploadTask.ref.getDownloadURL().then((url) => {
    return url;
  });
  return downloadURL;
};
