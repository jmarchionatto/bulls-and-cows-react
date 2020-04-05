import React from 'react';
import AskWhoFirst from './AskWhoFirst';
import TriesPanel from './TriesPanel';
import Logic from './Logic';
import * as SU from './StateUtil';
import { DEBUG_REDUCING_CANDIDATES, FLD_NAMES } from './Const';
import { showCandidates, asNumber } from './Util';

export class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.afterUpdateOperations = [];
        this.state = {
            // true if user tries first
            userTryFirst: null,
            userTries: [],
            compTries: [],
            handlers: {
                onChangeNumberKey: this.changeNumberKey,
                onChangeRateKey: this.changeRateKey,
                onSendTry: this.sendTry,
                onSendRate: this.sendRate,
                getState: this.getState,
            },
        };
    }

    componentDidMount() {
        // here because takes some processing
        this.logic = new Logic();
    }

    componentDidUpdate() {
        // any scheduled operations?
        for (const funct of this.afterUpdateOperations) {
            funct();
        }
        this.afterUpdateOperations = [];
    }

    // debugging purposes
    getState = () => this.state;

    //////////////////////////////////////////////////////////////////////////////
    // Handlers sent down to components
    //////////////////////////////////////////////////////////////////////////////

    setUserTryFirst = userTryFirst => {
        this.setState(oldState => {
            let newState = {
                ...oldState,
                compNumber: this.logic.getCandidateArr(), // 'think' comp number
                userTryFirst: userTryFirst,
                userTries: userTryFirst ? [SU.emptyUserTry] : [],
            };
            if (userTryFirst) {
                let compTryDigits = this.logic.getCandidateArr(oldState);
                SU.addCompTry(newState, compTryDigits);
            }
            return newState;
        });
    };

    sendTry = () => {
        this.setState(oldState => {
            let newState = { ...oldState };
            // rate try sent and send rate back
            let currentUserTry = SU.getCurrentUserTry(oldState);
            // console.log('App -> sendTry -> currentUserTry.digitVals', currentUserTry.digitVals);
            // console.log('App -> sendTry -> this.state.compNumber', this.state.compNumber);
            let rate = this.logic.rateTry(newState.compNumber, currentUserTry.digitVals);
            let newUserTry = {
                ...currentUserTry,
                rg: rate.good,
                rr: rate.reg,
                showRateFlds: true,
            };
            newState = SU.replLastUserTry(newState, newUserTry);

            // send comp try?
            if (!newState.compDone) {
                let compTryDigits = this.logic.getCandidateArr(oldState);
                let compTry = {
                    ...SU.emptyCompTry,
                    digitVals: compTryDigits,
                    showRateFlds: true,
                };
                newState.compTries = [...newState.compTries, compTry];
            }

            console.log('App -> sendTry -> newState', newState);
            return newState;
        });
    };

    sendRate = (e, rg, rr) => {
        this.setState(oldState => {
            console.log('App -> sendrate oldState: ', oldState);

            // record rate in last compTry
            let currentCompTry = SU.getCurrentCompTry(oldState);
            currentCompTry.rg = rg;
            currentCompTry.rr = rr;
            let newState = SU.replLastCompTry(oldState, currentCompTry);

            const rating = {
                num: asNumber(currentCompTry.digitVals),
                rtg: {
                    good: rg,
                    reg: rr,
                },
            };

            // schedule candidate reduction for after update
            this.afterUpdateOperations.push(() => {
                this.logic.reduceCandidates(rating);
                if (DEBUG_REDUCING_CANDIDATES) {
                    newState.candLen = this.logic.getCandLen();
                    showCandidates(this.logic.candidates);
                }
            });

            // add empty user try
            newState.userTries = [...oldState.userTries, SU.emptyUserTry];
            newState.showRateFlds = true;
            console.log('App -> sendrate newState: ', newState);

            return newState;
        });
    };

    changeNumberKey = (event, fldId) => {
        let eventValue = event.target.value;
        this.setState(oldState => {
            // console.log('App -> changeKey -> state entering: ', oldState);
            let [kType, kIdx] = this.getFldKey(fldId);

            let currentUserTry = SU.getCurrentUserTry(oldState);
            let newUserTry;

            if (eventValue) {
                newUserTry = this.handleDigitAdded(currentUserTry, kIdx, eventValue);
            } else {
                // value removed from field
                newUserTry = this.handleFieldRemoved(currentUserTry, kType, kIdx);
            }
            let newState = SU.replLastUserTry(oldState, newUserTry);

            return newState;
        });
    };

    changeRateKey = (event, fldId) => {
        let eventValue = event.target.value;
        this.setState(oldState => {
            // console.log('App -> changeRateKey -> state entering: ', oldState);
            let currentCompTry = SU.getCurrentCompTry(oldState);
            let newCompTry;

            if (eventValue) {
                newCompTry = this.handleRateAdded(currentCompTry, fldId, eventValue);
            } else {
                // value removed from field
                newCompTry = this.handleFieldRemoved(currentCompTry, fldId);
            }
            let newState = SU.replLastCompTry(oldState, newCompTry);
            return newState;
        });
    };

    //////////////////////////////////////////////////////////////////////////////////////////
    //  Event handler helpers
    //////////////////////////////////////////////////////////////////////////////////////////

    getFldKey = value => Object.keys(FLD_NAMES).find(key => FLD_NAMES[key] === value);

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
        let newTryState = { ...currentUserTry };
        if (this.getFldKey(fldId) === 'rg') {
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
                return false;
            }
        }
        return true;
    };

    //////////////////////////////////////////////////////////////////////////////////////////
    //  Render
    //////////////////////////////////////////////////////////////////////////////////////////

    render = () => {
        if (this.state.userTryFirst === null) {
            console.log('rendering AskWhoFirst');
            return <AskWhoFirst onSetWhoFirst={this.setUserTryFirst} />;
        }
        console.log('App -> render -> this.state', this.state);
        return <TriesPanel {...this.state} />;
    };
}

export default App;
