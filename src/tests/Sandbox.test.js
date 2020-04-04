'use strict';

// it('does this work for empty array?', () => {
//     let state = {
//         userTries: [],
//     };
//     let res = state.userTries.slice(-1)[0];
//     console.log('res', res);
//     expect(res).toBe(undefined);
// });

// it('does this work for empty array?', () => {
//     // userTries: [[...state.userTries].splice(-1), aTry],
//     let ut = [0, 1, 2, 3, 4];
//     ut[ut.length - 1] = 8;
//     console.log('ut after', ut);
//     // expect(res).toBe(undefined);
// });

it('what is the difference?', () => {
    const oldState = {
        userTries: [
            {
                digitVals: ['', '', '', ''],
                rg: '',
                rr: '',
                showRateFlds: false,
                showRateBtn: false,
            },
            {
                digitVals: ['', '', '', ''],
                rg: '',
                rr: '',
                showRateFlds: false,
                showRateBtn: false,
            },
        ],
    };
    const newTry = {
        digitVals: ['3', '', '', ''],
        rg: '1',
        rr: '2',
        showRateFlds: true,
        showRateBtn: true,
    };

    let newState1 = { ...oldState };
    newState1.userTries[newState1.userTries.length - 1] = newTry;
    console.log('newState1', newState1);

    let newTries = [...oldState.userTries];
    newTries[newTries.length - 1] = newTry;
    let newState2 = { ...oldState, userTries: newTries };

    console.log('newState2', newState2);
    expect(newState1).toStrictEqual(newState2);
});
