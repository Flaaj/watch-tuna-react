import React, {useState, useEffect, createRef} from "react";
import "./soundWaveDisplay.scss";

// number should be a power of 2 to ensure nice redrawing.
const canvasHeight = 200;

const SoundWaveDisplay = ({soundWave, sampleRate, peakIndexes}) => {
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
            ctx.clearRect(0, 0, window.innerWidth, canvasHeight); // clear canvas before redrawing
            const width = window.innerWidth / sampleRate / timeWindow;

            // drawing sound wave:
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 1;
            const wavePath = new Path2D();
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
            ctx.strokeStyle = "grey";
            ctx.lineWidth = 1;
            const peakPath = new Path2D();
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
    }, []);

    useEffect(draw, [indexes]);

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
