import React from "react";
const Profile = ({ setUserState, username }) => {
    return (
        <div className="profile">
            <h1 style={{ color: "white" }}>Welcome {username} !!</h1>
            <button
                className="log"
                onClick={() => setUserState({})}
            >
                Logout
            </button>
        </div>
    );
};
export default Profile;