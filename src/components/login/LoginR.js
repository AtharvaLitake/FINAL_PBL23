import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Rlog from "../images/Receiverlog.png";

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserDetails((prevUser) => ({
            ...prevUser,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

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
    getLocation();
    setFormErrors(validateForm(user));
    fetch("/loginR", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if(!formErrors){ setIsSubmit(true);}
    if(setIsSubmit){
        navigate("/receive");
    }
  };

  return (
    <div className="login-box">
      <div className="login-image">
        <img src={Rlog} alt="" />
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
            required
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
            required
          />
          <p className="password">{formErrors.password}</p>
          <button type="submit" onClick={loginHandler}>
            Login &nbsp;<i class="fa-solid fa-right-to-bracket"></i>
          </button>{" "}
          <br></br>
          <div className="link_next">
            <NavLink to="/RegisterR" className="link_next">
              Not yet registered? Register Now
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;