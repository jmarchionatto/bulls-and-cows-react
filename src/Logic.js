// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

import * as UTIL from './Util';
import * as SM from './StateMgr';
import * as CONST from './Const';
import App from './App';

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

    rateTry = (compNum, tryArr) => {
        const cnArr = UTIL.asNArray(compNum);
        return UTIL.rate(cnArr, tryArr);
    };

    reduceCandidates = (rating) => {
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

    getNewUserStateForReceivedTry = (oldState) => {
        let newState = { ...oldState };

        // 'think' comp number
        newState.compNumber = this.getCandidateArr();

        // rate try sent and send rate back
        let currentUserTry = SM.getCurrentUserTry(oldState);
        // console.log('App -> sendTry -> currentUserTry.digitVals', currentUserTry.digitVals);
        // console.log('App -> sendTry -> this.state.compNumber', this.state.compNumber);
        let rate = this.rateTry(newState.compNumber, currentUserTry.digitVals);
        let newCurrUserTry = {
            ...currentUserTry,
            rg: rate.good,
            rr: rate.reg,
            showSendTry: false,
            showRateFlds: true,
        };
        newState = SM.replLastUserTry(newState, newCurrUserTry);
        return newState;
    };

    getNewCompStateForReceivedTry = (oldState) => {
        let newState = { ...oldState };
        let newCompTry;
        if (this.candidates.length == 0) {
            newCompTry.msg = 'CONST.MSG_SOME_RATE_WRONG';
        } else {
            let compTryDigits = this.getCandidateArr(oldState);
            newCompTry = {
                ...SM.emptyCompTry,
                digitVals: compTryDigits,
                showRateFlds: true,
            };
            newState.compTries = [...newState.compTries, newCompTry];
        }
        return newState;
    };

    getNewCompStateForReceivedRate = (appInst, oldState, rg, rr) => {
        let currentCompTry = SM.getCurrentCompTry(oldState);
        let newCurrentCompTry = {
            ...currentCompTry,
            rg: rg,
            rr: rr,
            showRateBtn: 'hidden',
        };
        let newState = SM.replLastCompTry(oldState, newCurrentCompTry);

        // schedule candidate reduction for after update
        const rating = {
            num: UTIL.asNumber(currentCompTry.digitVals),
            rtg: { good: rg, reg: rr },
        };
        appInst.scheduleAfterUpdate(() => {
            this.reduceCandidates(rating);

            let candidateLen = this.getCandLen();
            if (CONST.DEBUG_REDUCING_CANDIDATES && candidateLen !== 0) {
                console.log('%%%%%%%%% new Cand. length: ', candidateLen);
                UTIL.showCandidates(this.candidates);
            }
        });

        return newState;
    };

    getNewStateForChangedNumber = (oldState, kValue, fldId) => {
        let [kType, kIdx] = UTIL.getFldKey(fldId);

        let currentUserTry = SM.getCurrentUserTry(oldState);

        let newUserTry;
        if (kValue) {
            newUserTry = this.handleDigitAdded(currentUserTry, kIdx, kValue);
        } else {
            // value removed from field
            newUserTry = this.handleFieldRemoved(currentUserTry, kType, kIdx);
        }
        let newState = SM.replLastUserTry(oldState, newUserTry);

        return newState;
    };

    getNewStateForChangedRateFld = (oldState, kValue, fldId) => {
        let currentCompTry = SM.getCurrentCompTry(oldState);
        let newCompTry;

        if (kValue) {
            newCompTry = this.handleRateAdded(currentCompTry, fldId, kValue);
        } else {
            // value removed from field
            newCompTry = this.handleFieldRemoved(currentCompTry, fldId);
        }
        let newState = SM.replLastCompTry(oldState, newCompTry);

        return newState;
    };

    handleDigitAdded(currentUserTry, kIdx, digit) {
        let newDigitVals = [...currentUserTry.digitVals];
        newDigitVals[kIdx] = digit;

        let newTryState = {
            ...currentUserTry,
            digitVals: newDigitVals,
        };

        // must make submit btn visible?
        if (this.restDigitsSet(currentUserTry, kIdx)) {
            newTryState.showSendTry = true;
        }
        return newTryState;
    }

    handleRateAdded(currentUserTry, fldId, rate) {
        let newTryState = {
            ...currentUserTry,
            [UTIL.getFldKey(fldId)]: rate,
        };
        newTryState.showRateBtn = newTryState.rg && newTryState.rr ? 'visible' : 'hidden';
        return newTryState;
    }

    handleFieldRemoved(currentUserTry, kType, kIdx) {
        let newTryState;
        if (kType === 'd') {
            let newDigitVals = currentUserTry.digitVals;
            newDigitVals[kIdx] = '';
            newTryState = { ...currentUserTry, digitVals: newDigitVals, showSendTry: 'hidden' };
        } else {
            newTryState = { ...currentUserTry, [`r${kIdx}`]: '', showRateBtn: 'hidden' };
        }
        return newTryState;
    }

    restDigitsSet = (aTry, kIdx) => {
        for (const [valIdx, val] of aTry.digitVals.entries()) {
            // testing non strictly on purpose!
            if (valIdx != kIdx && !val) {
                return false;
            }
        }
        return true;
    };

    getCandidateArr = () => {
        return UTIL.asNArray(this.getCandidate());
    };

    getCandLen = () => this.candidates.length;

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
