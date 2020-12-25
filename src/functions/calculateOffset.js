const calculateOffset = (
    peakIndexes,
    filteredDistances,
    setFilteredDistances,
    sampleRate,
    targetFreq
) => {
    const distances = [...filteredDistances];
    const targetDistance = ~~(sampleRate / targetFreq);
    for (let i = 0; i < peakIndexes.length - 1; i++) {
        const distance = peakIndexes[i + 1] - peakIndexes[i];
        if (targetDistance * 0.8 < distance && distance < targetDistance * 1.2)
            distances.push(distance);
    }
    // distances.sort();

    const n = distances.length;
    const avg = distances.reduce((a, b) => a + b, 0) / n;
    const rms = (distances.reduce((p, c) => p + (c - avg) ** 2, 0) / n) ** 0.5;
    const filtered = distances.filter(
        (d) => avg - 3 * rms < d && d < avg + 3 * rms
    );
    
    setFilteredDistances(filtered);

    const freq = sampleRate / avg;
    const freqOffset = freq - targetFreq;
    const secondsPerDayOffset = (freqOffset * 60 * 60 * 24) / targetFreq;
    return [secondsPerDayOffset, freq];
};

export default calculateOffset;
