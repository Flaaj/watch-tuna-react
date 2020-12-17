import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./watchList.scss";
import Watch from "../../components/watch/Watch";
import { Route } from "react-router-dom";

const userID = 1;

const WatchList = ({ currentWatch, setCurrentWatch }) => {
    const [watchList, setWatchList] = useState();
    const [filterForm, setFilterForm] = useState(false);
    const [filteringPhrase, setFilteringPhrase] = useState("");
    const inputRef = useRef(null);

    const getWatches = async () => {
        const response = await fetch(`http://localhost:3000/users/${userID}/`);
        const json = await response.json();
        setWatchList(json.watches);
    };

    const watchFilter = (watch) => {
        const { brand, model, name, mechanism, tickingFreq } = watch;
        const lowerCasePhrase = filteringPhrase.toLowerCase();
        return (
            brand.toLowerCase().includes(lowerCasePhrase) ||
            model.toLowerCase().includes(lowerCasePhrase) ||
            name.toLowerCase().includes(lowerCasePhrase) ||
            mechanism.toLowerCase().includes(lowerCasePhrase) ||
            tickingFreq.toString().includes(lowerCasePhrase)
        );
    };

    const handleFilteringPhraseChange = ({ target: { value } }) =>
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
    ) : (
        <>
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
                        key={watch.id}
                        watchInfo={watch}
                        currentWatch={currentWatch}
                        setCurrentWatch={setCurrentWatch}
                    />
                ))}
                <button className="watch-list__floating-btn--add-new watch-list__floating-btn">
                    <Link to="/add">+</Link>
                </button>
                <button
                    className="watch-list__floating-btn--filter watch-list__floating-btn"
                    onClick={handleFilterBtn}
                >
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <Route path="/add">
                <form action="">
                    <input type="text" />
                    <input type="text" />
                </form>
            </Route>
        </>
    );
};

export default WatchList;
