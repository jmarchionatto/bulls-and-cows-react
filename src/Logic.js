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
//     numArr: [],
//     rg: Number[0-4],
//     rg: Number[0-4]
// }];

export class Logic {
    constructor() {
        this.ratings = [];
        this.candidateIt = this.candidateIt.bind(this);
    }

    /**
     * Extract a random number from the candidates
     */
    getCandidate = () => {
        if (!this.candidates) {
            this.candidates = [];
            for (const cand of this.candidateIt()) {
                this.candidates.push(cand);
            }
        }
        let cQty = this.candidates.length;
        let cIdx = Logic.getRandomInt(0, cQty);
        return this.candidates[cIdx];
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
     * Yields all possible 4 non-repeated one-digit numbers representing a candidate,
     * which means that match all the ratings received so far
     */
    *candidateIt() {
        const last = 98;

        let nArr = [0, 1];
        yield nArr;

        let logic = this;

        while (UTIL.asNumber(nArr) <= last) {
            nArr = UTIL.getNextNonRepeated(nArr);
            if (nArr === null) {
                return;
            }
            while (!UTIL.matchesRatings(nArr, logic.ratings)) {
                nArr = UTIL.getNextNonRepeated(nArr);
                if (nArr === null) {
                    return;
                }
            }
            yield nArr;
        }
    }
}

export default Logic;
