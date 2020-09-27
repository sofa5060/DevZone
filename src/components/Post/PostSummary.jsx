import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./style.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { UserContext } from "../../Contexts/UserContext";
import { likePostWithUID, disLikePostWithUID } from "../../dbServices";
import Comments from "./Comments";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const PostSummary = ({ post, showComments }) => {
  const { postData, postID } = post;
  const { dispatch, user } = useContext(UserContext);

  const likePost = () => {
    likePostWithUID(user.uid, postID);
  };

  const disLikePost = () => {
    disLikePostWithUID(user.uid, postID);
  };

  const savePost = () => {
    dispatch({ type: "SAVE_POST", postID });
  };

  const unSavePost = () => {
    dispatch({ type: "UNSAVE_POST", postID });
  };

  return (
    <div className="post">
      <Link to={"/users/" + postData.authorID}>
        {postData.authorImageURL ? (
          <img
            src={postData.authorImageURL}
            alt="avatar"
            className="post-avatar"
          />
        ) : (
          <AccountCircleIcon
            style={{
              color: "#C2C2C2",
              fontSize: "50",
              background: "#FFFFFF",
            }}
          />
        )}
      </Link>
      <div className="post-details">
        <h2>{postData.title}</h2>
        <h3>
          {moment(postData.date.toDate()).fromNow()} - BY:{" "}
          {postData.authorFullName}
        </h3>
        <div className="post-content">
          <h4>{postData.details}</h4>
          {postData.imageURL && <img src={postData.imageURL} alt="post" />}
        </div>
        <div className="post-actions">
          <div className="left">
            <div className="container">
              {postData.likes.includes(user.uid) ? (
                <FavoriteIcon
                  style={{ color: "#F55050" }}
                  onClick={disLikePost}
                />
              ) : (
                <FavoriteBorderIcon
                  style={{ color: "#F55050" }}
                  onClick={likePost}
                />
              )}
              <h5>{postData.likes.length}</h5>
            </div>
            <div className="container">
              <Link to={`posts/${postID}`}>
                <CommentIcon style={{ color: "#333333" }} />
              </Link>
              <h5>{postData.comments.length}</h5>
            </div>
          </div>
          <div className="right">
            {user.saved.includes(postID) ? (
              <BookmarkIcon style={{ color: "#333333" }} onClick={unSavePost} />
            ) : (
              <BookmarkBorderIcon
                style={{ color: "#333333" }}
                onClick={savePost}
              />
            )}
          </div>
        </div>
        {showComments && <Comments postID={postID} postData={postData} />}
      </div>
    </div>
  );
};

export default React.memo(PostSummary);
