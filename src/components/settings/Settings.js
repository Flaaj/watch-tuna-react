import React, { useEffect, useState } from "react";
import "./settings.scss";

const Settings = ({ user, firebase }) => {
    const [username, setUsername] = useState(user.username || "");

    const handleNameSubmit = (e) => {
        e.preventDefault()
        firebase    
            .database()
            .ref("users/" + user.uid + "/username/")
            .set(username)
            .then(() => {
                console.log("changed username");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="settings">
            <form action="" onSubmit={handleNameSubmit}>
                <label htmlFor="username">Set your username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </form>
        </div>
    );
};

export default Settings;
