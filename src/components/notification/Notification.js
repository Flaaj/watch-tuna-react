import React, { useState, useEffect } from "react";
import "./notification.scss";

const Notification = ({ setNotify }) => {
    const [message, setMessage] = useState("");
    const [display, setNotifDisplay] = useState("none");

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
        <div className="notification" style={{ display }}>
            {message}
        </div>
    );
};

export default Notification;
