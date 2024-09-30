import { useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/Authcontext";
import "./register.css";
import { loginCall } from "../../apiCalls";

export default function Register() {
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const passwordAgain = useRef(null);
  const navigate = useNavigate(null);
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        userName: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        loginCall(user, dispatch);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClickRedirectToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Media app</h3>
          <span className="loginDesc">Upload pictures and have fun.</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              ref={username}
              required
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              type="email"
              className="loginInput"
            />
            <input
              placeholder="Password"
              ref={password}
              required
              minLength={6}
              type="password"
              className="loginInput"
            />
            <input
              placeholder="Password Again"
              ref={passwordAgain}
              required
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
          </form>
          <button className="loginRegisterButton">Log into Account</button>
        </div>
      </div>
    </div>
  );
}
