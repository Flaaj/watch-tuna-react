import React, { useState, useEffect, useRef } from "react";
import "./watchList.scss";
import Watch from "../../components/watch/Watch";

const userID = 1;

const WatchList = ({ setCurrentWatch }) => {
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
        const lowerPhrase = filteringPhrase.toLowerCase();
        return (
            brand.toLowerCase().includes(lowerPhrase) ||
            model.toLowerCase().includes(lowerPhrase) ||
            name.toLowerCase().includes(lowerPhrase) ||
            mechanism.toLowerCase().includes(lowerPhrase) ||
            tickingFreq.toString().includes(lowerPhrase)
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
        <div className="watch-list">
            {filterForm && (
                <input
                    type="text"
                    className="watch-list__input"
                    ref={inputRef}
                    value={filteringPhrase}
                    onChange={handleFilteringPhraseChange}
                />
            )}
            {watchList.filter(watchFilter).map((watch) => (
                <Watch
                    key={watch.id}
                    watchInfo={watch}
                    setCurrentWatch={setCurrentWatch}
                />
            ))}
            <button className="watch-list__add-new-watch watch-list__floating-btn">
                +
            </button>
            <button
                className="watch-list__filter-watches watch-list__floating-btn"
                onClick={handleFilterBtn}
            >
                <i className="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>
    );
};

export default WatchList;
