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
    setFilteredDistances(distances);
    distances.sort();
    let medianDistance = distances[~~(distances.length / 2)];
    let filtered = distances.filter(
        (dist) => medianDistance * 0.95 < dist && dist < medianDistance * 1.05
    );
    medianDistance = filtered[~~(filtered.length / 2)];
    filtered = filtered.filter(
        (dist) => medianDistance * 0.99 < dist && dist < medianDistance * 1.01
    );
    const avgDistance = filtered.reduce((a, b) => a + b, 0) / filtered.length;
    const freq = sampleRate / avgDistance;
    const freqOffset = freq - targetFreq;
    const secondsPerDayOffset = (freqOffset / targetFreq) * 60 * 60 * 24;
    return secondsPerDayOffset;
};

export default calculateOffset;