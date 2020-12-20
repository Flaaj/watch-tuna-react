import React, {useState, useEffect} from "react";
import "./optionsForm.scss";

const OptionsForm = ({setTargetFreq, setSampleRate}) => {
    const freqs = [2.5, 3, 4, 4.5, 5, 5.5, 6, 7, 8, 10, 12, 16];
    const sampleRates = [
        44100,
        16000,
        20000,
        25000,
        30000,
        35000,
        40000,
        48000,
    ];

    const handleFrequencyChange = ({target: {value}}) => {
        setTargetFreq(value);
    };
    const handleSampleRateChange = ({target: {value}}) => {
        console.log(value);
        setSampleRate(value);
    };
    return (
        <div className="options">
            <form className="options__form" action="">
                <select
                    className="options__select options__select--tick"
                    name="selectWatchTickingFrequency"
                    id="selectWatchTickingFrequency"
                    defaultValue={6}
                    onChange={handleFrequencyChange}
                >
                    {freqs.map((freq) => (
                        <option key={freq} value={freq}>
                            {freq}Hz
                        </option>
                    ))}
                </select>
                <label
                    className="options__label"
                    htmlFor="selectWatchTickingFrequency"
                >
                    beat frequency
                </label>
                <label
                    className="options__label options__label--bottom"
                    htmlFor="selectSampleRate"
                >
                    sample rate
                </label>
                <select
                    className="options__select options__select--sample"
                    name="selectSampleRate"
                    id="selectSampleRate"
                    defaultValue={44100}
                    onChange={handleSampleRateChange}
                >
                    {sampleRates.map((rate) => (
                        <option key={rate} value={rate}>
                            {rate}Hz
                        </option>
                    ))}
                </select>
            </form>
        </div>
    );
};

export default OptionsForm;
