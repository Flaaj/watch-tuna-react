import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Header from "./components/header/Header";
import SoundWaveDisplay from "./components/soundWaveDisplay/SoundWaveDisplay";
import "./app.scss";

const App = () => {
    return (
        <>
            <Header />
            <SoundWaveDisplay />
        </>
    );
};

ReactDOM.render(<App />, document.querySelector("#app"));
