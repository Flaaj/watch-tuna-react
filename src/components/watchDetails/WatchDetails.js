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
    const [futureServiceDate, setFutureServiceDate] = useState(watchInfo.futureServiceDate);
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
            .ref("users/" + user.uid + "/watches/" + watchInfo.watchID + "/measurements/" + id)
            .remove()
            .then(() => {
                notify("Measurement deleted");
                toggleState(setReload);
            })
            .catch((err) => {
                console.log(err);
                notify("Something went wrong :(");
            });
    };

    const toggleState = (setState) => {
        setState((bool) => !bool);
    };

    const updateState = (setState) => ({ target: { value } }) => {
        setState(value);
    };

    return (
        <div className="watch-details">
            <form className="watch-details__edit" onSubmit={updateWatchInfo}>
                <div className="watch-details__row">
                    <label htmlFor="brand">Brand: </label>
                    <input id="brand" type="text" value={brand} onChange={updateState(setBrand)} />
                </div>
                <div className="watch-details__row">
                    <label htmlFor="model">Model: </label>
                    <input id="model" type="text" value={model} onChange={updateState(setModel)} />
                </div>
                <div className="watch-details__row">
                    <label htmlFor="name">Name: </label>
                    <input id="name" type="text" value={name} onChange={updateState(setName)} />
                </div>
                <div className="watch-details__row">
                    <label htmlFor="mechanism">Mechanism: </label>
                    <input
                        id="mechanism"
                        type="text"
                        value={mechanism}
                        onChange={updateState(setMechanism)}
                    />
                </div>
                <div className="watch-details__row">
                    <label htmlFor="serviceDate">last service date: </label>
                    <input
                        id="serviceDate"
                        type="date"
                        value={serviceDate}
                        onChange={updateState(setServiceDate)}
                    />
                </div>
                <div className="watch-details__row">
                    <label htmlFor="futureServiceDate">Next planned service date: </label>
                    <input
                        id="futureServiceDate"
                        type="date"
                        value={futureServiceDate}
                        onChange={updateState(setFutureServiceDate)}
                    />
                </div>
                <div className="watch-details__row">
                    <label htmlFor="text">Additional info: </label>
                    <textarea
                        id="text"
                        type="text"
                        value={text}
                        onChange={updateState(setText)}
                        rows="4"
                    />
                </div>
                <div className="watch-details__row">
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
                <div className="watch-details__row">
                    <label htmlFor="img">Img url:</label>
                    <input type="text" id="img" value={img} onChange={updateState(setImg)} />
                </div>
                <button type="submit" className="watch-details__save-btn">
                    Save changes
                </button>
            </form>
            <h3 className="watch-details__measuremenents-heading">Past measurements:</h3>
            <ul className="watch-details__measurements-list">
                {measurements.length > 0
                    ? measurements.map(({ id, date, result }) => (
                          <li className="watch-details__measurement" key={date}>
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
                          </li>
                      ))
                    : "-"}
            </ul>

            <button onClick={deleteWatch} className="watch-details__delete-watch">
                Delete this watch
            </button>
        </div>
    );
};

export default WatchDetails;
