import React from 'react';
import AskWhoFirst from './AskWhoFirst';
import TriesPanel from './TriesPanel';
import Logic from './Logic';
import { FLD_NAMES } from './Const';

const emptyUserTry = {
    digitVals: ['', '', '', ''],
    rg: '',
    rr: '',
};

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
            },
        };
        this.logic = process.nextTick(() => new Logic());
    }

    setUserTryFirst = userTryFirst => {
        this.setState(
            {
                ...this.state,
                userTryFirst: userTryFirst,
                userTries: userTryFirst ? [emptyUserTry] : [this.getCompTry()],
            },
            () => {
                console.log('App -> new state: ', this.state);
            }
        );
    };

    getCompTry = () => {
        return this.logic.getCandidate(this.state);
    };

    addCompTry = aTry => {
        const newState = {
            ...this.state,
            compTries: [...this.state.compTries, { aTry }],
        };
        this.setState({ newState });
    };

    addUserTry = aTry => {
        const newState = {
            ...this.state,
            userTries: [...this.state.userTries, { aTry }],
        };
        this.setState({ newState });
    };

    getFldKey = value => Object.keys(FLD_NAMES).find(key => FLD_NAMES[key] === value);

    changeKey = (event, fldId) => {
        let [kType, kIdx] = this.getFldKey(fldId);

        let currentTry = this.getCurrentTry();
        let newTryState;

        if (event.target.value) {
            if (kType === 'd') {
                newTryState = this.handleDigitAdded(currentTry, kType, kIdx, event.target.value);
            } else {
                newTryState = this.handleRateAdded(currentTry, kType, kIdx, event.target.value);
            }
        } else {
            // value removed from field
            newTryState = this.handleFieldRemoved(currentTry, kType, kIdx);
        }
        this.setCurrentTry(newTryState);
    };

    //////////////////////////////////////////////////////////////////////////////////////////
    //  Event handler helpers
    //////////////////////////////////////////////////////////////////////////////////////////

    handleDigitAdded(currentTry, kType, kIdx, digit) {
        let newDigitVals = [...currentTry.digitVals];
        newDigitVals[kIdx] = digit;

        let newTryState = {
            ...currentTry,
            digitVals: newDigitVals,
        };

        // must make submit btn visible?
        if (this.restDigitsSet(currentTry, kIdx)) {
            newTryState.showSendTry = true;
        }
        return newTryState;
    }

    handleRateAdded(currentTry, kType, kIdx, rate) {
        let newTryState = { ...currentTry };
        if (kIdx === 'g') {
            newTryState.rg = rate;
            // also make rate btn visible ?
            if (currentTry.rr) {
                newTryState.showRate = true;
            }
        } else {
            newTryState.rr = rate;
            // also make rate btn visible ?
            if (currentTry.rg) {
                newTryState.showRate = true;
            }
        }
        return newTryState;
    }

    handleFieldRemoved(currentTry, kType, kIdx) {
        let newTryState;
        if (kType === 'd') {
            let newDigitVals = currentTry.digitVals;
            newDigitVals[kIdx] = '';
            newTryState = { ...currentTry, digitVals: newDigitVals, showSendTry: false };
        } else {
            newTryState = { ...currentTry, [`r${kIdx}`]: '', showRate: false };
        }
        return newTryState;
    }

    getCurrentTry = () => {
        if (this.state.userTries.length > this.state.compTries.length) {
            return this.state.userTries.slice(-1)[0];
        }
        throw 'Must implement this case';
    };

    setCurrentTry = newTry => {
        console.log('App -> newTry', newTry);
        console.log('App -> this.state', this.state);
        if (this.state.userTries.length > this.state.compTries.length) {
            let tryIdx = this.state.userTries.length - 1;
            let newTries = [...this.state.userTries];
            newTries[tryIdx] = newTry;

            let newState = { ...this.state, userTries: newTries };
            console.log('App -> newStateeeeeeeeeeee', newState);
            this.setState(newState, () => {
                console.log('App -> state after set', this.state);
            });
            return;
        }

        throw 'Must implement this case';
    };

    restDigitsSet = (currentTry, kIdx) => {
        // console.log('------------------------------------------------------------ ');
        // console.log('allOtherValsSet -> this.state.digitVals: ', this.state.digitVals);
        for (const [valIdx, val] of currentTry.digitVals.entries()) {
            // console.log('-----------------------------');
            // console.log('allOtherValsSet -> valIdx ', valIdx);
            // console.log('allOtherValsSet -> kIdx ', kIdx);
            // console.log('allOtherValsSet -> val ', val);
            // console.log('-----------------------------');
            // console.log('allOtherValsSet -> valIdx !== kIdx', valIdx !== kIdx);
            // testing non strictly on purpose!
            if (valIdx != kIdx && !val) {
                console.log('allOtherValsSet -> returning false');
                return false;
            }
        }
        console.log('allOtherValsSet -> returning true');
        // console.log('------------------------------------------------------------ ');
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
        return <TriesPanel {...this.state} />;
    }
}

export default App;
