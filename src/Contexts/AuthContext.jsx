import React, { createContext, useReducer } from "react";
import { authReducer } from "../Reducers/AuthReducer";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, dispatch] = useReducer(authReducer, {
    isSignedIn: false,
    fullName: "",
    email: "",
    password: "",
    imageURL: "",
    title: "",
    bio: "",
    following: [],
    followers: [],
  });

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
