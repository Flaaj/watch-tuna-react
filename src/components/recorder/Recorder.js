import React, {useState, useEffect} from "react";
import "./recorder.scss";
const getUserMedia = require("get-user-media-promise");
const MicrophoneStream = require("microphone-stream");

const Recorder = ({setSoundWave}) => {
    const [audioContext, setAudioContext] = useState();
    // useEffect(() => {}, []);

    const startRecording = () => {
        audioContext && audioContext.stop();
        setSoundWave([]);
        const micStream = new MicrophoneStream({bufferSize: 2048});
        setAudioContext(micStream);
        getUserMedia({audio: true, video: false})
            .then((stream) => {
                console.log("mic works");
                micStream.setStream(stream);
                micStream.on("format", (format) => ({
                    channels: 1,
                    bitDepth: 32,
                    sampleRate: 44100,
                    sd: 3,
                    signed: true,
                    float: true,
                }));
                micStream.on("data", (chunk) => {
                    const raw = MicrophoneStream.toRaw(chunk).map(
                        (el) => el * 10000
                    );
                    setSoundWave((prev) => {
                        const current = [...prev, ...raw];
                        return current.length > 440000
                            ? current.slice(current.length - 440000)
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
