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

    describe('getNextUniqueDigits', () => {
        it('still available < 9876', () => {
            let res = UTIL.getNextUniqueDigits(5789);
            expect(res).toStrictEqual(5790);
        });

        it('no available < 9876', () => {
            let res = UTIL.getNextUniqueDigits(9876);
            expect(res).toBe(NaN);
        });
    });

    describe('matchesRating', () => {
        // number could be: 3715
        const ratings = [
            {
                numArr: 2751,
                rg: 1,
                rr: 2,
            },
            {
                numArr: 6718,
                rg: 2,
                rr: 0,
            },
        ];

        it('still available < 9876', () => {
            let res = UTIL.matchesRatings(3715, ratings);
            expect(res).toBe(true);
        });

        it('no available < 9876', () => {
            let res = UTIL.matchesRatings(9876, ratings);
            expect(res).toBe(false);
        });
    });
});
