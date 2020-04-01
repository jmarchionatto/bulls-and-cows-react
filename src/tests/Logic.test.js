'use strict';

import Logic from '../Logic';

describe('Logic', () => {
    let logic;

    beforeEach(() => {
        logic = new Logic();
    });

    it('hasDigitsRepeated() works', () => {
        let res = logic.getCandidate();
        console.log('res', res);
        // expect(res).to.be.equal(123);
    });

    // it('getCandidateNumber() works', () => {
    //     console.log('logic instance', logic);
    //     let n = logic.getCandidate();
    //     console.log('n', n);
    // });
});
