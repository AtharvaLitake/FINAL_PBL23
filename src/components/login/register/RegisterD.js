import React, { useState } from "react";
import "./Register.css";
import { useNavigate, NavLink } from "react-router-dom";

const RegisterR = (props) => {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUserDetails] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        address: "",
        cpassword: "",
        latitude: 0,
        longitude: 0
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...user,
            [name]: value,
        });
    };

    const validateForm = (values) => {
        const errors = {};
        const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.name) {
            errors.name = "Name is required";
        } else if (values.name.length < 3) {
            errors.name = "Name must be at least 3 characters";
        }

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid email format";
        }

        if (!values.mobile) {
            errors.mobile = "Mobile number is required";
        } else if (values.mobile.length !== 10) {
            errors.mobile = "Mobile number must be 10 digits";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be at least 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed 10 characters";
        }

        if (!values.cpassword) {
            errors.cpassword = "Confirm Password is required";
        } else if (values.cpassword !== values.password) {
            errors.cpassword = "Confirm password and password should be the same";
        }

        return errors;
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

            fetch("/registerD", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            navigate("/donate");
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
                        type="text"
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
                    <p className="address">{formErrors.address}</p>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Address"
                        onChange={changeHandler}
                        value={user.address}
                    />
                    <button type="submit" onClick={signupHandler}>
                        Register &nbsp;<i class="fa-sharp fa-solid fa-address-card"></i>
                    </button>
                </form>
                <div className="link_next">
                <NavLink to="/loginD" className="link_next">Already registered? Login</NavLink>
                </div>
              
            </div>
                </div>
        </div>


        </>
    );
};

export default RegisterR;
