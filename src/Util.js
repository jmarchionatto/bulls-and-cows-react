/**
 * Numbers and ratings utilities
 *
 * @see ratings schema in Logic.js
 *
 * @author Juan Marchionatto
 */

import Logic from './Logic';

function matchesRatings(n, ratings) {
    for (const r of ratings) {
        if (!matchesRating(n, r)) {
            return false;
        }
    }
    return true;
}

function matchesRating(n, rating) {
    let good = 0,
        reg = 0;
    let nArr = asNArray(n);
    let rateArr = asNArray(rating.numArr);
    for (const [nIdx, nDig] of nArr.entries()) {
        for (const [rIdx, rDig] of rateArr.entries()) {
            if (nDig === rDig) {
                nIdx === rIdx ? good++ : reg++;
            }
        }
    }
    return good === rating.rg && reg === rating.rr;
}

/**
 * Returns the first unique-digits number greater than the
 * First quick implementation not very efficiant
 */
function getNextUniqueDigits(n) {
    let num = n + 1;
    while (hasDigitsRepeated(num)) {
        if (num > Logic.MAX) return NaN;
        num++;
    }
    return num;
}

/**
 * If number has only 3 digits, array must be added a leading zero
 * or other zeros won;t be recognized as duplicated digits
 */
function hasDigitsRepeated(n) {
    let digArr = asNArray(n);
    if (digArr.length === 3) {
        digArr = [0, ...digArr];
    }
    for (let i = 1; i < digArr.length; i++) {
        for (let j = 0; j < digArr.length; j++) {
            if (i !== j && digArr[i] == digArr[j]) {
                return true;
            }
        }
    }
    return false;
}

function asNArray(n) {
    let strDigits = ('' + n).split('');
    return strDigits.map(Number);
}

function asNumber(nArr) {
    return Number(nArr.join(''));
}

export { matchesRatings, matchesRating, getNextUniqueDigits, hasDigitsRepeated, asNumber };
