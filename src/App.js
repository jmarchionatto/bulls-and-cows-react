import React from 'react';
import AskWhoFirst from './AskWhoFirst';
import TriesPanel from './TriesPanel';
import Logic from './Logic';
import * as SU from './StateUtil';
import { FLD_NAMES } from './Const';

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // true if user tries first
            userTryFirst: null,
            userTries: [],
            compTries: [],
            handlers: {
                onChangeKey: this.changeKey,
                onSendTry: this.sendTry,
            },
        };
        process.nextTick(() => {
            // because takes some processing
            this.logic = new Logic();
        });
    }

    //////////////////////////////////////////////////////////////////////////////
    // Handlers sent down to components
    //////////////////////////////////////////////////////////////////////////////

    setUserTryFirst = userTryFirst => {
        let newState = {
            ...this.state,
            compNumber: this.logic.getCandidate(), // 'think' comp number
            userTryFirst: userTryFirst,
            userTries: userTryFirst ? [SU.emptyUserTry] : [],
        };
        if (userTryFirst) {
            let compTryDigits = this.logic.getCandidate(this.state);
            SU.addCompTry(newState, compTryDigits);
        }
        this.setState(newState, () => {
            console.log('App -> setUserTryFirst -> new state: ', this.state);
        });
    };

    sendTry = () => {
        let newState = { ...this.state };
        // rate try sent and send rate back
        let currentUserTry = SU.getCurrentUserTry(this.state);
        // console.log('App -> sendTry -> currentUserTry.digitVals', currentUserTry.digitVals);
        // console.log('App -> sendTry -> this.state.compNumber', this.state.compNumber);
        let rate = this.logic.rateTry(this.state.compNumber, currentUserTry.digitVals);
        let newUserTry = {
            ...currentUserTry,
            rg: rate.good,
            rr: rate.reg,
            showRateFlds: true,
        };
        newState = SU.replLastUserTry(newState, newUserTry);

        // send comp try?
        if (!this.state.compDone) {
            let compTryDigits = this.logic.getCandidate(this.state);
            newState = SU.addCompTry(newState, compTryDigits);
        }

        this.setState(newState);
    };

    changeKey = (event, fldId) => {
        let [kType, kIdx] = this.getFldKey(fldId);

        let currentUserTry = SU.getCurrentUserTry(this.state);
        let newUserTry;

        if (event.target.value) {
            if (kType === 'd') {
                newUserTry = this.handleDigitAdded(currentUserTry, kType, kIdx, event.target.value);
            } else {
                newUserTry = this.handleRateAdded(currentUserTry, kType, kIdx, event.target.value);
            }
        } else {
            // value removed from field
            newUserTry = this.handleFieldRemoved(currentUserTry, kType, kIdx);
        }
        let newState = SU.replLastUserTry(this.state, newUserTry);
        this.setState(newState, () => {
            console.log('App -> changeKey -> newState set: ', newState);
            console.log('App -> changeKey -> this.state: ', this.state);
        });
    };

    //////////////////////////////////////////////////////////////////////////////////////////
    //  Event handler helpers
    //////////////////////////////////////////////////////////////////////////////////////////

    getFldKey = value => Object.keys(FLD_NAMES).find(key => FLD_NAMES[key] === value);

    handleDigitAdded(currentUserTry, kType, kIdx, digit) {
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

    handleRateAdded(currentUserTry, kType, kIdx, rate) {
        let newTryState = { ...currentUserTry };
        if (kIdx === 'g') {
            newTryState.rg = rate;
            // also make rate btn visible ?
            if (currentUserTry.rr) {
                newTryState.showRateBtn = true;
            }
        } else {
            newTryState.rr = rate;
            // also make rate btn visible ?
            if (currentUserTry.rg) {
                newTryState.showRateBtn = true;
            }
        }
        return newTryState;
    }

    handleFieldRemoved(currentUserTry, kType, kIdx) {
        let newTryState;
        if (kType === 'd') {
            let newDigitVals = currentUserTry.digitVals;
            newDigitVals[kIdx] = '';
            newTryState = { ...currentUserTry, digitVals: newDigitVals, showSendTry: false };
        } else {
            newTryState = { ...currentUserTry, [`r${kIdx}`]: '', showRateBtn: false };
        }
        return newTryState;
    }

    restDigitsSet = (aTry, kIdx) => {
        for (const [valIdx, val] of aTry.digitVals.entries()) {
            // testing non strictly on purpose!
            if (valIdx != kIdx && !val) {
                // console.log('allOtherValsSet -> returning false');
                return false;
            }
        }
        // console.log('allOtherValsSet -> returning true');
        return true;
    };

    //////////////////////////////////////////////////////////////////////////////////////////
    //  Render
    //////////////////////////////////////////////////////////////////////////////////////////

    render() {
        if (this.state.userTryFirst === null) {
            console.log('rendering AskWhoFirst');
            return <AskWhoFirst onSetWhoFirst={this.setUserTryFirst} />;
        }
        console.log('App -> render -> this.state', this.state);
        return <TriesPanel {...this.state} />;
    }
}

export default App;
