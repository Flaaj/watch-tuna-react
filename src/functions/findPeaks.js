const findPeaks = (data, sampleRate, targetFreq) => {
    const peakWidth = ~~((sampleRate / targetFreq) * 0.95);
    const peakIndexes = [];
    for (let i = peakWidth; i < data.length - peakWidth; i++) {
        if (
            data.slice(i - peakWidth, i).every((samp) => samp <= data[i]) &&
            data.slice(i, i + peakWidth).every((samp) => samp <= data[i])
        ) {
            peakIndexes.push(i);
            i += peakWidth;
        }
    }
    return peakIndexes;
};

export default findPeaks;
