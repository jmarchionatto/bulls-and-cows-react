export const emptyUserTry = {
    digitVals: ['', '', '', ''],
    rg: '',
    rr: '',
    showRateFlds: false,
    showRateBtn: false,
};

export const emptyCompTry = {
    rg: '',
    rr: '',
    showRateBtn: false,
};

/**
 * Returns a new state with the received try replacing
 * the last entry of the received state's userTries
 * @param {*} state sample state
 * @param {*} aTry user try to replace last uesrTries entry
 */
export function replLastUserTry(state, aTry) {
    let newState = {
        ...state,
    };
    newState.userTries[newState.userTries.length - 1] = aTry;
    return newState;
}

/**
 * Returns a new state with the received try as the last entry
 * of the received state's userTries
 * @param {*} state sample state
 * @param {*} aTry user try to be added in returned state
 */
export function addUserTry(state, aTry) {
    const newState = {
        ...state,
        userTries: [...state.userTries, aTry],
    };
    return newState;
}

/**
 * Returns a new state with a new calculated compTry as the last entry
 * of the received state's compTries
 * @param {*} state sample state
 */
export function addCompTry(state, compTryDigits) {
    const compTry = {
        ...emptyCompTry,
        digitVals: compTryDigits,
    };
    const newState = {
        ...state,
        compTries: [...state.compTries, compTry],
    };
    return newState;
}

export function getCurrentUserTry(state) {
    if (state.userTries.length < 1) {
        throw 'state.userTries is empty';
    }
    return state.userTries.slice(-1)[0];
}
