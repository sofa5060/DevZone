import React, { createContext, useReducer, useState, useEffect } from "react";
import { authReducer, authAlertReducer } from "../Reducers/AuthReducer";
import firebase from "firebase";
import { getUserData } from "../dbServices";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isSignedIn, changeAuthState] = useState(false);

  const [user, dispatch] = useReducer(authReducer, {
    fullName: "",
    email: "",
    password: "",
    imageURL: "",
    title: "",
    bio: "",
    following: [],
    followers: [],
    facebookURL: "",
    instagramURL: "",
    linkedinURL: "",
    githubURL: "",
    uid: "",
    finishedSigningUp: false,
  });

  const [authAlert, authAlertDispatcher] = useReducer(authAlertReducer, {
    isShowen: false,
    type: "success",
    msg: "",
  });

  useEffect(() => {
    let unsubscribe;
    const getUser = async () => {
      unsubscribe = await firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          changeAuthState(true);
          const userData = await getUserData(user.uid);
          dispatch({ type: "UPDATE_USER_DATA", userData, uid: user.uid });
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
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
