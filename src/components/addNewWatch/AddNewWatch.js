import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import "./addNewWatch.scss"

const AddNewWatch = ({firebase, user, setAdding}) => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [freq, setFreq] = useState();
    const [mechanism, setMechanism] = useState("");

    const submitWatch = () => {
        const watchObject = {
            brand,
            model,
            name,
            mechanism,
            freq,
            text,
        };

        firebase
            .database()
            .ref("users/" + user.uid + "/watches/")
            .push(watchObject);
        const history = useHistory();
        history.push("/watches");
    };

    return (
        <>
            <form className="add-watch" onSubmit={submitWatch}>
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
                    <label htmlFor="brand">Model: </label>
                    <input
                        id="model"
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label htmlFor="brand">Name: </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label htmlFor="brand">Mechanism: </label>
                    <input
                        id="mechanism"
                        type="text"
                        value={mechanism}
                        onChange={(e) => setMechanism(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label htmlFor="brand">Additional info: </label>
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
                        id="freq"
                        value={freq}
                        onChange={(e) => setFreq(e.target.value)}
                    />
                </div>
                <button type="submit">Add new watch</button>
                <button onClick={() => setAdding(false)}>Cancel</button>
            </form>
        </>
    );
};

export default AddNewWatch;
