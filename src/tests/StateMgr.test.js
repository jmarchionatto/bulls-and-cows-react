'use strict';

import * as SM from '../StateMgr';

it('replLastUserTry', () => {
    let state = {
        userTries: [SM.emptyUserTry, SM.emptyUserTry, SM.emptyUserTry],
    };

    const userTry = {
        digitVals: [1, 2, 3, 4],
        rg: '1',
        rr: '2',
        showRateFlds: true,
        showRateBtn: true,
    };

    let replState = SM.replLastUserTry(state, userTry);

    expect(replState.userTries.slice(0, 2)).toStrictEqual(state.userTries.slice(0, 2));
    expect(replState.userTries.slice(2)[0]).toStrictEqual(userTry);
});

it('addUserTry', () => {
    let state = {
        userTries: [SM.emptyUserTry, SM.emptyUserTry],
    };

    const userTry = {
        digitVals: [1, 2, 3, 4],
        rg: '1',
        rr: '2',
        showRateFlds: true,
        showRateBtn: true,
    };

    let replState = SM.addUserTry(state, userTry);

    expect(replState.userTries.length).toBe(3);
    expect(replState.userTries.slice(0, 2)).toStrictEqual(state.userTries.slice(0, 2));
    expect(replState.userTries.slice(-1)[0]).toStrictEqual(userTry);
});

it('addCompTry', () => {
    let state = {
        compTries: [SM.emptyCompTry, SM.emptyCompTry],
    };

    const compTryDigits = [1, 2, 3, 4];

    let replState = SM.addCompTry(state, compTryDigits);

    const expectedLastCompTry = {
        ...SM.emptyCompTry,
        digitVals: compTryDigits,
    };

    expect(replState.compTries.length).toBe(3);
    expect(replState.compTries.slice(0, 2)).toStrictEqual(state.compTries.slice(0, 2));
    expect(replState.compTries.slice(-1)[0]).toStrictEqual(expectedLastCompTry);
});
