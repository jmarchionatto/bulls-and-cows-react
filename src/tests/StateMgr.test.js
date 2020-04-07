'use strict';

import * as SU from '../StateUtil';

it('replLastUserTry', () => {
    let state = {
        userTries: [SU.emptyUserTry, SU.emptyUserTry, SU.emptyUserTry],
    };

    const userTry = {
        digitVals: [1, 2, 3, 4],
        rg: '1',
        rr: '2',
        showRateFlds: true,
        showRateBtn: true,
    };

    let replState = SU.replLastUserTry(state, userTry);

    expect(replState.userTries.slice(0, 2)).toStrictEqual(state.userTries.slice(0, 2));
    expect(replState.userTries.slice(2)[0]).toStrictEqual(userTry);
});

it('addUserTry', () => {
    let state = {
        userTries: [SU.emptyUserTry, SU.emptyUserTry],
    };

    const userTry = {
        digitVals: [1, 2, 3, 4],
        rg: '1',
        rr: '2',
        showRateFlds: true,
        showRateBtn: true,
    };

    let replState = SU.addUserTry(state, userTry);

    expect(replState.userTries.length).toBe(3);
    expect(replState.userTries.slice(0, 2)).toStrictEqual(state.userTries.slice(0, 2));
    expect(replState.userTries.slice(-1)[0]).toStrictEqual(userTry);
});

it('addCompTry', () => {
    let state = {
        compTries: [SU.emptyCompTry, SU.emptyCompTry],
    };

    const compTryDigits = [1, 2, 3, 4];

    let replState = SU.addCompTry(state, compTryDigits);

    const expectedLastCompTry = {
        ...SU.emptyCompTry,
        digitVals: compTryDigits,
    };

    expect(replState.compTries.length).toBe(3);
    expect(replState.compTries.slice(0, 2)).toStrictEqual(state.compTries.slice(0, 2));
    expect(replState.compTries.slice(-1)[0]).toStrictEqual(expectedLastCompTry);
});
