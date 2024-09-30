import React, { useRef, useContext } from "react";
import "./login.css";
import { AuthContext } from "../../context/Authcontext";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import { loginCall } from "../../apiCalls";

export default function Login() {
  const email = useRef(null);
  const password = useRef(null);
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate(null);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  const handleClickRedirectToRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  console.log(isFetching);
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
              placeholder="Email"
              type="email"
              required
              ref={email}
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength={6}
              ref={password}
              className="loginInput"
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="secondary" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className="loginRegisterButton"
              onClick={handleClickRedirectToRegister}
            >
              {isFetching ? (
                <CircularProgress color="secondary" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
