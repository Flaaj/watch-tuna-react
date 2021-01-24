import React, { useState, useEffect, useRef, createRef } from "react";
import "./watchList.scss";
import Watch from "../../components/watch/Watch";
import AddNewWatch from "../../components/addNewWatch/AddNewWatch";
import CustomSelect from "../../components/customSelect/CustomSelect";
import { updateState, toggleState } from "../../functions/customStateChangers";

const WatchList = ({
    user,
    firebase,
    currentWatch,
    setCurrentWatch,
    notify,
}) => {
    const [watchList, setWatchList] = useState([]);
    const [filterForm, setFilterForm] = useState(false);
    const [filteringPhrase, setFilteringPhrase] = useState("");
    const [sortBy, setSortBy] = useState("brand");
    const [adding, setAdding] = useState(false);
    const [customSelectDisplay, setCustomSelectDisplay] = useState(false);
    const [sortReverse, setSortReverse] = useState(false);
    const inputRef = useRef(null);
    const attributes = {
        brand: "brand",
        model: "model",
        name: "name",
        serviceDate: "last service date",
        futureServiceDatse: "next service date",
        freq: "beat frequency",
        text: "additional info text",
    };

    const getWatches = () => {
        const watches = [];
        firebase
            .database()
            .ref("/users/" + user.uid)
            .once("value")
            .then((snapshot) => {
                for (let watchID in snapshot.val().watches) {
                    watches.push({
                        watchID,
                        ...snapshot.val().watches[watchID],
                    });
                }
                setSortReverse(false);
                setWatchList(watches);
            });
    };

    const watchFilter = (watch) => {
        const { brand, model, name, mechanism, freq } = watch;
        const lowerCasePhrase = filteringPhrase.toLowerCase();
        return (
            brand.toLowerCase().includes(lowerCasePhrase) ||
            model.toLowerCase().includes(lowerCasePhrase) ||
            name.toLowerCase().includes(lowerCasePhrase) ||
            mechanism.toLowerCase().includes(lowerCasePhrase) ||
            freq.toString().includes(lowerCasePhrase)
        );
    };

    const sortWatchList = () => {
        const list = [...watchList];
        list.sort((a, b) => (a[sortBy] >= b[sortBy] ? 1 : -1));
        setWatchList(sortReverse ? list.reverse() : list);
    };

    const handleFilterBtn = () => {
        filterForm == true && setFilteringPhrase("");
        toggleState(setFilterForm);
    };

    useEffect(() => {
        getWatches();
    }, []);

    useEffect(() => {
        filterForm && inputRef.current.focus();
    }, [filterForm]);

    useEffect(() => {
        setCustomSelectDisplay(false);
        sortWatchList();
    }, [sortBy, sortReverse]);

    return !watchList ? (
        <h1>loading...</h1>
    ) : !adding ? (
        <>
            <div className="watch-list">
                {filterForm && (
                    <input
                        type="text"
                        className="watch-list__input"
                        ref={inputRef}
                        placeholder="search phrase..."
                        value={filteringPhrase}
                        onChange={updateState(setFilteringPhrase)}
                    />
                )}
                <div>
                    Sorting by: {attributes[sortBy]}
                    {sortReverse ? ", reversed" : undefined}
                </div>
                {watchList.filter(watchFilter).map((watch) => (
                    <Watch
                        user={user}
                        firebase={firebase}
                        key={watch.watchID}
                        watchInfo={watch}
                        currentWatch={currentWatch}
                        setCurrentWatch={setCurrentWatch}
                        notify={notify}
                        getWatches={getWatches}
                    />
                ))}
                <button
                    className="watch-list__floating-btn watch-list__floating-btn--sort"
                    onClick={() => toggleState(setCustomSelectDisplay)}
                >
                    <i className="fas fa-sort"></i>
                </button>
                <button
                    className="watch-list__floating-btn watch-list__floating-btn--add-new"
                    onClick={() => {
                        setAdding(true);
                    }}
                >
                    +
                </button>
                <button
                    className="watch-list__floating-btn watch-list__floating-btn--filter"
                    onClick={handleFilterBtn}
                >
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <CustomSelect
                display={customSelectDisplay ? "" : "none"}
                attributes={attributes}
                sortBy={sortBy}
                setSortBy={setSortBy}
                setSortReverse={setSortReverse}
            />
        </>
    ) : (
        <AddNewWatch
            firebase={firebase}
            user={user}
            setAdding={setAdding}
            notify={notify}
            getWatches={getWatches}
        />
    );
};

export default WatchList;
