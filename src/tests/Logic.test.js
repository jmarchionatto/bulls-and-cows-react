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
        expect(res).toBeGreaterThanOrEqual(123);
        expect(res).toBeLessThan(9877);
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

    it('getAllCandidates() works', () => {
        logic.buildCandidates();
        const rating = { num: 1234, rtg: { good: 2, reg: 2 } };
        logic.reduceCandidates(rating);
        // console.log('logic.candidates', logic.candidates);
        expect(logic.candidates.length).toBe(6);
        const expectedCands = [1243, 1324, 1432, 2134, 3214, 4231];
        expect(logic.candidates).toStrictEqual(expectedCands);
        expect(logic.ratings).toStrictEqual([rating]);
    });
});
