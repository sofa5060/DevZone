import React, { createContext, useReducer, useState, useEffect } from "react";
import { postReducer } from "../Reducers/PostReducer";
import firebase from "../fbConfig";

export const PostContext = createContext();

const PostContextProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [post, postDispatcher] = useReducer(postReducer, {
    title: "",
    details: "",
    imageURL: "",
    authorID: "",
    likes: [],
    comments: [],
  });

  useEffect(() => {
    let postsArr = [];
    const getData = () => {
      firebase
        .firestore()
        .collection("posts")
        .limit(20)
        .onSnapshot((querySnapshot) => {
          postsArr = [];
          querySnapshot.forEach((doc) => {
            let postDoc = {
              postData: doc.data(),
              postID: doc.id,
            };
            postsArr = [...postsArr, postDoc];
          });
          setPosts(postsArr)
        });
    };
    getData()
  }, []);

  return (
    <PostContext.Provider value={{ posts, postDispatcher }}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
