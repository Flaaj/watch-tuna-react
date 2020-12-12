import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./components/header/Header";
import SoundWaveDisplay from "./components/soundWaveDisplay/SoundWaveDisplay";
import Recorder from "./components/recorder/Recorder";
import OffsetDisplay from "./components/offsetDisplay/OffsetDisplay";
import "./app.scss";
import findPeaks from "./functions/findPeaks";
import calculateOffset from "./functions/calculateOffset";
import OptionsForm from "./components/optionsForm/OptionsForm";

const App = () => {
    const [soundWave, setSoundWave] = useState([]);
    const [sampleRate, setSampleRate] = useState(44100); // Hz / samples per second
    const [timeWindow, setTimeWindow] = useState((16384 * 8) / 44100); // s
    const [targetFreq, setTargetFreq] = useState(6); // Hz / ticks per second
    const [peakIndexes, setPeakIndexes] = useState([]);
    const [filteredDistances, setFilteredDistances] = useState([]);
    const [secondsPerDayOffset, setSecondsPerDayOffset] = useState(0);

    useEffect(() => {
        setPeakIndexes(() => {
            const peakIndexes = findPeaks(soundWave, sampleRate, targetFreq);

            setSecondsPerDayOffset(
                calculateOffset(
                    peakIndexes,
                    filteredDistances,
                    setFilteredDistances,
                    sampleRate,
                    targetFreq
                )
            );

            return peakIndexes;
        });
    }, [soundWave]);

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
            <OptionsForm
                setTargetFreq={setTargetFreq}
                setSampleRate={setSampleRate}
            />
        </>
    );
};

ReactDOM.render(<App />, document.querySelector("#app"));
