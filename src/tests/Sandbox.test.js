'use strict';

// it('does this work for empty array?', () => {
//     let state = {
//         userTries: [],
//     };
//     let res = state.userTries.slice(-1)[0];
//     console.log('res', res);
//     expect(res).toBe(undefined);
// });

it('does this work for empty array?', () => {
    // userTries: [[...state.userTries].splice(-1), aTry],
    let ut = [0, 1, 2, 3, 4];
    ut[ut.length - 1] = 8;
    console.log('ut after', ut);
    // expect(res).toBe(undefined);
});
