import React from 'react';
import AskWhoFirst from './AskWhoFirst';
import TriesPanel from './TriesPanel';
import Logic from './Logic';

const appState = {
    // true if user tries first
    userTryFirst: null,
    userTries: [],
    compTries: [],
};

const emptyUserTry = {
    digitVals: [null, null, null, null],
    rg: null,
    rr: null,
    showSendTry: false,
    valsRO: false,
};

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = this.state || appState;
        this.logic = new Logic();
    }

    setUserTryFirst = userTryFirst => {
        let newState = {
            userTryFirst: userTryFirst,
        };
        // add corresponding empty try
        if (userTryFirst) {
            newState = {
                ...newState,
                userTries: [emptyUserTry],
            };
        } else {
            newState = {
                ...newState,
                compTries: [this.getCompTry()],
            };
        }
        this.setState(newState, () => {
            console.log('App -> new state: ', this.state);
        });
    };

    getCompTry = () => {
        return this.logic.getCandidate(this.state);
    };

    addCompTry = aTry => {
        const newState = {
            userTryFirst: this.state.userTryFirst,
            userTries: [...this.state.userRows],
            compTries: [...this.state.userTries, { aTry }],
        };
        this.setState({ newState });
    };

    addUserTry = aTry => {
        const newState = {
            userTryFirst: this.state.userTryFirst,
            userTries: [...this.state.userRows, { aTry }],
            compTries: [...this.state.userTries],
        };
        this.setState({ newState });
    };

    render() {
        if (this.state.userTryFirst === null) {
            console.log('rendering AskWhoFirst');
            return <AskWhoFirst onSetWhoFirst={this.setUserTryFirst} />;
        }
        return (
            <TriesPanel
                userFirst={this.state.userTryFirst}
                userTries={this.state.userTries}
                compTries={this.state.compTries}
            />
        );
    }
}

export default App;
