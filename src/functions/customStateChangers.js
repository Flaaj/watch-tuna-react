export const toggleState = (setState) => {
    setState((bool) => !bool);
};

export const updateState = (setState) => ({ target: { value } }) => {
    setState(value);
};