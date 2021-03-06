import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import "./header.scss";

const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <img src="./src/assets/vector_tuna.svg" />
                <span>Watch Tuna</span>
            </Link>
        </div>
    );
};

export default Header;
