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
    distances.sort();
    // setFilteredDistances(distances);

    // let medianDistance = distances[~~(distances.length / 2)];
    // let filtered = distances.filter(
    //     (dist) => medianDistance * 0.9995 <= dist && dist <= medianDistance * 1.0005
    // );

    // medianDistance = filtered[~~(filtered.length / 2)];
    // filtered = filtered.filter(
    //     (dist) => medianDistance * 0.98 < dist && dist < medianDistance * 1.02
    // );

    const avg = distances.reduce((a, b) => a + b, 0) / distances.length;
    const n = distances.length;
    const rm = distances.reduce((p, c) => p + (c - avg) ** 2, 0);
    const rms = (rm / n) ** 0.5 || 2;
    console.log(
        (rms / sampleRate).toFixed(6),
        (avg / sampleRate).toFixed(6),
        distances.length
    );
    const filtered = distances.filter(
        (d) => avg - 3 * rms < d && d < avg + 3 * rms
    );
    setFilteredDistances(filtered);

    // const avgDistance = filtered.reduce((a, b) => a + b, 0) / filtered.length;
    const freq = sampleRate / avg;
    const freqOffset = freq - targetFreq;
    const secondsPerDayOffset = (freqOffset * 60 * 60 * 24) / targetFreq;
    return [secondsPerDayOffset, freq];
};

export default calculateOffset;
