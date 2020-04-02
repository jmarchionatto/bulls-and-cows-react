import React from 'react';
import AskWhoFirst from './AskWhoFirst';
import TriesPanel from './TriesPanel';
import Logic from './Logic';

const initialState = {
    // true if user tries first
    userTryFirst: null,
    userTries: [],
    compTries: [],
};

const emptyUserTry = {
    digitVals: ['', '', '', ''],
    rg: '',
    rr: '',
    showSendTry: false,
    valsRO: false,
};

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = this.state || initialState;
        this.logic = new Logic();
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
        return <TriesPanel {...this.state} />;
    }
}

export default App;
