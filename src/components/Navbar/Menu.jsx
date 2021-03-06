import React, { useState, useContext, useRef } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyles } from "@material-ui/core/styles";
import { signOut } from "../../dbServices";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { UserContext } from "../../Contexts/UserContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { user, isSignedIn } = useContext(UserContext);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const logOut = () => {
    signOut();
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  if (isSignedIn) {
    return (
      <div className={classes.root}>
        <div>
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="user-image">
              {user.imageURL ? (
                <img src={user.imageURL} alt="" />
              ) : (
                <AccountCircleIcon
                  style={{
                    color: "#C2C2C2",
                    fontSize: "50",
                  }}
                />
              )}
            </div>
            <ArrowDropDownIcon style={{ color: "#999999" }} />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <Link
                        to="/myprofile"
                        style={{
                          color: "rgba(0, 0, 0, 0.87)",
                          textDecoration: "none",
                        }}
                      >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                      </Link>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose && logOut}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  } else {
    return (
      <Link
        to="/signin"
        style={{
          color: "#2fc2df",
          textDecoration: "none",
          fontSize:"18px"
        }}
      >
        Sign in
      </Link>
    );
  }
}
