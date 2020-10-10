import React, { createContext, useState, useEffect } from "react";
import firebase from "../fbConfig";

export const PostContext = createContext();

const PostContextProvider = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let postsArr = [];
    const getData = () => {
      firebase
        .firestore()
        .collection("posts")
        .orderBy("date", "desc")
        .onSnapshot((querySnapshot) => {
          postsArr = [];
          querySnapshot.forEach((doc) => {
            let postDoc = {
              postData: doc.data(),
              postID: doc.id,
            };
            postsArr = [...postsArr, postDoc];
          });
          setPosts(postsArr);
        });
    };
    getData();
  }, []);

  return (
    <PostContext.Provider value={{ posts }}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
