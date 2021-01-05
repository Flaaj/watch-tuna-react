import React, { useState, useEffect } from "react";
import "./watchDetails.scss";

const WatchDetails = ({ watchInfo }) => {
    const { brand, model, name, mechanism, freq } = watchInfo;
    const [measurements, setMeasurements] = useState([]);

    useEffect(() => {
        const measurements = [];
        for (let id in watchInfo.measurements) {
            measurements.push(watchInfo.measurements[id]);
        }
        setMeasurements(measurements);
    }, []);

    return (
        <div>
            <ul className="">
                {measurements.map(({ date, result }) => (
                    <div className="watch__measurement" key={date}>
                        <h4>{date} :</h4> <span>{result.toFixed(3)}s</span>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default WatchDetails;
    