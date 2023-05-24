import React, { useState, useEffect } from "react";
import './Profile.css';
import person from '../images/person.png';

const Profile = () => {
    const [data1, setData1] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData1();
    }, []);

    const fetchData1 = async () => {
        try {
            const response = await fetch(`/viewProfile`);
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

    return (
        <div className="profile1">
            <div className="card_image">
                <img src={person} alt="Profile" />
            </div>
            <div className="card_struct">
                <h5 className="card_title"><i class="fa-solid fa-user"></i>&nbsp;Profile</h5>
                <p>
                    Name: {data1.name} <br />
                    <hr />
                    Mobile: {data1.mobile} <br />
                    <hr />
                    Gmail: {data1.email} <br />
                    <hr />
                </p>
            </div>
        </div>
    );
};

export default Profile;