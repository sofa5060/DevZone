import { createPost } from "../dbServices";

export const postReducer = (state, action) => {
  switch (action.type) {
    case "ADD_POST":
      state.title = action.title;
      state.details = action.details;
      state.imageURL = action.imageURL || "";
      state.authorID = action.user.uid;
      state.authorImageURL = action.user.imageURL;
      state.authorFullName = action.user.fullName;
      state.date = new Date();
      createPost({ ...state });
      return { ...state };
    default:
      return state;
  }
};
