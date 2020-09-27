import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import SignUp from "./components/AuthPages/SignUp";
import SignIn from "./components/AuthPages/SignIn";
import SignUp2 from "./components/AuthPages/SignUp2";
import PostDetails from "./components/Post/PostDetails";
import UserContextProvider from "./Contexts/UserContext";
import PostContextProvider from "./Contexts/PostContext";
import Profile from "./components/Profile/Profile";
import MyProfile from "./components/Profile/MyProfile";

const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <PostContextProvider>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup2" component={SignUp2} />
            <Route path="/posts/:id" component={PostDetails} />
            <Route path="/users/:uid" component={Profile} />
            <Route path="/myprofile" component={MyProfile} />
          </Switch>
        </PostContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default App;
