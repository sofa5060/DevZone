import firebase from "../fbConfig";
import { createPost } from "../dbServices";

export const postReducer = (state, action) => {
  switch (action.type) {
    case "ADD_POST":
      state.title = action.title;
      state.details = action.details;
      state.imageURL = action.imageURL || "";
      state.authorID = firebase.auth().currentUser.uid;
      createPost({ ...state });
      return { ...state };
    default:
      return state;
  }
};
