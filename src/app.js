import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Header from "./components/header/Header";
import SoundWaveDisplay from "./components/soundWaveDisplay/SoundWaveDisplay";
import Recorder from "./components/recorder/Recorder";
import OffsetDisplay from "./components/offsetDisplay/OffsetDisplay";
import "./app.scss";
import findPeaks from "./functions/findPeaks";
import calculateOffset from "./functions/calculateOffset";

const App = () => {
    const [soundWave, setSoundWave] = useState([]);
    const [sampleRate, setSampleRate] = useState(44100); // Hz / samples per second
    const [timeWindow, setTimeWindow] = useState(10); // s
    const [targetFreq, setTargerFreq] = useState(6); // Hz / ticks per second
    const [peakIndexes, setPeakIndexes] = useState([]);
    const [secondsPerDayOffset, setSecondsPerDayOffset] = useState(0);
    // const [time, setTime] = useState(new Date().getTime())

    useEffect(() => {
        setPeakIndexes(findPeaks(soundWave, sampleRate, targetFreq));
    }, [soundWave]);

    useEffect(() => {
        setSecondsPerDayOffset(
            calculateOffset(peakIndexes, sampleRate, targetFreq)
        );
    }, [peakIndexes]);

    return (
        <>
            <Header />
            <SoundWaveDisplay
                wave={soundWave}
                sampleRate={sampleRate}
                timeWindow={timeWindow}
                peakIndexes={peakIndexes}
            />
            <OffsetDisplay offset={secondsPerDayOffset} />
            <Recorder
                setSoundWave={setSoundWave}
                sampleRate={sampleRate}
                timeWindow={timeWindow}
            />
        </>
    );
};

ReactDOM.render(<App />, document.querySelector("#app"));
