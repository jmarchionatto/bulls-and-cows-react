// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

import * as UTIL from './Util';
import * as SM from './StateMgr';
import * as CONST from './Const';

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

        // rate try sent and send rate back
        let currentUserTry = SM.getCurrentUserTry(oldState);
        // console.log('App -> sendTry -> currentUserTry.digitVals', currentUserTry.digitVals);
        // console.log('App -> sendTry -> this.state.compNumber', this.state.compNumber);
        let rate = this.rateTry(newState.compNumber, currentUserTry.digitVals);
        let newCurrUserTry = {
            ...currentUserTry,
            rg: rate.rg,
            rr: rate.rr,
            showSendTry: false,
            showRateFlds: true,
        };
        if (rate.rg == 4) {
            newCurrUserTry.msg = CONST.MSG_CONGRATS;
            newState.userDone = true;
        }
        newState = SM.replLastUserTry(newState, newCurrUserTry);

        return newState;
    };

    getNewCompStateForReceivedTry = (oldState) => {
        let newState = { ...oldState };
        let newCompTry;
        if (this.candidates.length == 0) {
            newCompTry = {
                ...SM.emptyCompTry,
                msg: CONST.MSG_SOME_RATE_WRONG,
                showRateFlds: false,
            };
        } else {
            let compTryDigits = this.getCandidateAsArr();
            newCompTry = {
                ...SM.emptyCompTry,
                digitVals: compTryDigits,
                showRateFlds: true,
            };
        }
        newState.compTries = [...newState.compTries, newCompTry];
        return newState;
    };

    /**
     * Received when some user reply were wrong and user submitted number
     * to be informed which
     */
    getNewStateForReceivedCompTry = (oldState) => {
        let newState = { ...oldState };

        this.showWrongAnswers(newState);

        return newState;
    };

    showWrongAnswers = (newState) => {
        console.log('Logic -> showWrongAnswers -> newState start', newState);
        let currentCompTry = SM.getCurrentCompTry(newState);
        currentCompTry.showSendTry = false;

        let digitVals = currentCompTry.digitVals;
        for (let i = 0; i < newState.compTries.length - 1; i++) {
            let compTry = newState.compTries[i];
            let rating = { num: compTry.digitVals, rtg: { rg: compTry.rg, rr: compTry.rr } };
            if (!UTIL.matchesRating(digitVals, rating)) {
                compTry.discrep = { rightRate: UTIL.rate(digitVals, compTry.digitVals) };
            }
        }
        newState.discrepVisib = 'visible';
        console.log('Logic -> showWrongAnswers -> newState end', newState);
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
            rtg: { rg, rr },
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

    getNewStateForChangedNumber = (oldState, kValue, fldId, userOrComp) => {
        let [kType, kIdx] = UTIL.getFldKey(fldId);

        let currentTry = SM.getCurrentTry(oldState, userOrComp);

        let newTry;
        if (kValue) {
            newTry = this.handleDigitAdded(currentTry, kIdx, kValue, userOrComp);
        } else {
            // value removed from field
            newTry = this.handleFieldRemoved(currentTry, kType, kIdx);
        }
        let newState = SM.replLastTry(oldState, userOrComp, newTry);

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

    handleDigitAdded(currentTry, kIdx, digit, userOrComp) {
        return userOrComp === 'user'
            ? this.handleUserDigitAdded(currentTry, kIdx, digit)
            : this.handleCompDigitAdded(currentTry, kIdx, digit);
    }

    handleUserDigitAdded(currentUserTry, kIdx, digit, userOrComp) {
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

    handleCompDigitAdded(currentCompTry, kIdx, digit) {
        let newDigitVals = [...currentCompTry.digitVals];
        newDigitVals[kIdx] = digit;

        let newTryState = {
            ...currentCompTry,
            digitVals: newDigitVals,
        };

        // must make submit btn visible?
        if (this.restDigitsSet(currentCompTry, kIdx)) {
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

    getCandidateAsArr = () => {
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
