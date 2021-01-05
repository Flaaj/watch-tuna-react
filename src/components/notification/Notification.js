import React, { useState, useEffect } from "react";
import "./notification.scss";

const Notification = ({ setNotify }) => {
    const [message, setMessage] = useState("");
    const [display, setDisplay] = useState("none");

    useEffect(() => {
        setNotify(notify);
    }, []);

    const notify = (msg) => {
        console.log("siema")
        setMessage(msg);
        setTimeout(() => {
            setDisplay("")
        }, 300);
        setTimeout(() => {
            setDisplay("none")
        }, 5000);
    };

    return (
        <div className="notification" style={{ display: display }}>
            {message}
        </div>
    );
};

export default Notification;
