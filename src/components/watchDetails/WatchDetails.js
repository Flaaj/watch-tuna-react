import React, { useState, useEffect } from "react";
import "./watchDetails.scss";

const WatchDetails = ({ watchInfo, user, firebase, notify }) => {
    const [brand, setBrand] = useState(watchInfo.brand);
    const [model, setModel] = useState(watchInfo.model);
    const [name, setName] = useState(watchInfo.name);
    const [mechanism, setMechanism] = useState(watchInfo.mechanism);
    const [text, setText] = useState(watchInfo.text);
    const [freq, setFreq] = useState(watchInfo.freq);
    const [serviceDate, setServiceDate] = useState(watchInfo.serviceDate);
    const [futureServiceDate, setFutureServiceDate] = useState(
        watchInfo.futureServiceDate
    );
    const [img, setImg] = useState(watchInfo.img);
    const [reload, setReload] = useState(false);
    const [measurements, setMeasurements] = useState([]);

    useEffect(() => {
        const measurements = [];
        for (let id in watchInfo.measurements) {
            measurements.push({ id, ...watchInfo.measurements[id] });
        }
        setMeasurements(measurements);
    }, [reload]);

    const updateWatchInfo = (e) => {
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
            .ref("users/" + user.uid + "/watches/" + watchInfo.watchID)
            .update(watchObject)
            .then(() => {
                notify("Watch details actualized.");
            })
            .catch((err) => {
                console.log(err);
                notify("Something went wrong :(");
            });
    };

    const deleteWatch = () => {
        firebase
            .database()
            .ref("users/" + user.uid + "/watches/" + watchInfo.watchID)
            .remove()
            .then(() => {
                notify("Watch deleted");
            })
            .catch((err) => {
                console.log(err);
                notify("Something went wrong :(");
            });
    };

    const deleteMeasurement = (id) => {
        firebase
            .database()
            .ref(
                "users/" +
                    user.uid +
                    "/watches/" +
                    watchInfo.watchID +
                    "/measurements/" +
                    id
            )
            .remove()
            .then(() => {
                notify("Measurement deleted");
                setReload((p) => !p);
            })
            .catch((err) => {
                console.log(err);
                notify("Something went wrong :(");
            });
    };

    return (
        <div className="watch-details">
            <form className="watch-details__edit" onSubmit={updateWatchInfo}>
                <div className="row">
                    <label htmlFor="brand">Brand: </label>
                    <input
                        id="brand"
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label htmlFor="model">Model: </label>
                    <input
                        id="model"
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label htmlFor="name">Name: </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label htmlFor="mechanism">Mechanism: </label>
                    <input
                        id="mechanism"
                        type="text"
                        value={mechanism}
                        onChange={(e) => setMechanism(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label htmlFor="serviceDate">last service date: </label>
                    <input
                        id="serviceDate"
                        type="date"
                        value={serviceDate}
                        onChange={(e) => setServiceDate(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label htmlFor="futureServiceDate">
                        Next planned service date:{" "}
                    </label>
                    <input
                        id="futureServiceDate"
                        type="date"
                        value={futureServiceDate}
                        onChange={(e) => setFutureServiceDate(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label htmlFor="text">Additional info: </label>
                    <textarea
                        id="text"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows="4"
                    />
                </div>
                <div className="row">
                    <label htmlFor="freq">Beat rate:</label>
                    <input
                        type="number"
                        step="0.5"
                        min="1"
                        max="60"
                        id="freq"
                        value={freq}
                        onChange={(e) => setFreq(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label htmlFor="img">Img url:</label>
                    <input
                        type="text"
                        id="img"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                    />
                </div>
                <button type="submit" className="watch-details__save-btn">
                    Save changes
                </button>
            </form>
            <h3 className="watch-details__measuremenents-heading">
                Past measurements:
            </h3>
            <ul className="watch-details__measurements-list">
                {measurements.length > 0 ? measurements.map(({ id, date, result }) => (
                    <div className="watch-details__measurement" key={date}>
                        <h4 className="watch-details__date">{date} :</h4>{" "}
                        <div>
                            <span>{result.toFixed(3)}s</span>
                            <button
                                className="watch-details__delete-measurement"
                                onClick={() => {
                                    deleteMeasurement(id);
                                }}
                            >
                                x
                            </button>
                        </div>
                    </div>
                )) : "-"}
            </ul>

            <button onClick={deleteWatch} className="watch-details__delete-watch">Delete this watch</button>
        </div>
    );
};

export default WatchDetails;
