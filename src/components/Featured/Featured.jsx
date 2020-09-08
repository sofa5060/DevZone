import React, { useContext } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import "./Style.css";

const Featured = () => {
  return (
    <div className="featured-list">
      <h2>Featured: </h2>
      <div className="featured-users">
        <div className="featured-user">
          <div className="user-image">
            <AccountCircleIcon style={{ color: "#C2C2C2", fontSize: "48" }} />
          </div>
          <div className="user-details">
            <h3>Amir Hesham Ibrahim</h3>
            <h4>Full-Stack Developer</h4>
          </div>
          <AddBoxIcon
            style={{
              color: "#2FC2DF",
              fontSize: "18",
              cursor: "pointer",
              margin: "0 0 0 auto",
            }}
          />
        </div>
        <div className="featured-user">
          <div className="user-image">
            <AccountCircleIcon style={{ color: "#C2C2C2", fontSize: "48" }} />
          </div>
          <div className="user-details">
            <h3>Seif Hany Abdulfatah</h3>
            <h4>Front-end Developer</h4>
          </div>
          <AddBoxIcon
            style={{
              color: "#2FC2DF",
              fontSize: "18",
              cursor: "pointer",
              margin: "0 0 0 auto",
            }}
          />
        </div>
        <div className="featured-user">
          <div className="user-image">
            <AccountCircleIcon style={{ color: "#C2C2C2", fontSize: "48" }} />
          </div>
          <div className="user-details">
            <h3>Abdulaziz Albadawi</h3>
            <h4>Data Analyst</h4>
          </div>
          <IndeterminateCheckBoxIcon
            style={{
              color: "#2FC2DF",
              fontSize: "18",
              cursor: "pointer",
              margin: "0 0 0 auto",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;
