/**
 * Numbers and ratings utilities
 *
 * @see ratings schema in Logic.js
 *
 * @author Juan Marchionatto
 */

function matchesRatings(nArr, ratings) {
    for (const r of ratings) {
        if (!matchesRating(nArr, r)) {
            return false;
        }
    }
    return true;
}

function matchesRating(nArr, rating) {
    let good = 0,
        reg = 0;
    for (const [nIdx, nDig] of nArr.entries()) {
        for (const [rIdx, rDig] of rating.numArr.entries()) {
            if (nDig === rDig) {
                nIdx === rIdx ? good++ : reg++;
            }
        }
    }
    return good === rating.rg && reg === rating.rr;
}

/**
 * First quick implementation not very efficiant
 */
function getNextNonRepeated(n) {
    let num = asNumber(n) + 1;
    while (num <= 9876 && hasDigitsRepeated(num)) {
        num = asNumber(n) + 1;
    }
    if (num >= 9876) return null;

    return asNArray(num);
}

function hasDigitsRepeated(n) {
    let digArr = asNArray(n);
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
    let digits = strDigits.map(Number);

    return digits;
}

function asNumber(nArr) {
    return Number(nArr.join(''));
}

export { matchesRatings, matchesRating, getNextNonRepeated, hasDigitsRepeated, asNumber };
