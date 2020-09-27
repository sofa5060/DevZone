import React, { useContext, useState } from "react";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./style.css";
import { UserContext } from "../../Contexts/UserContext";
import uuid from "uuid/dist/v4";
import { addComment } from "../../dbServices";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

const Comments = ({ postData, postID }) => {
  const { user } = useContext(UserContext);
  const { comments } = postData;
  const reversedComments = [...comments].reverse();
  const [commentContent, updateComment] = useState("");
  const [commentImage, updateImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      content: commentContent,
      image: commentImage,
      authorUid: user.uid,
      authorImage: user.imageURL,
      authorName: user.fullName,
      date: new Date(),
      id: uuid(),
    };
    addComment(postID, comment);
    updateComment("");
  };

  return (
    <div className="comments">
      <hr />
      <form className="comment-field" onSubmit={handleSubmit}>
        <div className="comment-inputs">
          <div className="user-image">
            {user.imageURL ? (
              <img src={user.imageURL} alt="" />
            ) : (
              <AccountCircleIcon style={{ color: "#C2C2C2", fontSize: "42" }} />
            )}
          </div>
          <TextField
            id="standard-textarea"
            label="Add your comment"
            multiline
            placeholder="Hello there (:"
            onChange={(e) => updateComment(e.target.value)}
            value={commentContent}
            required
            style={{ width: "100%", margin: "0 20px" }}
          />
          <CameraAltIcon style={{ color: "#555555", cursor: "pointer" }} />
        </div>
        <input type="submit" value="COMMENT" />
      </form>
      {reversedComments.map((comment) => (
        <div className="comment-field" key={comment.id}>
          <div className="comment-data">
            <div className="user-image">
              {comment.authorImage ? (
                <img src={comment.authorImage} alt="" />
              ) : (
                <AccountCircleIcon
                  style={{
                    color: "#C2C2C2",
                    fontSize: "50",
                    background: "#FFFFFF",
                  }}
                />
              )}
            </div>
            <div className="comment-details">
              <div className="title">
                <h3>{comment.authorName}</h3>
                <h5>{moment(comment.date.toDate()).fromNow()}</h5>
              </div>
              <h4>{comment.content}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
