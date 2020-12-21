const calculateOffset = (
    peakIndexes,
    filteredDistances,
    setFilteredDistances,
    sampleRate,
    targetFreq
) => {
    const distances = [...filteredDistances];
    for (let i = 0; i < peakIndexes.length - 1; i++) {
        distances.push(peakIndexes[i + 1] - peakIndexes[i]);
    }
    distances.sort();
    setFilteredDistances(distances);

    let medianDistance = distances[~~(distances.length / 2)];
    let filtered = distances.filter(
        (dist) => medianDistance * 0.99 < dist && dist < medianDistance * 1.01
    );

    let avgDistance = filtered.reduce((a, b) => a + b, 0) / filtered.length;
    let rms =
        (filtered.reduce((a, b) => a + (b - avgDistance) ** 2, 0) / filtered.length) **
        0.5;
    filtered = filtered.filter(
        (dist) => avgDistance - rms < dist && dist < avgDistance + rms
    );
    avgDistance = filtered.reduce((a, b) => a + b, 0) / filtered.length;
    const freq = sampleRate / avgDistance;
    const freqOffset = freq - targetFreq;
    const secondsPerDayOffset = (freqOffset / targetFreq) * 60 * 60 * 24;
    return [secondsPerDayOffset, freq]; //, rms, avg];
};

export default calculateOffset;
