/**
 * Some utilities
 *
 * @see ratings schema in Logic.js
 *
 * @author Juan Marchionatto
 */

import Logic from './Logic';
import * as CONST from './Const';

/**
 * Rating format is:
 * @param rating = {
 *    num: Number[123-9876] (no repeated digits)
 *    rtg: {
 *       rg: Number[0-4],
 *       rr: Number[0-4]
 *    }
 * }
 */
export function matchesRating(n, rating) {
    let good = 0,
        reg = 0;
    let nArr = asNArray(n);
    let rateArr = asNArray(rating.num);
    for (const [nIdx, nDig] of nArr.entries()) {
        for (const [rIdx, rDig] of rateArr.entries()) {
            if (nDig == rDig) {
                nIdx === rIdx ? good++ : reg++;
            }
        }
    }
    // non-strict tests on purpose
    return good == rating.rtg.rg && reg == rating.rtg.rr;
}

export function rate(nArr, tryArr) {
    console.log('rate -> nArr, tryArr', nArr, tryArr);
    let good = 0,
        reg = 0;
    for (const [nIdx, nDig] of nArr.entries()) {
        for (const [rIdx, rDig] of tryArr.entries()) {
            // console.log('-----------------------');
            // console.log('rate -> nIdx, nDig', nIdx, nDig);
            // console.log('rate -> rIdx, rDig', rIdx, rDig);
            if (nDig == rDig) {
                // console.log('rate -> nDig === rDig', nDig === rDig);
                nIdx === rIdx ? good++ : reg++;
            }
        }
        // console.log('rate -> good, reg', good, reg);
        // console.log('-----------------------');
    }
    return { rg: good, rr: reg };
}

/**
 * Returns the first unique-digits number greater than the
 * First quick implementation not very efficiant
 */
export function getNextUniqueDigits(n) {
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
export function hasDigitsRepeated(n) {
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

/**
 * Return received number as a zero padded four element Number array
 * @param {*} n
 */
export function asNArray(n) {
    if (Array.isArray(n)) {
        if (allNumbers(n)) return n;
        return n.map(Number);
    }

    let strDigits = ('' + n).split('');
    if (strDigits.length < 3) {
        throw 'Received number has less than 3 digits';
    }

    if (strDigits.length === 3) {
        strDigits = ['0', ...strDigits];
    }
    return strDigits.map(Number);
}

function allNumbers(arr) {
    for (const elem of arr) {
        if (typeof elem !== 'number') return false;
    }
    return true;
}

export function asNumber(nArr) {
    return Number(nArr.join(''));
}

/**
 * min inclusive and max exclusive
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function showCandidates(cands) {
    if (cands.length === 0) {
        console.log('There is no candidates');
    }
    let i = 0;
    while (i < cands.length) {
        console.log(`cands [${i}-${i + 99}]`, cands.slice(i, i + 99));
        i += 100;
    }
}

export function getFldKey(value) {
    return Object.keys(CONST.FLD_NAMES).find((key) => CONST.FLD_NAMES[key] === value);
}
