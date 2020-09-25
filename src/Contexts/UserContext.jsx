import React, { createContext, useReducer, useState, useEffect } from "react";
import { userReducer, authAlertReducer } from "../Reducers/UserReducer";
import firebase from "firebase";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [isSignedIn, changeAuthState] = useState(false);

  const [user, dispatch] = useReducer(userReducer, {
    fullName: "",
    email: "",
    password: "",
    imageURL: "",
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
    uid: "",
  });

  const [authAlert, authAlertDispatcher] = useReducer(authAlertReducer, {
    isShowen: false,
    type: "success",
    msg: "",
  });

  useEffect(() => {
    let unsubscribe;
    const getUser = () => {
      unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          changeAuthState(true);
          const { uid } = user;
          firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .onSnapshot((doc) => {
              const userData = doc.data();
              dispatch({ type: "UPDATE_USER_DATA", userData, uid });
            });
        } else {
          changeAuthState(false);
        }
      });
    };

    getUser();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        dispatch,
        isSignedIn,
        changeAuthState,
        authAlert,
        authAlertDispatcher,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
