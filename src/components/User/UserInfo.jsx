import React, { useContext } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { UserContext } from "../../Contexts/UserContext";
import "./style.css";

const UserInfo = ({ hideOnSmallScreen }) => {
  const { user, isSignedIn } = useContext(UserContext);

  if (isSignedIn) {
    return (
      <div className={hideOnSmallScreen ? "user-info hide" : "user-info"}>
        <div className="user-image">
          {user.imageURL ? (
            <img src={user.imageURL} alt="" />
          ) : (
            <AccountCircleIcon style={{ color: "#C2C2C2", fontSize: "104" }} />
          )}
        </div>
        <h2>{user.fullName || ""}</h2>
        <div className="user-details">
          <div className="col">
            <h4>Following</h4>
            <h3>{user.following.length || 0}</h3>
          </div>
          <hr />
          <div className="col">
            <h4>Posts</h4>
            <h3>{user.posts.length || 0}</h3>
          </div>
          <hr />
          <div className="col">
            <h4>Followers</h4>
            <h3>{user.followers.length || 0}</h3>
          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
};

export default UserInfo;
