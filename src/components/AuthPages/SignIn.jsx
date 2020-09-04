import React from "react";
import image from "../../images/undraw_connected_8wvi1.png";
import logo from "../../images/Logo.png";
import { Link } from "react-router-dom";
import "./style.css";

const SignIn = () => {
  return (
    <div className="auth-page">
      <div className="site-description">
        <img src={logo} alt="logo" />
        <img src={image} alt="" className="image" />
        <h1>Build Your Community</h1>
        <h6>
          In euismod volutpat fermentum amet. Dictum est elementum auctor
          scelerisque. Sem sed habitant egestas amet imperdiet lectus dictum
          volutpat. Purus risus mauris dictum convallis odio egestas faucibus
          volutpat ut. Leo morbi facilisis tempor, mattis sapien eu tortor
          bibendum.
        </h6>
      </div>
      <div className="line"></div>
      <div className="auth-model">
        <h2>
          Welcome To <span>DevZone</span>
        </h2>
        <h6>
          DevZone is platform aim to bring all developers world wide to one
          place to share thier thoughts and enhance the realtions with each
          others
        </h6>
        <h1>Sign up</h1>
        <form className="auth-form">
          <div className="auth-fields">
            <div className="input-field">
              <h4>Email</h4>
              <input type="email" placeholder="Example@mail.com" required/>
            </div>
            <div className="input-field">
              <h4>Password</h4>
              <input type="password" placeholder="*************" required/>
            </div>
          </div>
          <a href="https://seifhany.com" className="forgot-password" >Forget Password?</a>
          <input type="submit" value="Sign in" />
        </form>
        <div className="or">
          <hr className="bar" />
          <span>OR</span>
          <hr className="bar" />
        </div>
        <h3>
          Not Member Yet? <Link to="signup">Sign up</Link>
        </h3>
      </div>
    </div>
  );
};

export default SignIn;
