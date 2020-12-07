import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Header from "./components/header/Header";
import SoundWaveDisplay from "./components/soundWaveDisplay/SoundWaveDisplay";
import Recorder from "./components/recorder/Recorder";
import "./app.scss";

const App = () => {
    const [soundWave, setSoundWave] = useState([]);

    useEffect(() => {
        console.log(soundWave);
    }, [soundWave]);

    return (
        <>
            <Header />
            <SoundWaveDisplay wave={soundWave} />
            <Recorder setSoundWave={setSoundWave} />
        </>
    );
};

ReactDOM.render(<App />, document.querySelector("#app"));