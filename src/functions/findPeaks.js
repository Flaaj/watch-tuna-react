const findPeaks = (data, sampleRate, targetFreq) => {
    const sliceLen = 500;
    const peakWidth = ~~((sampleRate / targetFreq) * 0.9 - sliceLen / 2);
    const peakIndexes = [];

    for (let i = peakWidth; i < data.length - peakWidth; i += sliceLen) {
        const slice = data.slice(i, i + sliceLen);
        const sliceIndOfMax = slice.reduce(
            (prev, cur, ind) => (cur >= slice[prev] ? ind : prev),
            0
        );

        if (
            data
                .slice(i - peakWidth, i)
                .every((samp) => samp <= slice[sliceIndOfMax]) &&
            data
                .slice(i + sliceLen, i + sliceLen + peakWidth)
                .every((samp) => samp <= slice[sliceIndOfMax])
        ) {
            peakIndexes.push(i + sliceIndOfMax);
            i += peakWidth;
        }
    }
    return peakIndexes;
};

export default findPeaks;
