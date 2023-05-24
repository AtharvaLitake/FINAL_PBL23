import React, { useState, useEffect } from "react";
import "./Profile.css";
import person from "../images/person.png";
import Cards1 from "../cards/Cards1";

const Profile = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    fetchData1();
  }, []);

  const fetchData1 = async () => {
    try {
      const response = await fetch(`/getProfile`);
      if (response.ok) {
        const responseData = await response.json();
        setData1(responseData);
        setError(null);
        console.log(responseData);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/SeeItems`);
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
        setError(null);
        console.log(responseData);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="profile1">
        <div className="card_image">
          <img src={person} alt="Profile" />
        </div>
        <div className="card_struct">
          <h5 className="card_title"><i class="fa-solid fa-user"></i>&nbsp;Profile</h5>
          <p>
            Name: {data1.name} <br />
            <hr />
            Address: {data1.address} <br />
            <hr />
            Mobile: {data1.mobile} <br />
            <hr />
            Gmail: {data1.email} <br />
            <hr />
          </p>
        </div>
      </div>
      <div className="heading-active">
        <h1>ACTIVE DONATIONS</h1>
      </div>
      <div className="cards-content">
        {data.map((item) => (
          <Cards1
            name={item.name}
            expiryDate={item.expiryDate}
            Item={item.tag}
            shop={item.providerId.name}
            quantity={item.quantity}
            add={item.providerId.address}
            mobile={item.providerId.mobile}
            id={item._id}
          />
        ))}
        ;
      </div>
    </div>
  );
};

export default Profile;
