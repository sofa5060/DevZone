import firebase from "./fbConfig";
import uuid from "uuid/dist/v4";
const storageRef = firebase.storage().ref();
const db = firebase.firestore();

export const uploadImage = async (image) => {
  const uploadTask = await storageRef.child("images/" + uuid()).put(image);
  let downloadURL = uploadTask.ref.getDownloadURL().then((url) => url);
  return downloadURL;
};

export const signUp = (user, dispatch) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((snapshot) => {
      snapshot.user.updateProfile({
        displayName: user.fullName,
        photoURL: user.imageUrl || "",
      });
      createUserDocWithUid(user);
    })
    .catch((error) => {
      var msg = error.message;
      dispatch({ type: "SIGNUP_ERR", msg });
    });
};

const createUserDocWithUid = (user) => {
  db.collection("users").doc(user.uid).set(user);
};

export const completeSignUp = (user, dispatch, redirectHome) => {
  db.collection("users")
    .doc(user.uid)
    .set(user)
    .then(() => {
      dispatch({ type: "SIGNUP_SUCCESS" });
      redirectHome();
    });
};

export const getUserData = async (uid) => {
  let userData;
  const doc = await db.collection("users").doc(uid).get();
  if (doc.exists) {
    userData = doc.data();
  }
  return userData;
};

export const signInWithEmailAndPassword = (user, dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(() => {
      dispatch({ type: "SIGNIN_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: err.code });
    });
};
