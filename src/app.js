import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Header from "./components/header/Header";
import SoundWaveDisplay from "./components/soundWaveDisplay/SoundWaveDisplay";
import Recorder from "./components/recorder/Recorder";
import "./app.scss";

const App = () => {
    const [soundWave, setSoundWave] = useState([]);
    const [sampleRate, setSampleRate] = useState(44100);
    // const [time, setTime] = useState(new Date().getTime())

    // useEffect(() => {
    //     console.log(soundWave.length, new Date().getTime() - time);
    // }, [soundWave]);

    return (
        <>
            <Header />
            <SoundWaveDisplay wave={soundWave} sampleRate={sampleRate} />
            <Recorder setSoundWave={setSoundWave} sampleRate={sampleRate} />
        </>
    );
};

ReactDOM.render(<App />, document.querySelector("#app"));
