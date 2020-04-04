import React from 'react';
import PropTypes from 'prop-types';
import Digit from './Digit';
import Digit4 from './Digit4';
import { FLD_NAMES } from './Const';
import styled from 'styled-components';

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
        console.log('Atry -> constructor -> props', props);
    }

    sendTry = e => {
        console.log('Atry -> sendTry e', e);
        this.props.handlers.onSendTry(e);
    };

    sendRate = e => {
        console.log('Atry -> sendRate e', e);
        this.props.handlers.onSendRate(e, this.props.try.rg, this.props.try.rr);
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
                        onDigitCh={this.props.handlers.onChangeNumberKey}
                    />
                </DivTc>
                <RateDiv visib={this.props.try.showRateFlds}>
                    <DivTc>
                        <Digit
                            value={this.props.try.rg}
                            readOnly={this.props.try.ratesRO}
                            onCh={this.props.handlers.onChangeRateKey}
                            dn={FLD_NAMES['rg']}
                        />
                    </DivTc>
                    <DivTc>
                        <Digit
                            value={this.props.try.rr}
                            readOnly={this.props.try.ratesRO}
                            onCh={this.props.handlers.onChangeRateKey}
                            dn={FLD_NAMES['rr']}
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
