import React, {useState, useEffect, createRef} from "react";
import "./soundWaveDisplay.scss";

const renderEveryNthSample = 100;
const canvasHeight = 200;

const SoundWaveDisplay = ({wave, sampleRate, timeWindow, peakIndexes}) => {
    const [canvasRef, setCanvasRef] = useState(createRef());
    const [ctx, setCtx] = useState(null);

    const constructor = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        setCtx(context);
    };

    const draw = () => {
        if (ctx) {
            ctx.clearRect(0, 0, window.innerWidth, canvasHeight); // clear canvas
            const width = window.innerWidth / sampleRate / timeWindow;

            // drawing sound wave:
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 1;
            const wavePath = new Path2D();
            wave.forEach((sample, index) => {
                if (!(index % renderEveryNthSample) && sample > 0) {
                    wavePath.moveTo(index * width, 0);
                    wavePath.lineTo(index * width, sample * 10000);
                }
            });
            ctx.stroke(wavePath);

            // drawing detected peaks:
            ctx.strokeStyle = "green";
            ctx.lineWidth = 0.5;
            const peakPath = new Path2D();
            peakIndexes.forEach((peak) => {
                peakPath.moveTo(peak * width, 0);
                peakPath.lineTo(peak * width, canvasHeight);
            });
            ctx.stroke(peakPath);
        }
    };

    useEffect(constructor, []);
    useEffect(draw);

    return (
        <div className="canvas-container">
            <canvas
                className="canvas"
                width={window.innerWidth}
                height={canvasHeight}
                ref={canvasRef}
            ></canvas>
        </div>
    );
};

export default SoundWaveDisplay;
