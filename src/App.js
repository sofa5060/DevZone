import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import SignUp from "./components/AuthPages/SignUp";
import SignIn from "./components/AuthPages/SignIn";
import SignUp2 from "./components/AuthPages/SignUp2";
import AuthContextProvider from "./Contexts/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup2" component={SignUp2} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
