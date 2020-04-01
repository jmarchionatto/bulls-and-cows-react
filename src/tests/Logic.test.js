'use strict';

import Logic from '../Logic';

describe('Logic', () => {
    let logic;

    beforeAll(() => {
        logic = new Logic();
    });

    it('getCandidate() (and class constructor) works', () => {
        let res = logic.getCandidate();
        // console.log('res', res);
        expect(res >= 123 && res <= 9876).toBe(true);
    });

    it('getAllCandidates() works', () => {
        let cands = logic.getAllCandidates();
        // let i = 0;
        // while (i < 5100) {
        //     console.log(`cands [${i}-${i + 99}]`, cands.slice(i, i + 99));
        //     i += 100;
        // }
        expect(cands.length).toBe(10 * 9 * 8 * 7);
    });
});
