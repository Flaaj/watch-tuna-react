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
    const medianDistance = distances[~~(distances.length / 2)];
    const filtered = distances.filter(
        (dist) => medianDistance * 0.98 < dist && dist < medianDistance * 1.02
    );
    const avgDistance = filtered.reduce((a, b) => a + b, 0) / filtered.length;
    const freq = sampleRate / avgDistance;
    const freqOffset = freq - targetFreq;
    const secondsPerDayOffset = (freqOffset / targetFreq) * 60 * 60 * 24;
    return secondsPerDayOffset;
};

export default calculateOffset;