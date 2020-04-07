import React from 'react';
import AskWhoFirst from './AskWhoFirst';
import TriesPanel from './TriesPanel';
import Logic from './Logic';
import * as SU from './StateMgr';
import { DEBUG_REDUCING_CANDIDATES } from './Const';
import * as UTIL from './Util';

export class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.afterUpdateOperations = [];
        this.pendingState = {};
        this.state = {
            // true if user tries first
            userTryFirst: true,
            userTries: [SU.emptyUserTry],
            compTries: [],
            userDone: false,
            compDone: false,
            handlers: {
                onChangeNumberKey: this.changeNumberKey,
                onChangeRateKey: this.changeRateKey,
                onSendTry: this.receiveTry,
                onSendRate: this.receiveRate,
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

    setUserTryFirst = (userTryFirst) => {
        this.setState((oldState) => {
            let newState = {
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

    receiveTry = () => {
        this.setState((oldState) => {
            let newState = this.logic.getNewUserStateForReceivedTry(oldState);

            if (!oldState.compDone) {
                newState = this.logic.getNewCompStateForReceivedTry(newState);
            }

            console.log('App -> sendTry -> newState', newState);
            return newState;
        });
    };

    receiveRate = (e, rg, rr) => {
        this.setState((oldState) => {
            // console.log('App -> sendrate oldState: ', oldState);

            // record rate in last compTry
            let currentCompTry = SU.getCurrentCompTry(oldState);
            currentCompTry.rg = rg;
            currentCompTry.rr = rr;
            currentCompTry.showRateBtn = 'hidden';

            let newState = SU.replLastCompTry(oldState, currentCompTry);

            // schedule candidate reduction for after update
            const rating = {
                num: UTIL.asNumber(currentCompTry.digitVals),
                rtg: { good: rg, reg: rr },
            };
            this.afterUpdateOperations.push(() => {
                this.logic.reduceCandidates(rating);
                let candidateLen = this.logic.getCandLen();
                if (DEBUG_REDUCING_CANDIDATES && candidateLen !== 0) {
                    console.log('%%%%%%%%% new Cand. length: ', candidateLen);
                    UTIL.showCandidates(this.logic.candidates);
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
        this.setState((oldState) => {
            // console.log('App -> changeKey -> state entering: ', oldState);
            let [kType, kIdx] = UTIL.getFldKey(fldId);

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
        this.setState((oldState) => {
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
