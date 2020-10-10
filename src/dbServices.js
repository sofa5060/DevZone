import firebase from "./fbConfig";
import uuid from "uuid/dist/v4";
const storageRef = firebase.storage().ref();
const db = firebase.firestore();

export const uploadImage = async (image) => {
  const uploadTask = await storageRef.child("images/" + uuid()).put(image);
  let downloadURL = uploadTask.ref.getDownloadURL().then((url) => url);
  return downloadURL;
};

export const signUp = (
  email,
  password,
  fullName,
  dispatch,
  redirectToSecondStep
) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((snapshot) => {
      const uid = snapshot.user.uid;
      createUserDocWithUid(email, fullName, uid, dispatch);
      redirectToSecondStep();
    })
    .catch((err) => {
      var msg = err.message;
      dispatch({ type: "SIGNUP_ERR", msg });
    });
};

export const createUserDocWithUid = (
  email,
  fullName,
  uid,
  dispatch,
  imageURL
) => {
  db.collection("users")
    .doc(uid)
    .set({
      fullName,
      email,
      imageURL: imageURL || "",
      title: "",
      bio: "",
      following: [],
      followers: [],
      posts: [],
      saved: [],
      facebookURL: "",
      instagramURL: "",
      linkedinURL: "",
      githubURL: "",
      uid,
    })
    .then(() => dispatch({ type: "SIGNUP_SUCCESS" }));
};

export const signUpStep2 = (
  uid,
  title,
  bio,
  dispatch,
  redirectHome,
  imageURL
) => {
  db.collection("users")
    .doc(uid)
    .update({
      title,
      bio,
      imageURL: imageURL || "",
    })
    .then(() => {
      dispatch({ type: "SIGNUP2_SUCCESS" });
      redirectHome();
    });
};

export const signInWithEmailAndPassword = (email, password, dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch({ type: "SIGNIN_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: err.code });
    });
};

export const signOut = () => {
  firebase.auth().signOut();
};

export const createPost = (post) => {
  db.collection("posts")
    .add(post)
    .then((snapshot) => addPostToUserArr(snapshot.id));
};

const addPostToUserArr = (id) => {
  const uid = firebase.auth().currentUser.uid;
  db.collection("users")
    .doc(uid)
    .update({
      posts: firebase.firestore.FieldValue.arrayUnion(id),
    });
};

export const likePostWithUID = (uid, postID) => {
  db.collection("posts")
    .doc(postID)
    .update({
      likes: firebase.firestore.FieldValue.arrayUnion(uid),
    });
};

export const disLikePostWithUID = (uid, postID) => {
  db.collection("posts")
    .doc(postID)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(uid),
    });
};

export const addPostToSaved = (postID, uid) => {
  db.collection("users")
    .doc(uid)
    .update({
      saved: firebase.firestore.FieldValue.arrayUnion(postID),
    });
};

export const removePostFromSaved = (postID, uid) => {
  db.collection("users")
    .doc(uid)
    .update({
      saved: firebase.firestore.FieldValue.arrayRemove(postID),
    });
};

export const addComment = (postID, comment) => {
  db.collection("posts")
    .doc(postID)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion(comment),
    });
};

export const getUserData = async (uid) => {
  const user = await db
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => doc.data())
    .catch((err) => err);
  return user;
};

export const followUser = (uid, id) => {
  if (uid === id) {
    return;
  }
  db.collection("users")
    .doc(uid)
    .update({
      following: firebase.firestore.FieldValue.arrayUnion(id),
    });

  db.collection("users")
    .doc(id)
    .update({
      followers: firebase.firestore.FieldValue.arrayUnion(uid),
    });
};

export const unFollowUser = (uid, id) => {
  if (uid === id) {
    return;
  }
  db.collection("users")
    .doc(uid)
    .update({
      following: firebase.firestore.FieldValue.arrayRemove(id),
    });

  db.collection("users")
    .doc(id)
    .update({
      followers: firebase.firestore.FieldValue.arrayRemove(uid),
    });
};

export const getFeaturedUsers = async () => {
  let featuredUsers = [];
  const querySnapshot = await db.collection("users").limit(3).get();
  querySnapshot.forEach(function (doc) {
    const userData = doc.data();
    const userID = doc.id;
    const user = { userData, userID };
    featuredUsers = [...featuredUsers, user];
  });
  return featuredUsers;
};
