import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Donorlog from "../images/Donorlog.png";

const LoginD = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    fetch("/loginD", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    setIsSubmit(true);

    navigate("/donate");
  };

  return (
    <div className="login-box">
      <div className="login-image">
        <img src={Donorlog} alt="" />
      </div>
      <div className="LoginContainer">
        <form autoComplete="off">
          <h1>Login</h1>
          <label>
            E-MAIL&nbsp;<i class="fa-solid fa-envelope"></i>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={user.email}
           />
          <p className="pass">{formErrors.email}</p>
          <label>
            PASSWORD&nbsp;<i class="fa-solid fa-key"></i>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          <p className="password">{formErrors.password}</p>
          <button type="submit" onClick={loginHandler}>
            Login &nbsp;<i class="fa-solid fa-right-to-bracket"></i>
          </button>{" "}
          <br></br>
          <div className="link_next">
            <NavLink to="/registerD"  className="link_next">Not yet registered? Register Now</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginD;
