import React from 'react';
import TriesColumn from './TriesColumn';
import AskWhoFirst from './AskWhoFirst';

const appState = {
    // true if user tries first
    userTryFirst: null,
    userTries: [],
    compTries: [],
};

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = this.state || appState;
    }

    setUserTryFirst = userTryFirst => {
        const newState = {
            userTryFirst: userTryFirst,
            userTries: [...this.state.userTries],
            compTries: [...this.state.compTries],
        };
        this.setState(newState, () => {
            console.log('App -> new state: ', this.state);
        });
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
        if (this.state.userTryFirst) {
            console.log('rendering user column frst');
            return (
                <div>
                    <TriesColumn tries={this.state.userTries} />
                    <TriesColumn tries={this.state.compTries} />
                </div>
            );
        }
        console.log('rendering comp column frst');
        return (
            <div>
                <TriesColumn tries={this.state.compTries} />
                <TriesColumn tries={this.state.userTries} />
            </div>
        );
    }
}

export default App;
