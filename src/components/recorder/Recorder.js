import React, { useState, useEffect } from "react";
import "./recorder.scss";
import MicrophoneStream from "microphone-stream";
import Fili from "fili";

const Recorder = ({ setSoundWave, sampleRate, setPeakIndexes, filterParams }) => {
    const [audioStream, setAudioStream] = useState();
    const [filter, setFilter] = useState();

    useEffect(() => {
        const iirCalculator = new Fili.CalcCascades();
        const iirFilterCoeffs = iirCalculator.bandpass({
            order: 12,
            characteristic: "butterworth",
            Fs: sampleRate,
            Fc: filterParams[0],
            BW: filterParams[1], //** FILTER BANDWIDTH **//
        });

        const iirFilter = new Fili.IirFilter(iirFilterCoeffs);
        setFilter(iirFilter);
    }, [sampleRate]);

    const startRecording = () => {
        stopRecording(); // If previous recording wasnt stopped, do it now
        setSoundWave([]);
        setPeakIndexes([]);

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const context = new AudioContext({ sampleRate });

        const bufferSize =
            sampleRate > 50000
                ? 16384
                : sampleRate > 30000
                ? 16384 / 2
                : sampleRate > 20000
                ? 16384 / 8
                : 16384 / 16;

        const micStream = new MicrophoneStream({ bufferSize, context });
        setAudioStream(micStream);

        navigator.mediaDevices
            .getUserMedia({ audio: true, video: false })
            .then((stream) => {
                micStream.setStream(stream);
                micStream.on("data", (chunk) => {
                    const raw = MicrophoneStream.toRaw(chunk);
                    const filteredRaw = filter.multiStep(raw);
                    setSoundWave((prev) => [...prev, ...filteredRaw]);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const stopRecording = () => {
        audioStream && audioStream.stop();
    };

    return (
        <div className="recorder">
            <button className="recorder__btn" onClick={startRecording}>
                <i className="fas fa-microphone"></i>
                <p className="recorder__label">start recording</p>
            </button>
            <button className="recorder__btn" onClick={stopRecording}>
                <i className="fas fa-stop"></i>
                <p className="recorder__label">stop recording</p>
            </button>
        </div>
    );
};

export default Recorder;
