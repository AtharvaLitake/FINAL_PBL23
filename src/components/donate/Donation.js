import React, { useState, useEffect } from "react";
import "./Donation.css";
import { NavLink } from "react-router-dom";
import Cards1 from "../cards/Cards1";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const Donation = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUserDetails] = useState({
    name: '',
    expiryDate: Date,
    quantity: Number,
    tag: '',
  })

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      let response;
      response = await fetch(`/SeeItems`);
      if (response.ok) {
        const responseData = await response.text();
        const jsonData = JSON.parse(responseData);
        setData(jsonData);
        setError(null);
        console.log(jsonData)
      } else {
        throw new Error('Error fetching data');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/AddItem', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    fetchData();
    navigate('/success');
  }

  return (
    <div className="main_container">
      <div className="DonationContainer">
        <div className="logo-section">
          <img src={logo} alt="..." />
        </div>

        <div className="inputcontainer">
          <h1>Donation page</h1>
          <form autoComplete="off">
            <div className="input_group">
              <label htmlFor="name">Food name</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                value={user.name}
                placeholder="Food name"
                onChange={changeHandler}
              />
            </div>
            <div className="input_group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <br />
              <input
                type="Date"
                name="expiryDate"
                id="expiryDate"
                value={user.expiryDate}
                onChange={changeHandler}
              />
            </div>
            <div className="input_group">
              <label htmlFor="quantity">Quantity</label>
              <br />
              <input
                type="Number"
                name="quantity"
                id="quantity"
                value={user.quantity}
                placeholder="No of People it can feed"
                onChange={changeHandler}
              />
            </div>
            <div className="input_group">
              <label htmlFor="tag">Food Item</label>
              <br />
              <input
                type="text"
                name="tag"
                id="tag"
                value={user.tag}
                placeholder="e.g.Curry,Chapati"
                onChange={changeHandler}
              />
            </div>
              <button className="submit-btn1" type="submit" onClick={handleSubmit}>
                Submit &nbsp;<i class="fa-solid fa-thumbs-up"></i>
              </button>
          </form>
        </div>
      </div>
      <div className="active_donations">
        <div className="heading-active">
          <h1>ACTIVE DONATIONS </h1>
        </div>
        <div className="prev-donations">
        </div>
      </div >
     <div className="cards-content">
          {data.map((item) => (
            <Cards1 name={item.name}
              expiryDate={item.expiryDate}
              Item={item.tag}
              shop={item.providerId.name}
              quantity={item.quantity}
              add={item.providerId.address}
              mobile={item.providerId.mobile}
              id={item._id}
            />
          ))}
        </div>

    </div>
  );
};

export default Donation;