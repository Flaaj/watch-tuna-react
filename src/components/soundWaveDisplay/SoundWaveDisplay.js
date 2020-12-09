import React, {useState, useEffect, createRef} from "react";
import "./soundWaveDisplay.scss";

const timeWindowDuration = 10; // seconds
const renderEveryNthSample = 500;

const SoundWaveDisplay = ({wave, sampleRate}) => {
    const [canvasRef] = useState(createRef());
    const [ctx, setCtx] = useState(null);
    const [samplesInWaveArray] = useState(sampleRate * timeWindowDuration);

    const findPeaks = (data, peakWidth) => {
        const halfWidth = ~~(peakWidth / 2);
        const peakIndexes = [];
        for (let i = halfWidth; i < data.length - halfWidth; i++) {
            if (
                data.slice(i - halfWidth, i).every((samp) => samp <= data[i]) &&
                data.slice(i, i + halfWidth).every((samp) => samp <= data[i])
            ) {
                peakIndexes.push(i);
                i += 0.9 * halfWidth;
            }
        }
        const distances = [];
        for (let i = 0; i < peakIndexes.length - 1; i++) {
            distances.push(peakIndexes[i + 1] - peakIndexes[i]);
        }
        distances.sort();
        const median =
            distances.length % 2
                ? distances[(distances.length + 1) / 2]
                : distances[distances.length / 2];
        const filtered = distances.filter(
            (dist) => dist < median * 1.03 && dist > median * 0.98
        );
        const avgDistance = filtered.reduce((a, b) => a + b, 0) / filtered.length;
        const freq = 48000 / avgDistance
        const freqOffset = freq - 6;
        const secondsPerDayOffset = freqOffset / 6 * 60 * 60 * 24;
        console.log(secondsPerDayOffset);
        return peakIndexes;
    };

    const draw = () => {
        if (ctx) {
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 1; //redefine drawing style, because they reset when resizing
            ctx.clearRect(0, 0, window.innerWidth, 400); // clear canvas

            const peakIndexes = findPeaks(wave, sampleRate / 7);

            const width = window.innerWidth / samplesInWaveArray;
            const path = new Path2D();
            path.moveTo(0, 0);
            wave.forEach((sample, index) => {
                if (!(index % renderEveryNthSample) && sample > 0) {
                    path.moveTo(index * width, 0);
                    path.lineTo(index * width, sample * 10000);
                }
            });
            ctx.stroke(path);

            ctx.strokeStyle = "green";
            ctx.lineWidth = 0.5;
            const peakPath = new Path2D();
            peakIndexes.forEach((peakI, i) => {
                peakPath.moveTo(peakI * width, 0);
                peakPath.lineTo(peakI * width, 400);
            });
            ctx.stroke(peakPath);
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
    };

    useEffect(constructor, []);
    useEffect(draw);

    return (
        <div className="canvas-container">
            <canvas
                className="canvas"
                width={window.innerWidth}
                height="400"
                ref={canvasRef}
            ></canvas>
        </div>
    );
};

export default SoundWaveDisplay;
