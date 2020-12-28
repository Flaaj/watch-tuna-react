import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {Route, BrowserRouter as Router} from "react-router-dom";
// components:
import Header from "./components/header/Header";
import SoundWaveDisplay from "./components/soundWaveDisplay/SoundWaveDisplay";
import Recorder from "./components/recorder/Recorder";
import OffsetDisplay from "./components/offsetDisplay/OffsetDisplay";
import OptionsForm from "./components/optionsForm/OptionsForm";
import BottomMenu from "./components/bottomMenu/BottomMenu";
import Settings from "./components/settings/Settings";
import WatchList from "./components/watchList/WatchList";
import LandingScreen from "./components/landingScreen/LandingScreen";
// styles:
import "./app.scss";
// functions:
import findPeaks from "./functions/findPeaks";
import calculateOffset from "./functions/calculateOffset";
// firebase:
import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/firestore";
// import "firebase/analytics";
import "firebase/database";

const App = () => {
    const [soundWave, setSoundWave] = useState([]);
    const [sampleRate, setSampleRate] = useState(44100); // Hz / samples per second
    const [targetFreq, setTargetFreq] = useState(6); // Hz / ticks per second
    const [peakIndexes, setPeakIndexes] = useState([]);
    const [secondsPerDayOffset, setSecondsPerDayOffset] = useState([]);
    const [currentWatch, setCurrentWatch] = useState("");
    const [initialized, setInitialized] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        setTargetFreq(currentWatch.freq || 6);
    }, [currentWatch]);

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyCRjMs-2P66isqtPhRT-m0RT5o5XS8zyF4",
            authDomain: "watch-tuna.firebaseapp.com",
            databaseURL:
                "https://watch-tuna-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "watch-tuna",
            storageBucket: "watch-tuna.appspot.com",
            messagingSenderId: "826979927095",
            appId: "1:826979927095:web:784b37323b1b128d366bb2",
            // measurementId: "G-79T3MHZ7BG",
        };
        firebase.initializeApp(firebaseConfig);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setInitialized(true);
                // console.log(user);
            } else {
                // No user is signed in.
            }
        });
    }, []);

    useEffect(() => {
        setPeakIndexes(() => {
            const newPeakIndexes = [
                ...peakIndexes,
                ...findPeaks(soundWave, sampleRate, targetFreq, peakIndexes),
            ];

            setSecondsPerDayOffset(
                calculateOffset(
                    newPeakIndexes,
                    sampleRate,
                    targetFreq
                )
            );

            return newPeakIndexes;
        });
    }, [soundWave]);

    return (
        <Router>
            <Header />
            <div className="app-container">
                <Route exact path="/">
                    <LandingScreen
                        user={user}
                        setUser={setUser}
                        firebase={firebase}
                    />
                </Route>
                <Route exact path="/tune">
                    {currentWatch && (
                        <div className="display-selected-watch">
                            <p>Measuring: </p>
                            <strong>{`${currentWatch.brand} "${currentWatch.name}" ${currentWatch.model}`}</strong>
                        </div>
                    )}
                    <SoundWaveDisplay
                        soundWave={soundWave}
                        sampleRate={sampleRate}
                        peakIndexes={peakIndexes}
                    />
                    <OffsetDisplay
                        offset={secondsPerDayOffset}
                        targetFreq={targetFreq}
                        firebase={firebase}
                        user={user}
                        currentWatch={currentWatch}
                    />
                    <div className="row">
                        <OptionsForm
                            setTargetFreq={setTargetFreq}
                            setSampleRate={setSampleRate}
                            targetFreq={targetFreq}
                        />
                        <Recorder
                            setSoundWave={setSoundWave}
                            sampleRate={sampleRate}
                            currentWatch={currentWatch}
                            setPeakIndexes={setPeakIndexes}
                        />
                    </div>
                </Route>

                <Route exact path="/watches">
                    {initialized && (
                        <WatchList
                            user={user}
                            firebase={firebase}
                            currentWatch={currentWatch}
                            setCurrentWatch={setCurrentWatch}
                        />
                    )}
                </Route>

                <Route exact path="/settings">
                    <Settings />
                </Route>
            </div>
            <BottomMenu />
        </Router>
    );
};

ReactDOM.render(<App />, document.querySelector("#app"));
