import React, { useEffect, useState } from "react";
import "./settings.scss";
import WatchDetails from "../watchDetails/WatchDetails";

const Settings = ({ user, firebase, filterParams, setFilterParams, currentWatch }) => {
    const [username, setUsername] = useState(user.username || "");
    const [filtA, setFiltA] = useState(~~filterParams[0] - ~~(filterParams[1] / 2));
    const [filtB, setFiltB] = useState(~~filterParams[0] + ~~(filterParams[1] / 2));

    const handleNameSubmit = (e) => {
        e.preventDefault();
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

    useEffect(() => {
        setFilterParams([(filtA + ~~filtB) / 2, filtB - filtA + 1]);
    }, [filtA, filtB]);

    return (
        <div className="settings">
            <form action="" onSubmit={handleNameSubmit}>
                <h2 className="settings__heading">Basic settings:</h2>
                <div className="row">
                    <label htmlFor="username">Set your username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={({ target: { value } }) => setUsername(value)}
                    />
                </div>
            </form>
            <div className="row">
                <label htmlFor="filtA">Lower filter cutoff frequency </label>
                <input
                    type="text"
                    id="filtA"
                    value={filtA}
                    onChange={({ target: { value } }) => setFiltA(~~value)}
                />
            </div>
            <div className="row">
                <label htmlFor="filtB">Upper filter cutoff frequency: </label>
                <input
                    type="text"
                    id="filtB"
                    value={filtB}
                    onChange={({ target: { value } }) => setFiltB(~~value)}
                />
            </div>
            {currentWatch && (
                <div>
                    <h2 className="settings__heading">
                        {currentWatch.brand} {currentWatch.model}:
                    </h2>
                    <WatchDetails watchInfo={currentWatch} user={user} firebase={firebase} />
                </div>
            )}
        </div>
    );
};

export default Settings;
