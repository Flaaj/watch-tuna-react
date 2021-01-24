import React, { useState, useEffect } from "react";
import "./customSelect.scss";
import { toggleState } from "../../functions/customStateChangers";

const CustomSelect = ({
    display,
    attributes,
    sortBy,
    setSortBy,
    setSortReverse,
}) => {
    return (
        <div className="custom-select" style={{ display }}>
            <ul className="custom-select__list" name="sort" id="sort">
                {Object.keys(attributes).map((key) => (
                    <li
                        key={key}
                        className="custom-select__option"
                        onClick={() => {
                            if (sortBy == key) {
                                toggleState(setSortReverse);
                            } else {
                                setSortReverse(false);
                                setSortBy(key);
                            }
                        }}
                    >
                        {attributes[key]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomSelect;
