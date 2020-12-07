import React, {useState, useEffect, createRef} from "react";

const sampleRate = 44100; // Hz
// const sampleRate = 16000; // Hz
const timeWindowDuration = 10; // seconds
const samplesInWaveArray = sampleRate * timeWindowDuration;
const renderEveryNthSample = 5;

const SoundWaveDisplay = ({wave}) => {
    const [canvasRef, _] = useState(createRef());
    const [ctx, setCtx] = useState(null);

    const draw = () => {
        if (ctx) {
            ctx.fillStyle = "white";
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 1;
            ctx.fillRect(0, 0, window.innerWidth, 400); // clear canvas
            const path = new Path2D();
            path.moveTo(0, 0);
            const width = window.innerWidth / samplesInWaveArray;
            wave.forEach((sample, index) => {
                if (!(index % renderEveryNthSample)) {
                    path.moveTo(index * width, 400);
                    path.lineTo(index * width, 400 - sample ** 2 * 10);

                    // console.log(index * width, 100 - sample / 100)
                }
            });
            ctx.stroke(path);
        }
    };

    const constructor = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        setCtx(context);
        // let counter = 0;
        // setInterval(() => {
        //     const wave = Array(samplesInWaveArray)
        //         .fill(0)
        //         .map(
        //             (sample, index) =>
        //                 200 - Math.sin((index + counter++) / 100000) ** 2 * 200
        //         );
        //     setSoundWave(wave);
        // }, renderEveryNthMilisecond);

        window.addEventListener("resize", () => {
            setAdaptToDeviceWidth(window.innerWidth / samplesInWaveArray);
            // draw()
        });
    };

    useEffect(constructor, []);
    useEffect(draw);

    return (
        <canvas width={window.innerWidth} height="400" ref={canvasRef}></canvas>
    );
};

export default SoundWaveDisplay;