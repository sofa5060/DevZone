import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import UserInfo from "../User/UserInfo";
import Featured from "../Featured/Featured";
import Navbar from "../Navbar/Navbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Footer from "../Footer/Footer";
import "./style.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const HomePage = (props) => {
  const { authAlert, authAlertDispatcher, isSignedIn } = useContext(
    AuthContext
  );

  const handleClose = () => {
    authAlertDispatcher({ type: "CLOSE_ALERT" });
  };

  return (
    <div>
      <Navbar />
      <div className="home-page">
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
        <div className="left-col">
          <UserInfo />
          <Featured />
        </div>
        <div className="posts-list"></div>
        <div className="right-col">
          <Footer />
        </div>
        <Fab
          color="primary"
          aria-label="add"
          style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            background: "#2FC2DF",
          }}
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default HomePage;
