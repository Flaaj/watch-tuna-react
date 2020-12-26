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

    const distDict = {};

    // if (distances.length % 1000 == 0) {
    //     distances.forEach((distance) => {
    //         distDict[distance] = distDict[distance]
    //             ? distDict[distance] + 1
    //             : 1;
    //     });
    //     let [maxValue, maxValueKey] = [0, 0];
    //     for (const [key, value] of Object.entries(distDict)) {
    //         if (value > maxValue) {
    //             [maxValue, maxValueKey] = [value, key];
    //         }
    //     }
    // }

    const n = distances.length;
    const avg = distances.reduce((a, b) => a + b, 0) / n;
    const rms = (distances.reduce((p, c) => p + (c - avg) ** 2, 0) / n) ** 0.5;
    const filtered = distances.filter(
        (d) => avg - 3 * rms < d && d < avg + 3 * rms
        // d => distDict[d] > maxValue / 100
    );
    const m = filtered.length;
    const avg2 = filtered.reduce((a, b) => a + b, 0) / m;
    // console.log(distDict);
    setFilteredDistances(distances);

    const freq = sampleRate / avg2;
    const freqOffset = freq - targetFreq;
    const secondsPerDayOffset = (freqOffset * 60 * 60 * 24) / targetFreq;
    return [secondsPerDayOffset, freq];
};

export default calculateOffset;
