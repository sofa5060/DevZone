import React, { createContext, useReducer, useState, useEffect } from "react";
import { authAlertReducer } from "../Reducers/UserReducer";
import firebase from "firebase";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [isSignedIn, changeAuthState] = useState(false);

  const [user, setUser] = useState({
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
              if (userData) {
                setUser(userData);
              }
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
