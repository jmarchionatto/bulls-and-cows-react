import React from 'react';
import AskWhoFirst from './AskWhoFirst';
import TriesPanel from './TriesPanel';
import Logic from './Logic';
import * as SU from './StateMgr';

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

        this.scheduleAfterUpdate(() => {
            this.setState((oldState) => {
                oldState.compNumber = this.logic.getCandidateAsArr(); // 'think' comp number
            });
        });
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

    /**
     * Sets the received function to be run after component update
     */
    scheduleAfterUpdate = (funct) => {
        this.afterUpdateOperations.push(funct);
    };

    //////////////////////////////////////////////////////////////////////////////
    // Handlers sent down to components
    //////////////////////////////////////////////////////////////////////////////

    setUserTryFirst = (userTryFirst) => {
        this.setState((oldState) => {
            let newState = {
                compNumber: this.logic.getCandidateAsArr(), // 'think' comp number
                userTryFirst: userTryFirst,
                userTries: userTryFirst ? [SU.emptyUserTry] : [],
            };
            if (userTryFirst) {
                let compTryDigits = this.logic.getCandidateAsArr(oldState);
                SU.addCompTry(newState, compTryDigits);
            }
            return newState;
        });
    };

    receiveTry = (e, userOrComp) => {
        this.setState((oldState) => {
            let newState;
            if (userOrComp === 'user') {
                newState = this.logic.getNewUserStateForReceivedTry(oldState);

                if (!oldState.compDone) {
                    newState = this.logic.getNewCompStateForReceivedTry(newState);
                }
            } else {
                newState = this.logic.getNewStateForReceivedCompTry(oldState);
            }

            console.log('App -> receiveTry -> newState', newState);
            return newState;
        });
    };

    receiveRate = (e, rg, rr) => {
        let appInst = this;
        this.setState((oldState) => {
            // record rate in last compTry
            let newState = this.logic.getNewCompStateForReceivedRate(appInst, oldState, rg, rr);

            // add empty user try
            if (!oldState.userDone) {
                newState.userTries = [...oldState.userTries, SU.emptyUserTry];
                newState.showRateFlds = true;
            } else {
                newState = this.logic.getNewCompStateForReceivedTry(newState);
            }

            console.log('App -> sendrate newState: ', newState);
            return newState;
        });
    };

    changeNumberKey = (event, fldId, userOrComp) => {
        let kValue = event.target.value;
        this.setState((oldState) => {
            return this.logic.getNewStateForChangedNumber(oldState, kValue, fldId, userOrComp);
        });
    };

    changeRateKey = (event, fldId) => {
        let kValue = event.target.value;

        this.setState((oldState) => {
            return this.logic.getNewStateForChangedRateFld(oldState, kValue, fldId);
        });
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
