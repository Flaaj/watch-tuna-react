import React, { useState, useEffect } from "react";
import "./addNewWatch.scss";
import { updateState } from "../../functions/customStateChangers";

const AddNewWatch = ({ firebase, user, setAdding, notify, getWatches }) => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [freq, setFreq] = useState(6);
    const [serviceDate, setServiceDate] = useState("1900-01-01");
    const [futureServiceDate, setFutureServiceDate] = useState("2020-12-31");
    const [img, setImg] = useState("");
    const [mechanism, setMechanism] = useState("");

    const submitWatch = (e) => {
        e.preventDefault();

        const watchObject = {
            brand,
            model,
            name,
            mechanism,
            freq,
            serviceDate,
            futureServiceDate,
            img,
            text,
        };

        firebase
            .database()
            .ref("users/" + user.uid + "/watches/")
            .push(watchObject)
            .then(() => {
                setAdding(false);
                getWatches();
                notify("Succesfully added new watch");
            });
    };

    return (
        <div className="add-watch">
            <form className="add-watch__form" onSubmit={submitWatch}>
                <h2 className="add-watch__heading">Add new watch</h2>
                <div className="add-watch__row">
                    <label htmlFor="brand">Brand: </label>
                    <input
                        id="brand"
                        type="text"
                        value={brand}
                        onChange={updateState(setBrand)}
                    />
                </div>
                <div className="add-watch__row">
                    <label htmlFor="model">Model: </label>
                    <input
                        id="model"
                        type="text"
                        value={model}
                        onChange={updateState(setModel)}
                    />
                </div>
                <div className="add-watch__row">
                    <label htmlFor="name">Name: </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={updateState(setName)}
                    />
                </div>
                <div className="add-watch__row">
                    <label htmlFor="mechanism">Mechanism: </label>
                    <input
                        id="mechanism"
                        type="text"
                        value={mechanism}
                        onChange={updateState(setMechanism)}
                    />
                </div>
                <div className="add-watch__row">
                    <label htmlFor="serviceDate">Last service date: </label>
                    <input
                        id="serviceDate"
                        type="date"
                        value={serviceDate}
                        onChange={updateState(setServiceDate)}
                    />
                </div>
                <div className="add-watch__row">
                    <label htmlFor="futureServiceDate">
                        Next planned service date:
                    </label>
                    <input
                        id="futureServiceDate"
                        type="date"
                        value={futureServiceDate}
                        onChange={updateState(setFutureServiceDate)}
                    />
                </div>
                <div className="add-watch__row">
                    <label htmlFor="brand">Additional info: </label>
                    <textarea
                        id="brand"
                        type="text"
                        value={text}
                        onChange={updateState(setText)}
                        rows="4"
                    />
                </div>
                <div className="add-watch__row">
                    <label htmlFor="freq">Beat rate:</label>
                    <input
                        type="number"
                        step="0.5"
                        min="1"
                        max="60"
                        id="freq"
                        value={freq}
                        onChange={updateState(setFreq)}
                    />
                </div>
                <div className="add-watch__row">
                    <label htmlFor="img">Img url:</label>
                    <input
                        type="text"
                        id="img"
                        value={img}
                        onChange={updateState(setImg)}
                    />
                </div>
                <button type="submit">Add new watch</button>
                <button onClick={() => setAdding(false)}>Cancel</button>
            </form>
        </div>
    );
};

export default AddNewWatch;
