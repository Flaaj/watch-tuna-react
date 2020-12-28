const findPeaks = (data, sampleRate, targetFreq, previousPeakIndexes) => {
    const beginFrom = previousPeakIndexes[previousPeakIndexes.length - 1] || 0;
    const sliceLen = ~~(sampleRate / targetFreq / 8);
    const peakWidth = ~~(sampleRate / targetFreq - 2 * sliceLen);
    const peakIndexes = [];

    for (let i = beginFrom + peakWidth; i < data.length - peakWidth; i += sliceLen) {
        const slice = data.slice(i, i + sliceLen);
        const sliceIndOfMax = slice.reduce(
            (prev, cur, ind) => (cur >= slice[prev] ? ind : prev),
            0
        );
        if (
            data.slice(i - peakWidth, i)
                .every((samp) => samp <= slice[sliceIndOfMax]) &&
            data.slice(i + sliceLen, i + sliceLen + peakWidth)
                .every((samp) => samp <= slice[sliceIndOfMax])
        ) {
            peakIndexes.push(i + sliceIndOfMax);
            i += peakWidth;
        }
    }
    return peakIndexes;
};

export default findPeaks;
