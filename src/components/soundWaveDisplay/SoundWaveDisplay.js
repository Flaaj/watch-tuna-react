import React, { useState, useEffect, createRef } from "react";
import "./soundWaveDisplay.scss";

const canvasHeight = 200;

const SoundWaveDisplay = ({ soundWave, sampleRate, peakIndexes }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [canvasRef, setCanvasRef] = useState(createRef());
    const [ctx, setCtx] = useState();

    const renderEveryNthSample =
        sampleRate > 50000
            ? 256
            : sampleRate >= 40000
            ? 128
            : sampleRate > 20000
            ? 64
            : 32;

    const timeWindow = ~~((16384 * 16) / 44100);
    const len = sampleRate * timeWindow;
    const cutOffLength = soundWave.length > len ? soundWave.length - len : 0;
    const wave = soundWave.slice(cutOffLength);
    const indexes = peakIndexes
        .filter((p) => p > cutOffLength)
        .map((p) => p - cutOffLength);

    const draw = () => {
        if (ctx) {
            ctx.clearRect(0, 0, windowWidth, canvasHeight); // clear canvas before redrawing
            const width = windowWidth / sampleRate / timeWindow;

            // drawing sound wave:
            const wavePath = new Path2D();
            ctx.strokeStyle = "blue";
            wave.forEach((sample, index) => {
                if (
                    !(index % renderEveryNthSample) ||
                    indexes.includes(index)
                ) {
                    wavePath.lineTo(
                        index * width,
                        Math.min(sample * 100000, canvasHeight - 20)
                    );
                }
            });
            ctx.stroke(wavePath);

            // drawing detected peaks as lines:
            const peakPath = new Path2D();
            ctx.strokeStyle = "grey";
            indexes.forEach((peak) => {
                peakPath.moveTo(
                    peak * width,
                    Math.min(wave[peak] * 100000 + 10, canvasHeight - 10)
                );
                peakPath.lineTo(peak * width, canvasHeight);
            });
            ctx.stroke(peakPath);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        setCtx(context);

        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    useEffect(draw, [indexes]);

    return (
        <div className="canvas-container">
            <canvas
                className="canvas"
                width={windowWidth}
                height={canvasHeight}
                ref={canvasRef}
            ></canvas>
        </div>
    );
};

export default SoundWaveDisplay;
