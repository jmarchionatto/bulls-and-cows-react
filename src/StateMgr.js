/**
 * Centralizes spplication state, which will be handled
 * by Redux at a later stage
 *
 * @author Juan Marchionatto
 *
 */
export const emptyUserTry = {
    digitVals: ['', '', '', ''],
    rg: '',
    rr: '',
    showRateFlds: false,
    showRateBtn: false,
};

export const emptyCompTry = {
    digitVals: ['', '', '', ''],
    rg: '',
    rr: '',
    showRateBtn: false,
    discrep: null,
};

/**
 * Returns a new state with the received try replacing
 * the last entry of the received state's userTries
 * @param {*} state sample state
 * @param {*} aTry user try to replace last uesrTries entry
 */
export function replLastTry(oldState, userOrComp, replTry) {
    return userOrComp === 'user'
        ? replLastUserTry(oldState, replTry)
        : replLastCompTry(oldState, replTry);
}

/**
 * Returns a new state with the received try replacing
 * the last entry of the received state's userTries
 * @param {*} state sample state
 * @param {*} aTry user try to replace last uesrTries entry
 */
export function replLastUserTry(oldState, replTry) {
    let newTries = [...oldState.userTries];
    newTries[newTries.length - 1] = replTry;
    return { ...oldState, userTries: newTries };
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

export function getCurrentTry(state, userOrComp) {
    return userOrComp === 'user' ? getCurrentUserTry(state) : getCurrentCompTry(state);
}

export function getCurrentUserTry(state) {
    if (state.userTries.length < 1) {
        throw 'state.userTries is empty';
    }
    return state.userTries.slice(-1)[0];
}

export function getCurrentCompTry(state) {
    if (state.compTries.length < 1) {
        throw 'state.userTries is empty';
    }
    return state.compTries.slice(-1)[0];
}

/**
 * Returns a new state with the received try replacing
 * the last entry of the received state's compTries
 * @param {*} state sample state
 * @param {*} aTry comp try to replace last compTries entry
 */
export function replLastCompTry(oldState, newTry) {
    let newTries = [...oldState.compTries];
    newTries[newTries.length - 1] = newTry;
    return { ...oldState, compTries: newTries };
}
