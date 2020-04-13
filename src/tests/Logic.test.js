'use strict';

import Logic from '../Logic';
import * as UTIL from '../Util';

describe('Logic', () => {
    let logic;

    beforeEach(() => {
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
        // UTIL.showCandidates(cands);
        expect(cands.length).toBe(10 * 9 * 8 * 7);
    });

    it('getAllCandidates() works', () => {
        logic.buildCandidates();
        const rating = { num: 1234, rtg: { rg: 2, rr: 2 } };
        logic.reduceCandidates(rating);
        // console.log('logic.candidates', logic.candidates);
        const expectedCands = [1243, 1324, 1432, 2134, 3214, 4231];
        expect(logic.candidates).toStrictEqual(expectedCands);
        expect(logic.ratings).toStrictEqual([rating]);
    });

    it('getAllCandidates() works', () => {
        logic.buildCandidates();
        const rating = { num: 123, rtg: { rg: 0, rr: 0 } };
        logic.reduceCandidates(rating);
        expect(logic.candidates.length).toBe(6 * 5 * 4 * 3);
        // UTIL.showCandidates(logic.candidates);
        expect(logic.ratings).toStrictEqual([rating]);

        const rating2 = { num: 4567, rtg: { rg: 0, rr: 4 } };
        logic.reduceCandidates(rating2);
        // UTIL.showCandidates(logic.candidates);
        let expectedCands = [5476, 5674, 5746, 6475, 6745, 6754, 7456, 7645, 7654];
        expect(logic.candidates).toStrictEqual(expectedCands);
        expect(logic.ratings).toStrictEqual([rating, rating2]);
    });
});
