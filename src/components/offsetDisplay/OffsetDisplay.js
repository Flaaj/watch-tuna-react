import React from "react";
import "./offsetDisplay.scss";

const OffsetDisplay = ({
    offset,
    targetFreq,
    user,
    firebase,
    currentWatch,
}) => {
    const saveToDatabase = () => {
        const date = new Date().toLocaleString();
        firebase
            .database()
            .ref(
                "users/" +
                    user.uid +
                    "/watches/" +
                    currentWatch.watchID +
                    "/measurements/"
            )
            .push({ date, type: "recorded", result: offset[0] });
    };

    return (
        <div className="offset-display">
            {currentWatch && (
                <div className="row">
                    <button
                        className="offset-display__save-btn"
                        onClick={saveToDatabase}
                    >
                        Save measurement to database
                    </button>
                </div>
            )}
            <div className="offset-display__row">
                <span>Target frequency:</span>
                <div>
                    {targetFreq
                        ? targetFreq * 3600 + " BPH / " + targetFreq + "Hz"
                        : "-"}
                </div>
            </div>
            <div className="offset-display__row">
                <span>Measured frequency: </span>
                <div>
                    {offset && offset[1] ? offset[1].toFixed(8) + "Hz" : "-"}
                </div>
            </div>
            <div className="offset-display__row">
                <span>Calculated offset: </span>
                <div>
                    {offset && offset[0]
                        ? offset[0].toFixed(3) + "s per day"
                        : "-"}
                </div>
            </div>
        </div>
    );
};

export default OffsetDisplay;
