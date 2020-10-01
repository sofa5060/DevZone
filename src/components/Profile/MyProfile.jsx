import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { PostContext } from "../../Contexts/PostContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Skeleton from "@material-ui/lab/Skeleton";
import Navbar from "../Navbar/Navbar";
import PostsList from "../Post/PostsList";
import "./style.css";

const MyProfile = (props) => {
  const { user } = useContext(UserContext);
  const { posts } = useContext(PostContext);
  const [postsType, setType] = useState("userPosts");
  const [savedPosts, setSaved] = useState([]);
  const [userPosts, setuserPosts] = useState([]);

  useEffect(() => {
    const savedPostsIDs = user.saved;
    const userPostsIDs = user.posts;
    let savedPostsArr = [];
    let userPostsArr = [];
    posts.map((post) => {
      if (savedPostsIDs.includes(post.postID)) {
        console.log("yes");
        savedPostsArr = [...savedPostsArr, post];
      }
      if (userPostsIDs.includes(post.postID)) {
        userPostsArr = [...userPostsArr, post];
      }
    });
    setSaved(savedPostsArr);
    setuserPosts(userPostsArr);
  }, [user, posts]);

  const handleClick = (e) => {
    if (e.target.dataset.type === postsType) {
      return;
    }
    const segments = [...document.getElementById("segment").children];
    segments.forEach((segment) => {
      segment.classList.remove("active");
    });
    setType(e.target.dataset.type);
    e.target.classList.add("active");
  };

  return (
    <div>
      <Navbar />
      {user ? (
        <div className="profile-header">
          <div className="profile-image">
            {user.imageURL ? (
              <img src={user.imageURL} alt="" />
            ) : (
              <AccountCircleIcon
                style={{
                  color: "#C2C2C2",
                  fontSize: "200",
                  background: "#FFFFFF",
                }}
              />
            )}
          </div>
          <div className="profile-data">
            <h6>{user.title}</h6>
            <h1>{user.fullName}</h1>
            <h4>{user.bio}</h4>
            <h5>{user.email}</h5>
          </div>
          <div className="profile-stats">
            <div className="stats">
              <div className="col">
                <h3>Following</h3>
                <h2>{user.following.length}</h2>
              </div>
              <hr />
              <div className="col">
                <h3>Followers</h3>
                <h2>{user.followers.length}</h2>
              </div>
              <hr />
              <div className="col">
                <h3>Posts</h3>
                <h2>{user.posts.length}</h2>
              </div>
            </div>
            <div className="btns">
              <Link className="second-btn btn" to="/edit">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton
          animation="wave"
          style={{ maxWidth: "1200px", height: "380px", margin: "0 auto" }}
        />
      )}
      <div id="segment">
        <h2
          onClick={(e) => handleClick(e)}
          className="active"
          data-type="userPosts"
        >
          My Posts
        </h2>
        <h2 onClick={(e) => handleClick(e)} data-type="savedPosts">
          Saved Posts
        </h2>
      </div>
      <PostsList posts={postsType === "userPosts" ? userPosts : savedPosts} />
    </div>
  );
};

export default MyProfile;
