import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  return (
    <footer>
      <Link to="/">About</Link>
      <Link to="/">Terms</Link>
      <Link to="/">Privacy policy</Link>
      <Link to="/">Help</Link>
      <Link to="/">Open source</Link>
      <hr />
      <h3>© 2020 DevZone.</h3>
    </footer>
  );
};

export default Footer;
