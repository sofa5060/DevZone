import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import firebase from "firebase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const HomePage = (props) => {
  const { authAlert, authAlertDispatcher, isSignedIn } = useContext(
    AuthContext
  );
  const handleClick = () => {
    firebase.auth().signOut();
  };

  const handleClose = () => {
    authAlertDispatcher({ type: "CLOSE_ALERT" });
  };

  return (
    <div>
        {!isSignedIn && <Redirect to="/signin" />}
      <Snackbar
        open={authAlert.isShowen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={authAlert.type}>
          {authAlert.msg}
        </Alert>
      </Snackbar>
      <button onClick={handleClick}>Sign Out</button>
    </div>
  );
};

export default HomePage;
