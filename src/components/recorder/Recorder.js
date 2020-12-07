import React, {useState, useEffect} from "react";
import "./recorder.scss";
const MicrophoneStream = require("microphone-stream");
const Fili = require("fili");


const Recorder = ({setSoundWave, samplingRate}) => {
    const [audioContext, setAudioContext] = useState();
    const [filter, setFilter] = useState();

    useEffect(() => {
        const firCalculator = new Fili.FirCoeffs();
        const firFilterCoeffs = firCalculator.bandpass({
            order: 500,
            Fs: samplingRate,
            F1: 6000,
            F2: 6600,
        });
        const firFilter = new Fili.FirFilter(firFilterCoeffs);
        setFilter(firFilter);
    }, []);

    const startRecording = () => {
        audioContext && audioContext.stop();
        setSoundWave([]);
        const micStream = new MicrophoneStream({bufferSize: 4096});
        setAudioContext(micStream);
        navigator.mediaDevices
            .getUserMedia({audio: true, video: false})
            .then((stream) => {
                console.log("mic works");
                micStream.setStream(stream);
                micStream.on("format", () => ({
                    channels: 1,
                    bitDepth: 32,
                    sampleRate: samplingRate,
                    signed: true,
                    float: true,
                }));
                micStream.on("data", (chunk) => {
                    const raw = MicrophoneStream.toRaw(chunk);
                    const filteredRaw = [];
                    raw.forEach((r) =>
                        filteredRaw.push(filter.singleStep(r * 10))
                    );
                    setSoundWave((prev) => {
                        const current = [...prev, ...filteredRaw];
                        return current.length > 441000
                            ? current.slice(current.length - 441000)
                            : current;
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const stopRecording = () => {
        audioContext.stop();
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
