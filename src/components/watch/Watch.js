import React from "react";
import "./watch.scss";
const Watch = ({ watchInfo, setCurrentWatch }) => {
    const { brand, model, name, mechanism, tickingFreq } = watchInfo;

    return (
        <div className="watch">
            <div className="watch__image-container">
                <img
                    height="80px"
                    width="80px"
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs.yimg.com%2Faah%2F4-watches%2Fmen-s-scuderia-ferrari-black-chronograph-leather-watch-830274-12.gif&f=1&nofb=1"
                    className="watch__image"
                ></img>
            </div>
            <div className="watch__container">
                <h2 className="watch__header">
                    {brand} {name ? `"${name}"` : undefined} {model}
                </h2>
                <div className="watch__row">
                    <p>
                        It's {mechanism} ticks {tickingFreq} times per second
                    </p>
                    <button
                        className="watch__btn"
                        onClick={() => setCurrentWatch(watchInfo)}
                    >
                        Select
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Watch;
