import React, { useEffect, useState } from "react";
import "./Register.css";
import { useNavigate, NavLink } from "react-router-dom";

const RegisterR = (props) => {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUserDetails] = useState({
        name: "",
        email: "",
        mobile: Number,
        password: "",
        cpassword: "",
        latitude: Number,
        longitude: Number
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
        if (!values.name) {
            error.name = "Name is required";
        } else if (values.name.length < 4) {
            error.name = "Name must be of minimum 3 characters";
        }
        if (!values.email) {
            error.email = "Email is required";
        } else if (!regex.test(values.email)) {
            error.email = "This is not a valid email format!";
        }
        if (!values.mobile) {
            error.mobile = "mobile is required";
        }
        else if (values.mobile.length !== 10) {
            error.mobile = "mobile must be of 10 digits";
        } else
            if (!values.password) {
                error.password = "Password is required";
            } else if (values.password.length < 4) {
                error.password = "Password must be more than 4 characters";
            } else if (values.password.length > 10) {
                error.password = "Password cannot exceed more than 10 characters";
            }
        if (!values.cpassword) {
            error.cpassword = "Confirm Password is required";
        } else if (values.cpassword !== values.password) {
            error.cpassword = "Confirm password and password should be same";
        }
        return error;
    };

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

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            await getLocation();
            setFormErrors(validateForm(user));

            fetch("/registerR", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            setIsSubmit(true);
            navigate("/receive");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <div className="register_f">
            <div className="RegisterContainer">
                <div className="register_form">
                <form autoComplete="off">
                    <h1>Create your account</h1>
                    <p className="name">{formErrors.name}</p>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        onChange={changeHandler}
                        value={user.name}
                    />
                    <p className="email">{formErrors.email}</p>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={changeHandler}
                        value={user.email}
                    />
                    <p className="phone">{formErrors.mobile}</p>
                    <input
                        type="Number"
                        name="mobile"
                        id="mobile"
                        placeholder="Mobile Number"
                        onChange={changeHandler}
                        value={user.mobile}
                    />
                    <p className="pass">{formErrors.password}</p>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={changeHandler}
                        value={user.password}
                    />
                    <p className="pass">{formErrors.cpassword}</p>
                    <input
                        type="password"
                        name="cpassword"
                        id="cpassword"
                        placeholder="Confirm Password"
                        onChange={changeHandler}
                        value={user.cpassword}
                    />
                    <button type="submit" onClick={signupHandler}>
                        Register &nbsp;<i class="fa-sharp fa-solid fa-address-card"></i>
                    </button>
                </form>
                <NavLink to="/loginR" className="link_next">Already registered? Login</NavLink>
            </div>
            </div>
            </div>
        </>
    );
};

export default RegisterR;