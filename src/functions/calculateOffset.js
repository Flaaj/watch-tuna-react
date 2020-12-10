const calculateOffset = (peakIndexes, sampleRate, targetFreq) => {
    const distances = [];
    for (let i = 0; i < peakIndexes.length - 1; i++) {
        distances.push(peakIndexes[i + 1] - peakIndexes[i]);
    }
    distances.sort();
    const medianDistance = distances[~~(distances.length / 2)];
    const filtered = distances.filter(
        (dist) => medianDistance * 0.95 < dist && dist < medianDistance * 1.05
    );
    const avgDistance = filtered.reduce((a, b) => a + b, 0) / filtered.length;
    const freq = sampleRate / avgDistance;
    const freqOffset = freq - targetFreq;
    const secondsPerDayOffset = (freqOffset / targetFreq) * 60 * 60 * 24;
    return secondsPerDayOffset;
};

export default calculateOffset;
