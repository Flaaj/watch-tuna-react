import React, {useState, useEffect, createRef} from "react";

const sampleRate = 44100; // Hz
// const sampleRate = 16000; // Hz
const timeWindowDuration = 10; // seconds
const samplesInWaveArray = sampleRate * timeWindowDuration;
const renderEveryNthSample = 1000;
const renderEveryNthMilisecond = 500;

const SoundWaveDisplay = () => {
    const [soundWave, setSoundWave] = useState([]);
    const [canvasRef, _] = useState(createRef());
    const [ctx, setCtx] = useState(null);
    const [adaptToDeviceWidth, setAdaptToDeviceWidth] = useState(
        window.innerWidth / samplesInWaveArray
    );

    const constructor = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        setCtx(context);

        let counter = 0;
        setInterval(() => {
            const wave = Array(samplesInWaveArray)
                .fill(0)
                .map(
                    (sample, index) =>
                        200 - Math.sin((index + counter++) / 100000) ** 2 * 200
                );
            setSoundWave(wave);
        }, renderEveryNthMilisecond);

        window.addEventListener("resize", () => {
            setAdaptToDeviceWidth(window.innerWidth / samplesInWaveArray);
        });
    };

    const draw = () => {
        if (ctx) {
            const path = new Path2D();
            ctx.fillStyle = "white";
            ctx.strokeStyle = "blue";
            ctx.lineWidth = adaptToDeviceWidth * renderEveryNthSample; 
            ctx.fillRect(0, 0, window.innerWidth, 200); // clear canvas
            path.moveTo(0, 0);
            soundWave.forEach((sample, index) => {
                if (!(index % renderEveryNthSample)) {
                    path.moveTo(index * adaptToDeviceWidth, 200);
                    path.lineTo(index * adaptToDeviceWidth, 200 - sample);
                }
            });
            ctx.stroke(path);
        }
    };

    useEffect(constructor, []);
    useEffect(draw, [soundWave]);

    return (
        <canvas width={window.innerWidth} height="200" ref={canvasRef}></canvas>
    );
};

export default SoundWaveDisplay;
