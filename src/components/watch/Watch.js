import React, { useState, useEffect } from "react";
import WatchDetails from "../watchDetails/WatchDetails";
import "./watch.scss";
const Watch = ({
    watchInfo,
    currentWatch,
    setCurrentWatch,
    user,
    notify,
    firebase,
}) => {
    const { brand, model, name, mechanism, freq, img } = watchInfo;
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <div className="watch">
                <div
                    className="watch__image-container"
                    onClick={() => setExpanded((prev) => !prev)}
                >
                    <img
                        // height="80px"
                        width="100px"
                        src={img || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs.yimg.com%2Faah%2F4-watches%2Fmen-s-scuderia-ferrari-black-chronograph-leather-watch-830274-12.gif&f=1&nofb=1"}
                        className="watch__image"
                    ></img>
                </div>
                <div className="watch__container">
                    <h2 className="watch__header">
                        {brand} {name ? `"${name}" ` : undefined}
                        {model}
                    </h2>
                    <div className="watch__row">
                        <p>
                            {mechanism} ({freq}Hz / {freq * 3600}BPH)
                        </p>
                        {watchInfo.watchID != currentWatch.watchID ? (
                            <button
                                className="watch__btn"
                                onClick={() => setCurrentWatch(watchInfo)}
                            >
                                Select
                            </button>
                        ) : (
                            <button
                                className="watch__btn"
                                style={{
                                    backgroundColor: "skyblue",
                                    width: 65,
                                    color: "black",
                                    marginRight: 5,
                                }}
                            >
                                Selected
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {expanded && (
                <WatchDetails
                    watchInfo={watchInfo}
                    user={user}
                    firebase={firebase}
                    notify={notify}
                />
            )}
        </>
    );
};

export default Watch;
