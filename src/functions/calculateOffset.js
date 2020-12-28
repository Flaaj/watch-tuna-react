const calculateOffset = (
    peakIndexes,
    sampleRate,
    targetFreq
) => {
    const distances = [];
    const targetDistance = ~~(sampleRate / targetFreq);
    for (let i = 0; i < peakIndexes.length - 1; i++) {
        const distance = peakIndexes[i + 1] - peakIndexes[i];
        if (targetDistance * 0.8 < distance && distance < targetDistance * 1.2)
            distances.push(distance);
    }

    const n = distances.length;
    const avg = distances.reduce((a, b) => a + b, 0) / n;
    const rms = (distances.reduce((p, c) => p + (c - avg) ** 2, 0) / n) ** 0.5;
    const tolerance = Math.max(avg * 0.02, 3 * rms);
    const filtered = distances.filter(
        (d) => avg - tolerance < d && d < avg + tolerance
    );
    
    const m = filtered.length;
    const avg2 = filtered.reduce((a, b) => a + b, 0) / m;

    const freq = sampleRate / avg2;
    const freqOffset = freq - targetFreq;
    const secondsPerDayOffset = (freqOffset * 60 * 60 * 24) / targetFreq;
    return [secondsPerDayOffset, freq];
};

export default calculateOffset;
