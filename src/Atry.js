import React from 'react';
import PropTypes from 'prop-types';
import Digit from './Digit';
import Digit4 from './Digit4';
import styled from 'styled-components';

export const dgNames = {
    d0: 'digit-0',
    d1: 'digit-1',
    d2: 'digit-2',
    d3: 'digit-3',
    rg: 'digit-rg',
    rr: 'digit-rr',
};

const getDgKey = value => Object.keys(dgNames).find(key => dgNames[key] === value);

const DivTc = styled.div`
    display: table-cell;
    padding: 8px;
    vertical-align: top;
`;

const SubBtn = styled.button`
    /* display: ${props => props.showSendTry || 'none'}; */
    visibility: ${props => props.visib || 'hidden'};
    width: 4em;
    height: 3em;
    text-align: center;
    border-radius: 10px;
`;

class Atry extends React.PureComponent {
    constructor(props) {
        super();
        this.state = props.try;
    }

    onDigitChange = (e, cn) => {
        let cnKey = getDgKey(cn);
        let [kType, kIdx] = getDgKey(cn);

        if (e.target.value) {
            if (kType === 'd') {
                let newDigitVals = [...this.state.digitVals];
                newDigitVals[kIdx] = e.target.value;
                let newState = {
                    ...this.state,
                    digitVals: newDigitVals,
                };

                // must make submit btn visible
                if (this.allOtherValsSet(kIdx)) {
                    newState = {
                        ...newState,
                        showSendTry: true,
                    };
                }
                this.setState(newState);
            } else {
                if (cnKey === 'rg') {
                    let newState = {
                        ...this.state,
                        rg: e.target.value,
                    };
                    // also make rate btn visible
                    if (this.state.rr) {
                        newState = {
                            ...newState,
                            showRate: true,
                        };
                    }
                    this.setState(newState);
                } else {
                    let newState = {
                        ...this.state,
                        rr: e.target.value,
                    };
                    // also make rate btn visible
                    if (this.state.rg) {
                        newState = {
                            ...newState,
                            showRate: true,
                        };
                    }
                    this.setState(newState);
                }
            }
        } else {
            // value removed from field

            if (kType === 'd') {
                let newDigitVals = [...this.state.digitVals];
                newDigitVals[kIdx] = '';
                this.setState({ ...this.state, digitVals: newDigitVals, showSendTry: false });
            } else {
                this.setState({ ...this.state, [`r${kIdx}`]: '', showRate: false });
            }
        }

        return true;
    };

    allOtherValsSet = kIdx => {
        // console.log('------------------------------------------------------------ ');
        // console.log('allOtherValsSet -> this.state.digitVals: ', this.state.digitVals);
        for (const [valIdx, val] of this.state.digitVals.entries()) {
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

    render() {
        return (
            <div>
                <DivTc>
                    <SubBtn type="submit" visib={this.state.showSendTry}>
                        Send Try
                    </SubBtn>
                </DivTc>
                <DivTc>
                    <Digit4
                        digitVals={this.state.digitVals}
                        readOnly={this.state.valsRO}
                        onDigitCh={this.onDigitChange}
                    />
                </DivTc>
                <DivTc>
                    <Digit
                        value={this.state.rg}
                        readOnly={this.state.ratesRO}
                        onCh={this.onDigitChange}
                        dn={dgNames['rg']}
                    />
                </DivTc>
                <DivTc>
                    <Digit
                        value={this.state.rr}
                        readOnly={this.state.ratesRO}
                        onCh={this.onDigitChange}
                        dn={dgNames['rr']}
                    />
                </DivTc>
                <DivTc>
                    <SubBtn type="submit" visib={this.state.showRate}>
                        Rate
                    </SubBtn>
                </DivTc>
            </div>
        );
    }
}

Atry.propTypes = {
    try: PropTypes.object.isRequired,
    // digitVals: PropTypes.arrayOf(PropTypes.number),
    // rg: PropTypes.number,
    // rr: PropTypes.number,
    // showSendTry: PropTypes.bool,
    // showRate: PropTypes.bool,
    // valsRO: PropTypes.bool,
    // ratesRO: PropTypes.bool,
};

Atry.ddefaultProps = {
    digitVals: ['', '', '', ''],
};

export default Atry;
