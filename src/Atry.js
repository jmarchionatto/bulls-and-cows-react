import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Digit4 from './Digit4';
import Digit from './Digit';
import { FLD_NAMES } from './Const';
import { getFldKey } from './Util';

const DivT = styled.div`
    display: table;
`;

const DivTc = styled.div`
    display: table-cell;
    padding: 8px;
    vertical-align: top;
`;

const SubBtn = styled.button`
    visibility: ${props => props.visib || 'hidden'};
    width: 4em;
    height: 3em;
    text-align: center;
    border-radius: 10px;
`;

const RateDiv = styled.div`
    visibility: ${props => props.visib || 'hidden'};
`;

class Atry extends React.PureComponent {
    constructor(props) {
        super(props);

        this.digitRefs = [];
        for (let i = 0; i < 4; i++) {
            this.digitRefs.push(React.createRef());
        }

        this.rgRef = React.createRef();
        this.rrRef = React.createRef();
        // console.log('Atry -> constructor -> props', props);
    }

    sendTry = e => {
        // console.log('Atry -> sendTry e', e);
        this.props.handlers.onSendTry(e);
    };

    sendRate = e => {
        // console.log('Atry -> sendRate e', e);
        this.props.handlers.onSendRate(e, this.props.try.rg, this.props.try.rr);
    };

    onDigitChange = (e, dn) => {
        let [kType, kIdx] = getFldKey(dn);

        // forward event
        if (kType === 'd') {
            this.props.handlers.onChangeNumberKey(e, dn);
        } else {
            this.props.handlers.onChangeRateKey(e, dn);
        }

        console.log('Atry -> onDigitChange -> e.target.value', e.target.value);
        console.log('Atry -> onDigitChange -> dn', dn);

        // handle focus
        if (!e.target.value) return; // keep focus in same field

        if (kType === 'd') {
            // move focus to next digit or to submit button if last digit
            kIdx = Number(kIdx);
            if (kIdx <= 2) {
                this.digitRefs[kIdx + 1].current.focus();
            }
        } else {
            if (kIdx === 'g') {
                this.rrRef.current.focus();
            }
        }
    };

    componentDidMount = () => {
        if (this.props.try.digitVals[0] === '') {
            this.digitRefs[0].current.focus();
        } else {
            if (this.props.try.rg === '') {
                this.rgRef.current.focus();
            }
        }
    };

    render() {
        return (
            <DivT>
                <DivTc>
                    <SubBtn type="submit" visib={this.props.try.showSendTry} onClick={this.sendTry}>
                        Send Try
                    </SubBtn>
                </DivTc>
                <DivTc>
                    <Digit4
                        digitVals={this.props.try.digitVals}
                        readOnly={this.props.try.valsRO}
                        onDigitCh={this.onDigitChange}
                        refs={this.digitRefs}
                    />
                </DivTc>
                <RateDiv visib={this.props.try.showRateFlds}>
                    <DivTc>
                        <Digit
                            value={this.props.try.rg}
                            readOnly={this.props.try.ratesRO}
                            onCh={this.onDigitChange}
                            dn={FLD_NAMES['rg']}
                            inptRef={this.rgRef}
                        />
                    </DivTc>
                    <DivTc>
                        <Digit
                            value={this.props.try.rr}
                            readOnly={this.props.try.ratesRO}
                            onCh={this.onDigitChange}
                            dn={FLD_NAMES['rr']}
                            inptRef={this.rrRef}
                        />
                    </DivTc>
                    <DivTc>
                        <SubBtn
                            type="submit"
                            visib={this.props.try.showRateBtn}
                            onClick={this.sendRate}
                        >
                            Rate
                        </SubBtn>
                    </DivTc>
                </RateDiv>
            </DivT>
        );
    }
}

Atry.propTypes = {
    try: PropTypes.object.isRequired,
    digitVals: PropTypes.arrayOf(PropTypes.number),
    rg: PropTypes.number,
    rr: PropTypes.number,
    showSendTry: PropTypes.bool,
    showRate: PropTypes.bool,
    valsRO: PropTypes.bool,
    ratesRO: PropTypes.bool,
    handlers: PropTypes.object.isRequired,
};

Atry.ddefaultProps = {
    digitVals: ['', '', '', ''],
};

export default Atry;
