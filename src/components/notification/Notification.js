import React, { useState, useEffect } from "react";
import "./notification.scss";

const Notification = ({ setNotify }) => {
    const [message, setMessage] = useState("");
    const [notifDisplay, setNotifDisplay] = useState("none");

    useEffect(() => {
        setNotify(notify);
    }, []);

    const notify = () => (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setNotifDisplay("");
        }, 150);
        setTimeout(() => {
            setNotifDisplay("none");
        }, 3000);
    };

    return (
        <div className="notification" style={{ display: notifDisplay }}>
            {message}
        </div>
    );
};

export default Notification;
