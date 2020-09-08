import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

const Footer = () => {
  return (
    <footer>
      <Link>About</Link>
      <Link>Terms</Link>
      <Link>Privacy policy</Link>
      <Link>Help</Link>
      <Link>Open source</Link>
      <hr />
      <h3>© 2020 DevZone.</h3>
    </footer>
  );
};

export default Footer;
