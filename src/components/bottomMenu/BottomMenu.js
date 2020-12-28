import React from "react";
import { Link } from "react-router-dom";
import "./bottomMenu.scss";

const BottomMenu = () => {
    return (
        <div className="bottom-menu">
            <ul className="bottom-menu__list">
                <li className="bottom-menu__item">
                    <Link className="bottom-menu__link" to="/tune">
                        Tune
                    </Link>
                </li>
                <li className="bottom-menu__item">
                    <Link className="bottom-menu__link" to="/watches">
                        Watches
                    </Link>
                </li>
                <li className="bottom-menu__item">
                    <Link className="bottom-menu__link" to="/settings">
                        Settings
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default BottomMenu;
