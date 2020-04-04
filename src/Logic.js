// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

import * as UTIL from './Util';

/**
 * Consolidates all logic about candidate numbers
 *
 *@author Juan Marchionatto
 */

// ratings schema
// const ratings = [{
//     numArr: Number[123-9876] (no repeated digits)
//     rg: Number[0-4],
//     rg: Number[0-4]
// }];

export class Logic {
    // maximum 4 unique-digit number
    static MAX = 9876;

    constructor() {
        this.ratings = [];
        this.candidates = null;
        this.candidateIt = this.candidateIt.bind(this);
    }

    rateTry = (num, tryArr) => {
        return UTIL.rate(UTIL.asNArray(num), tryArr);
    };

    /**
     * Returns array version of random number from the candidates
     */
    getCandidate = () => {
        if (!this.candidates) {
            this.candidates = this.buildCandidates();
        }
        let cQty = this.candidates.length;
        let cIdx = Logic.getRandomInt(0, cQty);
        return UTIL.asNArray(this.candidates[cIdx]);
    };

    buildCandidates = () => {
        let candidates = [];
        for (const cand of this.candidateIt()) {
            candidates.push(cand);
        }
        return candidates;
    };

    /**
     * min inclusive and max exclusive
     */
    static getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    getAllCandidates = () => {
        let c = [];
        for (const cand of this.candidates) {
            c.push(cand);
        }
        return c;
    };

    /**
     * Yields all possible 4 unique-digits numbers representing a candidate,
     * which means that match all the current ratings
     */
    *candidateIt() {
        const last = 9876;

        let n = 123;
        yield n;

        while (n <= last) {
            n = UTIL.getNextUniqueDigits(n);
            if (isNaN(n)) return;

            while (!UTIL.matchesRatings(n, this.ratings)) {
                n = UTIL.getNextUniqueDigits(n);
                if (isNaN(n)) return;
            }
            yield n;
        }
    }
}

export default Logic;
