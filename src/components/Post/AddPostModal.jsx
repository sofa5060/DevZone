import React, { useState, useContext } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TextField from "@material-ui/core/TextField";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Backdrop from "@material-ui/core/Backdrop";
import "./PostModal.css";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../Contexts/UserContext";
import { createPost, uploadImage } from "../../dbServices";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const AddPostModal = ({ setOpen }) => {
  const classes = useStyles();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmited, setSubmit] = useState(false);
  const { user, isSignedIn } = useContext(UserContext);

  const getFile = () => {
    document.getElementById("photoURL").click();
  };

  const readURL = (input) => {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        document
          .getElementById("post-image")
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
    document.getElementById("post-image").setAttribute("src", "");
    document.getElementById("photoURL").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      return;
    }
    setSubmit(true);
    let imageURL = "";
    if (image) {
      imageURL = await uploadImage(image);
    }
    createPost({
      title,
      details,
      imageURL: imageURL,
      authorID: user.uid,
      authorImageURL: user.imageURL,
      authorFullName: user.fullName,
      date: new Date(),
      likes: [],
      comments: [],
    });
    setOpen(false);
  };

  const handleClick = () => {
    if (isSubmited) {
      return;
    }
    setOpen(false);
  };

  return (
    <Backdrop open={true} className={classes.backdrop}>
      <ClickAwayListener onClickAway={handleClick}>
        <form autoComplete="off" className="post-modal" onSubmit={handleSubmit}>
          {isSubmited ? (
            <div className="back-drop">
              <CircularProgress className="loading-spinner" />
            </div>
          ) : (
            ""
          )}
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            id="outlined-multiline-static"
            label="Post details"
            multiline
            rows={4}
            variant="outlined"
            style={{ margin: "20px 0" }}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
          {image ? (
            <div>
              <hr />
              <div className="image-container">
                <img src="" alt="post" id="post-image" />
                <HighlightOffIcon onClick={removeImage} />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="btns">
            <PhotoCameraIcon onClick={getFile} />
            <input
              accept="image/*"
              type="file"
              onChange={handleImage}
              id="photoURL"
              style={{ display: "none" }}
            />
            <input type="submit" value="Post" />
          </div>
        </form>
      </ClickAwayListener>
    </Backdrop>
  );
};

export default AddPostModal;
