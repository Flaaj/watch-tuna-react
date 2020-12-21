import React, {useState, useEffect} from "react";
import "./offsetDisplay.scss";

const OffsetDisplay = ({offset, targetFreq}) => {
    return (
        <div className="offset-display">
            <div className="row">
                <span>Target frequency:</span>
                <div>{targetFreq ? targetFreq + "Hz" : "-"}</div>
            </div>
            <div className="row">
                <span>Measured frequency: </span>
                <div>
                    {offset && offset[1] ? offset[1].toFixed(8) + "Hz" : "-"}
                </div>
            </div>
            <div className="row">
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
