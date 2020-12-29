import React, {useState, useEffect} from "react";
import "./watch.scss";
const Watch = ({watchInfo, currentWatch, setCurrentWatch}) => {
    const {brand, model, name, mechanism, freq} = watchInfo;
    const [expanded, setExpanded] = useState(false);

    const measurements = [];
    for (let id in watchInfo.measurements) {
        measurements.push(watchInfo.measurements[id]);
    }

    return (
        <>
            <div className="watch">
                <div
                    className="watch__image-container"
                    onClick={() => setExpanded((prev) => !prev)}
                >
                    <img
                        height="80px"
                        width="80px"
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs.yimg.com%2Faah%2F4-watches%2Fmen-s-scuderia-ferrari-black-chronograph-leather-watch-830274-12.gif&f=1&nofb=1"
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
                            It's {mechanism} ticks {freq} times per second
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
                <ul className="">
                    {measurements.map(({date, result}) => (
                        <div>
                            <h4>{date} :</h4> <span>{result.toFixed(3)}s</span>
                        </div>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Watch;
