import React, {useState, useEffect} from "react";
import "./recorder.scss";
const MicrophoneStream = require("microphone-stream");
const Fili = require("fili");

const Recorder = ({setSoundWave, sampleRate, timeWindow}) => {
    const [audioStream, setAudioStream] = useState();
    const [filter, setFilter] = useState();

    useEffect(() => {
        const iirCalculator = new Fili.CalcCascades();
        const iirFilterCoeffs = iirCalculator.bandpass({
            order: 12,
            characteristic: "butterworth",
            Fs: sampleRate,
            Fc: 6200,
            BW: 1,
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
        console.log("XD", sampleRate)
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext({sampleRate: sampleRate});
        // const biquadFilter = audioContext.createBiquadFilter();
        // biquadFilter.connect(audioContext.destination);
        // biquadFilter.type = "bandpass";
        // biquadFilter.frequency.value = 6200;
        // biquadFilter.Q.value = 1000;

        const micStream = new MicrophoneStream({
            bufferSize: 16384,
            context: audioContext,
        });

        setAudioStream(micStream);
        navigator.mediaDevices
            .getUserMedia({audio: true, video: false})
            .then((stream) => {
                console.log("mic works");

                micStream.setStream(stream);
                micStream.on("data", (chunk) => {
                    const raw = MicrophoneStream.toRaw(chunk);
                    const filteredRaw = [];
                    raw.forEach((r) =>
                        filteredRaw.push(filter.singleStep(r * 100))
                    );
                    setSoundWave((prev) => {
                        const current = [...prev, ...filteredRaw];
                        // const current = [...prev, ...raw];
                        return current.length > sampleRate * timeWindow
                            ? current.slice(current.length - sampleRate * timeWindow)
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
