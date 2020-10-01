import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { PostContext } from "../../Contexts/PostContext";
import { getUserData, followUser, unFollowUser } from "../../dbServices";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Skeleton from "@material-ui/lab/Skeleton";
import Navbar from "../Navbar/Navbar";
import PostsList from "../Post/PostsList";
import "./style.css";

const Profile = (props) => {
  const id = props.match.params.uid;
  const [currUser, setCurrUser] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useContext(UserContext);
  const { posts } = useContext(PostContext);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!currUser) {
      return;
    }
    let postsArr = [];
    const userPostsIDs = currUser.posts;
    posts.map((post) => {
      if (userPostsIDs.includes(post.postID)) {
        postsArr = [...postsArr, post];
      }
    });
    setUserPosts(postsArr);
  }, [currUser, posts]);

  const getUser = async () => {
    let userData = await getUserData(id);
    if (userData) {
      setCurrUser(userData);
    } else {
      console.log("user not found");
    }
  };

  const follow = () => {
    followUser(user.uid, id);
    currUser.followers.push(user.uid);
  };

  const unFollow = () => {
    unFollowUser(user.uid, id);
    currUser.followers.pop();
  };

  return (
    <div>
      <Navbar />
      {currUser ? (
        <div className="profile-header">
          <div className="profile-image">
            {currUser.imageURL ? (
              <img src={currUser.imageURL} alt="" />
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
            <h6>{currUser.title}</h6>
            <h1>{currUser.fullName}</h1>
            <h4>{currUser.bio}</h4>
            <h5>{currUser.email}</h5>
          </div>
          <div className="profile-stats">
            <div className="stats">
              <div className="col">
                <h3>Following</h3>
                <h2>{currUser.following.length}</h2>
              </div>
              <hr />
              <div className="col">
                <h3>Followers</h3>
                <h2>{currUser.followers.length}</h2>
              </div>
              <hr />
              <div className="col">
                <h3>Posts</h3>
                <h2>{currUser.posts.length}</h2>
              </div>
            </div>
            {user.uid === id ? (
              <div className="btns">
                <Link className="second-btn btn" to="/edit">
                  Edit Profile
                </Link>
              </div>
            ) : (
              <div className="btns">
                {user.following.includes(id) ? (
                  <h4 className="second-btn btn" onClick={unFollow}>
                    Following
                  </h4>
                ) : (
                  <h4 className="follow-btn btn" onClick={follow}>
                    Follow
                  </h4>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <Skeleton
          animation="wave"
          style={{ maxWidth: "1200px", height: "380px", margin: "0 auto" }}
        />
      )}
      <PostsList posts={userPosts} />
    </div>
  );
};

export default Profile;
