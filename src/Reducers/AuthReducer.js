export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP_STEP1":
      state.email = action.email;
      state.fullName = action.firstName + " " + action.lastName;
      state.password = action.password;
      return state;
    case "SIGNUP_STEP2":
      state.imageURL = action.imageURL
      state.title = action.title;
      state.bio = action.bio;
      return state;
    default:
      return state;
  }
};
