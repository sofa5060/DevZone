import React, { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { PostContext } from "../../Contexts/PostContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import UserInfo from "../User/UserInfo";
import Featured from "../Featured/Featured";
import Navbar from "../Navbar/Navbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Footer from "../Footer/Footer";
import AddPostModal from "../Post/AddPostModal";
import PostSummary from "./PostSummary";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PostDetails = (props) => {
  const { authAlert, authAlertDispatcher, isSignedIn } = useContext(
    UserContext
  );
  const { posts } = useContext(PostContext);
  const [open, setOpen] = useState(false);
  let post = posts.find((post) => post.postID === props.match.params.id);

  const handleClose = () => {
    authAlertDispatcher({ type: "CLOSE_ALERT" });
  };

  return (
    <div>
      <Navbar />
      <div className="home-page">
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
        <div className="posts-list">{post && <PostSummary post={post} showComments/>}</div>
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
            transform: open ? "rotate(-45deg)" : "rotate(0deg)",
            transition: "all 0.5s ease",
          }}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
        {open ? <AddPostModal setOpen={setOpen} /> : ""}
      </div>
    </div>
  );
};

export default PostDetails;
