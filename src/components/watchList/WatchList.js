import React, {useState, useEffect, useRef} from "react";
import "./watchList.scss";
import Watch from "../../components/watch/Watch";
import AddNewWatch from "../../components/addNewWatch/AddNewWatch";
import {Route, Link, BrowserRouter as Router} from "react-router-dom";

const WatchList = ({user, firebase, currentWatch, setCurrentWatch}) => {
    const [watchList, setWatchList] = useState([]);
    const [filterForm, setFilterForm] = useState(false);
    const [filteringPhrase, setFilteringPhrase] = useState("");
    const inputRef = useRef(null);
    const [adding, setAdding] = useState(false);

    const getWatches = () => {
        const watches = [];
        firebase
            .database()
            .ref("/users/" + user.uid)
            .once("value")
            .then((snapshot) => {
                for (let watchID in snapshot.val().watches) {
                    watches.push({watchID, ...snapshot.val().watches[watchID]});
                }
                setWatchList(watches);
            });
    };

    const watchFilter = (watch) => {
        const {brand, model, name, mechanism, freq} = watch;
        const lowerCasePhrase = filteringPhrase.toLowerCase();
        return (
            brand.toLowerCase().includes(lowerCasePhrase) ||
            model.toLowerCase().includes(lowerCasePhrase) ||
            name.toLowerCase().includes(lowerCasePhrase) ||
            mechanism.toLowerCase().includes(lowerCasePhrase) ||
            freq.toString().includes(lowerCasePhrase)
        );
    };

    const handleFilteringPhraseChange = ({target: {value}}) =>
        setFilteringPhrase(value);

    const handleFilterBtn = () => {
        setFilterForm((p) => !p);
    };

    useEffect(() => {
        getWatches();
    }, []);

    useEffect(() => {
        filterForm && inputRef.current.focus();
    }, [filterForm]);

    return !watchList ? (
        <h1>loading...</h1>
    ) : !adding ? (
        <div className="watch-list">
            {filterForm && (
                <input
                    type="text"
                    className="watch-list__input"
                    ref={inputRef}
                    placeholder="search phrase..."
                    value={filteringPhrase}
                    onChange={handleFilteringPhraseChange}
                />
            )}
            {watchList.filter(watchFilter).map((watch) => (
                <Watch
                    key={watch.watchID}
                    watchInfo={watch}
                    currentWatch={currentWatch}
                    setCurrentWatch={setCurrentWatch}
                />
            ))}
            <button
                className="watch-list__floating-btn--add-new watch-list__floating-btn"
                onClick={() => {
                    setAdding(true);
                }}
            >
                +
            </button>
            <button
                className="watch-list__floating-btn--filter watch-list__floating-btn"
                onClick={handleFilterBtn}
            >
                <i className="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>
    ) : (
        <AddNewWatch firebase={firebase} user={user} setAdding={setAdding} />
    );
};

export default WatchList;
