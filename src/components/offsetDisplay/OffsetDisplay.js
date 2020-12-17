import React, {useState, useEffect} from "react";
import "./offsetDisplay.scss"

const OffsetDisplay = ({offset}) => {
    return <div className="offset-display">{offset || 0}</div>;
};

export default OffsetDisplay;
