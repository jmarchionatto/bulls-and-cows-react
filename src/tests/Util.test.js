'use strict';

import * as UTIL from '../Util';

describe('Util', () => {
    describe('hasDigitsRepeated', () => {
        it('3 digit no rep', () => {
            let res = UTIL.hasDigitsRepeated(123);
            expect(res).toBe(false);
        });

        it('3 digit with rep', () => {
            let res = UTIL.hasDigitsRepeated(144);
            expect(res).toBe(true);
            res = UTIL.hasDigitsRepeated(441);
            expect(res).toBe(true);
        });

        it('4 digit no rep', () => {
            let res = UTIL.hasDigitsRepeated(9865);
            expect(res).toBe(false);
        });

        it('4 digit rep', () => {
            let res = UTIL.hasDigitsRepeated(1123);
            expect(res).toBe(true);
            res = UTIL.hasDigitsRepeated(1223);
            expect(res).toBe(true);
            res = UTIL.hasDigitsRepeated(1233);
            expect(res).toBe(true);
        });
    });

    describe('getNextNonRepeated', () => {
        it('still available < 9876', () => {
            let res = UTIL.getNextNonRepeated([5, 7, 8, 9]);
            expect(res).toStrictEqual([5, 7, 9, 0]);
        });

        it('no available < 9876', () => {
            let res = UTIL.getNextNonRepeated([9, 8, 7, 6]);
            expect(res).toBe(null);
        });
    });

    describe('matchesRating', () => {
        // number could be: 3715
        const ratings = [
            {
                numArr: [2, 7, 5, 1],
                rg: 1,
                rr: 2,
            },
            {
                numArr: [6, 7, 1, 8],
                rg: 2,
                rr: 0,
            },
        ];

        it('still available < 9876', () => {
            let res = UTIL.matchesRatings([3, 7, 1, 5], ratings);
            expect(res).toBe(true);
        });

        it('no available < 9876', () => {
            let res = UTIL.matchesRatings([9, 8, 7, 6], ratings);
            expect(res).toBe(false);
        });
    });
});
