import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
// components:
import Header from "./components/header/Header";
import SoundWaveDisplay from "./components/soundWaveDisplay/SoundWaveDisplay";
import Recorder from "./components/recorder/Recorder";
import OffsetDisplay from "./components/offsetDisplay/OffsetDisplay";
import OptionsForm from "./components/optionsForm/OptionsForm";
import BottomMenu from "./components/bottomMenu/BottomMenu";
import Settings from "./components/settings/Settings";
import WatchList from "./components/watchList/WatchList";
// styles:
import "./app.scss";
// functions:
import findPeaks from "./functions/findPeaks";
import calculateOffset from "./functions/calculateOffset";

const App = () => {
    const [soundWave, setSoundWave] = useState([]);
    const [sampleRate, setSampleRate] = useState(44100); // Hz / samples per second
    const [timeWindow, setTimeWindow] = useState((16384 * 8) / 44100); // s
    const [targetFreq, setTargetFreq] = useState(6); // Hz / ticks per second
    const [peakIndexes, setPeakIndexes] = useState([]);
    const [filteredDistances, setFilteredDistances] = useState([]);
    const [secondsPerDayOffset, setSecondsPerDayOffset] = useState(0);
    const [currentWatch, setCurrentWatch] = useState("");

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
        <Router>
            <Header />
            <div className="app-container">
                <Route path="/tune">
                    {currentWatch && (
                        <div className="display-selected-watch">
                            <p>Measuring: </p>
                            <strong>{`${currentWatch.brand} "${currentWatch.name}" ${currentWatch.model}`}</strong>
                        </div>
                    )}
                    <SoundWaveDisplay
                        wave={soundWave}
                        sampleRate={sampleRate}
                        timeWindow={timeWindow}
                        peakIndexes={peakIndexes}
                    />
                    <OffsetDisplay offset={secondsPerDayOffset} />
                    <OptionsForm
                        setTargetFreq={setTargetFreq}
                        setSampleRate={setSampleRate}
                    />
                    <Recorder
                        setSoundWave={setSoundWave}
                        sampleRate={sampleRate}
                        timeWindow={timeWindow}
                        currentWatch={currentWatch}
                    />
                </Route>

                <Route path="/watches">
                    <WatchList
                        currentWatch={currentWatch}
                        setCurrentWatch={setCurrentWatch}
                    />
                </Route>

                <Route path="/settings">
                    <Settings />
                </Route>
            </div>
            <BottomMenu />
        </Router>
    );
};

ReactDOM.render(<App />, document.querySelector("#app"));
