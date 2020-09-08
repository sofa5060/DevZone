import {
  signUp,
  signInWithEmailAndPassword,
  completeSignUp,
} from "../dbServices";

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP_STEP1":
      state.email = action.email;
      state.fullName = action.firstName + " " + action.lastName;
      state.password = action.password;
      signUp({ ...state }, action.authAlertDispatcher);
      return { ...state };
    case "SIGNUP_STEP2":
      state.imageURL = action.imageURL || "";
      state.title = action.title;
      state.bio = action.bio;
      completeSignUp(
        { ...state },
        action.authAlertDispatcher,
        action.redirectToHomeScreen
      );
      return { ...state };
    case "UPDATE_USER_DATA":
      state = action.userData;
      state.uid = action.uid;
      return { ...state };
    case "SIGNIN":
      state.email = action.email;
      state.password = action.password;
      signInWithEmailAndPassword({ ...state }, action.authAlertDispatcher);
      return { ...state };
    default:
      return state;
  }
};

export const authAlertReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP_ERR":
      state.type = "error";
      state.msg = action.msg;
      state.isShowen = true;
      return { ...state };
    case "SIGNUP_SUCCESS":
      state.type = "success";
      state.msg = "Welcome to DevZone family";
      state.isShowen = true;
      return { ...state };
    case "SIGNUP2_SUCCESS":
      state.type = "success";
      state.msg = "Your profile is completed";
      state.isShowen = true;
      return { ...state };
    case "SIGNIN_SUCCESS":
      state.type = "success";
      state.msg = "Welcome Back";
      state.isShowen = true;
      return { ...state };
    case "CLOSE_ALERT":
      state.isShowen = false;
      return { ...state };
    case "auth/wrong-password":
      state.type = "error";
      state.msg = "Wrong email or password";
      state.isShowen = true;
      return { ...state };
    case "auth/user-not-found":
      state.type = "error";
      state.msg = "User not found";
      state.isShowen = true;
      return { ...state };
    case "SIGNING_UP":
      state.type = "info";
      state.msg = "Please wait...";
      state.isShowen = true;
      return { ...state };
    default:
      return state;
  }
};
