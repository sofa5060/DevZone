import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "./Menu";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 580,
    margin: "0 20px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const handleSubmit = (e) => {
  e.preventDefault();
};

export default function Navbar() {
  const classes = useStyles();
  return (
    <nav>
      <div className="container">
        <Link to="/" className="logo">
          <img src={logo} alt=""/>
        </Link>
        <Paper
          component="form"
          className={classes.root + " search-bar"}
          onSubmit={handleSubmit}
        >
          <InputBase
            className={classes.input}
            placeholder="Search DevZone users"
            inputProps={{ "aria-label": "Search DevZone users" }}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Menu />
      </div>
    </nav>
  );
}
