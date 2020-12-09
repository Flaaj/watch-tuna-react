import React, {useState, useEffect} from "react";
import "./recorder.scss";
const MicrophoneStream = require("microphone-stream");
const Fili = require("fili");

const Recorder = ({setSoundWave, sampleRate}) => {
    const [audioStream, setAudioStream] = useState();
    const [filter, setFilter] = useState();

    useEffect(() => {
        const iirCalculator = new Fili.CalcCascades();
        const iirFilterCoeffs = iirCalculator.highpass({
            order: 12,
            characteristic: "butterworth",
            Fs: sampleRate,
            Fc: 6000,
            // BW: 0,
            // gain: 1,
        });
        const iirFilter = new Fili.IirFilter(iirFilterCoeffs);

        // const firCalculator = new Fili.FirCoeffs();
        // const firFilterCoeffs = firCalculator.bandpass({
        //     order: 500,
        //     Fs: sampleRate,
        //     F1: 6000,
        //     F2: 6600,
        // });
        // const firFilter = new Fili.FirFilter(firFilterCoeffs);

        setFilter(iirFilter);
    }, []);

    const startRecording = () => {
        audioStream && audioStream.stop();
        setSoundWave([]);

        // const AudioContext = window.AudioContext || window.webkitAudioContext;
        // const audioContext = new AudioContext();
        // const biquadFilter = audioContext.createBiquadFilter();
        // biquadFilter.type = "bandpass";
        // biquadFilter.frequency.value = 2000;
        // biquadFilter.Q.value = 300;
        // biquadFilter.connect(audioContext.destination);

        const micStream = new MicrophoneStream({
            bufferSize: 16384,
            // context: audioContext,
        });

        setAudioStream(micStream);
        navigator.mediaDevices
            .getUserMedia({audio: true, video: false})
            .then((stream) => {
                console.log("mic works");

                micStream.setStream(stream);
                micStream.on("format", (format) =>
                    ({
                        channels: 1,
                        bitDepth: 32,
                        sampleRate: sampleRate,
                        signed: true,
                        float: true,
                    })
                );
                micStream.on("data", (chunk) => {
                    const raw = MicrophoneStream.toRaw(chunk);
                    const filteredRaw = [];
                    raw.forEach((r) =>
                        filteredRaw.push(filter.singleStep(r * 100))
                    );
                    setSoundWave((prev) => {
                        const current = [...prev, ...filteredRaw];
                        return current.length > sampleRate * 10
                            ? current.slice(current.length - sampleRate * 10)
                            : current;
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const stopRecording = () => {
        audioStream.stop();
    };

    return (
        <div>
            <button className="siema" onClick={startRecording}>
                start recording
            </button>
            <button className="siema" onClick={stopRecording}>
                stop recording
            </button>
        </div>
    );
};

export default Recorder;
