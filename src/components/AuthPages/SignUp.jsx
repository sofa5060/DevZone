import React, { useContext, useState } from "react";
import image from "../../images/undraw_connected_8wvi1.png";
import logo from "../../images/Logo.png";
import { Link, Redirect } from "react-router-dom";
import "./style.css";
import { AuthContext } from "../../Contexts/AuthContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUp = (props) => {
  const { authAlert, isSignedIn, dispatch, authAlertDispatcher } = useContext(
    AuthContext
  );
  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "SIGNUP_STEP1",
      email,
      password,
      firstName,
      lastName,
      authAlertDispatcher,
    });
  };

  const handleClose = () => {
    authAlertDispatcher({ type: "CLOSE_ALERT" });
  };

  return (
    <div className="auth-page">
      {isSignedIn && <Redirect to="/signup2" />}
      <Snackbar
        open={authAlert.isShowen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={authAlert.type}>
          {authAlert.msg}
        </Alert>
      </Snackbar>
      <div className="site-description">
        <img src={logo} alt="logo" />
        <img src={image} alt="" className="image" />
        <h1>Build Your Community</h1>
        <h6>
          In euismod volutpat fermentum amet. Dictum est elementum auctor
          scelerisque. Sem sed habitant egestas amet imperdiet lectus dictum
          volutpat. Purus risus mauris dictum convallis odio egestas faucibus
          volutpat ut. Leo morbi facilisis tempor, mattis sapien eu tortor
          bibendum.
        </h6>
      </div>
      <div className="line"></div>
      <div className="auth-model">
        <h2>
          Welcome To <span>DevZone</span>
        </h2>
        <h6>
          DevZone is platform aim to bring all developers world wide to one
          place to share thier thoughts and enhance the realtions with each
          others
        </h6>
        <h1>Sign up</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-fields">
            <div className="input-field">
              <h4>First Name</h4>
              <input
                type="text"
                placeholder="John"
                required
                onChange={(e) => updateFirstName(e.target.value)}
              />
            </div>
            <div className="input-field">
              <h4>Last Name</h4>
              <input
                type="text"
                placeholder="Doe"
                required
                onChange={(e) => updateLastName(e.target.value)}
              />
            </div>
            <div className="input-field">
              <h4>Email</h4>
              <input
                type="email"
                placeholder="Example@mail.com"
                required
                onChange={(e) => updateEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <h4>Password</h4>
              <input
                type="password"
                placeholder="*************"
                required
                onChange={(e) => updatePassword(e.target.value)}
              />
            </div>
          </div>
          <h5>
            By singing up your are accept our{" "}
            <span>
              <Link to="/terms">Terms</Link> &{" "}
              <Link to="/conditions">Conditions</Link>
            </span>
          </h5>
          <input type="submit" value="Sign up" />
        </form>
        <div className="or">
          <hr className="bar" />
          <span>OR</span>
          <hr className="bar" />
        </div>
        <h3>
          Do you already have a profile? <Link to="signin">Sign in</Link>
        </h3>
      </div>
    </div>
  );
};

export default SignUp;
