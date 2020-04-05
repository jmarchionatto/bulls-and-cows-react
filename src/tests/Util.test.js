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
        it('still available < 9876', () => {
            const rating = {
                num: 2751,
                rtg: {
                    good: 1,
                    reg: 2,
                },
            };
            let res = UTIL.matchesRating(3715, rating);
            expect(res).toBe(true);
        });

        it('still available < 9876', () => {
            const rating = {
                num: 2751,
                rtg: {
                    good: 1,
                    reg: 1,
                },
            };
            let res = UTIL.matchesRating(2910, rating);
            expect(res).toBe(true);
        });

        it('still available < 9876', () => {
            const rating = {
                num: 2751,
                rtg: {
                    good: 1,
                    reg: 1,
                },
            };
            let res = UTIL.matchesRating(2710, rating);
            expect(res).toBe(false);
        });
    });
});
