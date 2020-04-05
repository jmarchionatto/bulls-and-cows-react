// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

import * as UTIL from './Util';

/**
 * Consolidates all logic about candidate numbers
 *
 *@author Juan Marchionatto
 */

// ratings schema
// const rating = [{
//     num: Number[123-9876] (no repeated digits)
//     rtg: {
//        rg: Number[0-4],
//        rr: Number[0-4]
//     }
// }];

export class Logic {
    // maximum 4 unique-digit number
    static MAX = 9876;

    constructor() {
        this.ratings = [];
        this.candidates = null;
        this.candidateIt = this.allcandidatesIt.bind(this);
    }

    rateTry = (num, tryArr) => {
        let rate = UTIL.rate(UTIL.asNArray(num), tryArr);
        this.adjustCandidates(num, rate);
        return rate;
    };

    reduceCandidates = rating => {
        let newCandidates = [];
        for (const cand of this.filteredCandidatesIt(rating)) {
            newCandidates.push(cand);
        }
        this.ratings.push(rating);
        this.candidates = newCandidates;
    };

    /**
     * Returns array version of random number from the candidates
     */
    getCandidate = () => {
        if (!this.candidates) {
            this.buildCandidates();
        }
        let cQty = this.candidates.length;
        let cIdx = UTIL.getRandomInt(0, cQty);
        return this.candidates[cIdx];
    };

    getAllCandidates = () => {
        if (!this.candidates) {
            this.buildCandidates();
        }
        let c = [];
        for (const cand of this.candidates) {
            c.push(cand);
        }
        return c;
    };

    buildCandidates = () => {
        let candidates = [];
        for (const cand of this.allcandidatesIt()) {
            candidates.push(cand);
        }
        this.candidates = candidates;
    };

    getCandidateArr = () => {
        return UTIL.asNArray(this.getCandidate());
    };

    /**
     * Yields all possible 4 unique-digit numbers
     */
    *allcandidatesIt() {
        let n = 123;
        yield n;

        while (n <= Logic.MAX) {
            n = UTIL.getNextUniqueDigits(n);
            if (isNaN(n)) return;
            yield n;
        }
    }

    /**
     * Yields candidate matching the received rating for the received number
     */
    *filteredCandidatesIt(rating) {
        // console.log('--------------------------------------------------------');
        // console.log('Logic -> *filteredCandidatesIt -> entering method');

        for (let cand of this.candidates) {
            // console.log('Logic -> *filteredCandidatesIt -> started outer for loop', cand);

            if (!isNaN(cand) && UTIL.matchesRating(cand, rating)) {
                // console.log('Logic -> *filteredCandidatesIt -> tielding cand', cand);
                // console.log('--------------------------------------------------------');
                yield cand;
            }
        }
    }
}

export default Logic;
