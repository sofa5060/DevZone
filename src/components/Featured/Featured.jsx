import React, { useContext, useState, useEffect } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import { getFeaturedUsers, followUser, unFollowUser } from "../../dbServices";
import { UserContext } from "../../Contexts/UserContext";
import { Link } from "react-router-dom";
import "./Style.css";

const Featured = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const getUsers = async () => {
      const featuredUsers = await getFeaturedUsers();
      setUsers(featuredUsers);
    };
    getUsers();
  }, []);

  const showButtons = (uid, id) => {
    if (uid === id) {
      return "";
    }

    if (user.following.includes(id)) {
      return (
        <IndeterminateCheckBoxIcon
          style={{
            color: "#2FC2DF",
            fontSize: "18",
            cursor: "pointer",
            margin: "0 0 0 auto",
          }}
          onClick={() => unFollowUser(uid, id)}
        />
      );
    } else {
      return (
        <AddBoxIcon
          style={{
            color: "#2FC2DF",
            fontSize: "18",
            cursor: "pointer",
            margin: "0 0 0 auto",
          }}
          onClick={() => followUser(uid, id)}
        />
      );
    }
  };

  if (users.length) {
    return (
      <div className="featured-list">
        <h2>Featured: </h2>
        <div className="featured-users">
          {users.map((currUser) => (
            <div className="featured-user" key={currUser.userID}>
              <div className="user-image">
                {currUser.userData.imageURL ? (
                  <img src={currUser.userData.imageURL} alt="avatar" />
                ) : (
                  <AccountCircleIcon
                    style={{ color: "#C2C2C2", fontSize: "48" }}
                  />
                )}
              </div>
              <div className="user-details">
                <Link
                  to={
                    currUser.userID === user.uid
                      ? "/myprofile"
                      : `/users/${currUser.userID}`
                  }
                >
                  <h3>{currUser.userData.fullName}</h3>
                </Link>
                <h4>{currUser.userData.title}</h4>
              </div>
              {showButtons(user.uid, currUser.userID)}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return "";
  }
};

export default Featured;
