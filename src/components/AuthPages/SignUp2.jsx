import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { UserContext } from "../../Contexts/UserContext";
import { uploadImage } from "../../dbServices";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignUp2(props) {
  const { isSignedIn, dispatch, authAlert, authAlertDispatcher } = useContext(
    UserContext
  );
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");

  const getFile = () => {
    document.getElementById("photoURL").click();
  };

  const readURL = (input) => {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        document
          .getElementById("user-image")
          .setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  const handleImage = (e) => {
    readURL(e.target);
    e.target.files[0] && setImage(e.target.files[0]);
  };

  const removeImage = (e) => {
    setImage("");
    document.getElementById("user-image").setAttribute("src", "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    authAlertDispatcher({ type: "SIGNING_UP" });
    let imageURL;
    if (image) {
      imageURL = await uploadImage(image);
    }
    dispatch({
      type: "SIGNUP_STEP2",
      bio,
      title,
      imageURL,
      authAlertDispatcher,
      redirectToHomeScreen,
    });
  };

  const redirectToHomeScreen = () => {
    props.history.push("/");
  };

  const handleClose = () => {
    authAlertDispatcher({ type: "CLOSE_ALERT" });
  };

  return (
    <div className="signup-2">
      {isSignedIn ? "" : <Redirect to="/" />}
      <Snackbar
        open={authAlert.isShowen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={authAlert.type}>
          {authAlert.msg}
        </Alert>
      </Snackbar>
      <h1>Create your profile</h1>
      <div className="card">
        <form className="signup-2-form" onSubmit={handleSubmit}>
          <h2>Tell us more about you</h2>
          <h3>Upload your profile picture</h3>
          <div className="image-field">
            <div className="image-container">
              {image ? (
                <img src={image} alt="" id="user-image" />
              ) : (
                <AccountCircleIcon
                  style={{ color: "#C2C2C2", fontSize: "104" }}
                />
              )}
            </div>
            <div className="btns">
              <h5 className="upload" onClick={getFile}>
                Choose
              </h5>
              <h5 className="red" onClick={removeImage}>
                Delete
              </h5>
              <div className="hidden">
                <input
                  id="photoURL"
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />
              </div>
            </div>
          </div>
          <hr />
          <h3>Add a professional title</h3>
          <h4>Choose a title that helps you stand out.</h4>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            placeholder="Frontend Developer"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <hr />
          <h3>Write a professional Bio</h3>
          <h4>Highlight your top skills, experience, and interests.</h4>
          <TextField
            id="outlined-multiline-static"
            label="Bio"
            multiline
            rows={5}
            variant="outlined"
            className="bio-field"
            placeholder="I’am very talanted in coding"
            onChange={(e) => setBio(e.target.value)}
            required
          />
          <div className="submit-btns">
            <h6>
              <Link to="/">Skip For Now</Link>
            </h6>
            <input type="submit" value="Sign up" />
          </div>
        </form>
      </div>
    </div>
  );
}
