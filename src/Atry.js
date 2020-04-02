import React from 'react';
import PropTypes from 'prop-types';
import Digit from './Digit';
import Digit4 from './Digit4';
import { FLD_NAMES } from './Const';
import styled from 'styled-components';

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
        console.log('Atry -> constructor -> props', props);
    }

    render() {
        return (
            <div>
                <DivTc>
                    <SubBtn type="submit" visib={this.props.try.showSendTry}>
                        Send Try
                    </SubBtn>
                </DivTc>
                <DivTc>
                    <Digit4
                        digitVals={this.props.try.digitVals}
                        readOnly={this.props.try.valsRO}
                        onDigitCh={this.props.handlers.onChangeKey}
                    />
                </DivTc>
                <DivTc>
                    <Digit
                        value={this.props.try.rg}
                        readOnly={this.props.try.ratesRO}
                        onCh={this.props.handlers.onChangeKey}
                        dn={FLD_NAMES['rg']}
                    />
                </DivTc>
                <DivTc>
                    <Digit
                        value={this.props.try.rr}
                        readOnly={this.props.try.ratesRO}
                        onCh={this.props.handlers.onChangeKey}
                        dn={FLD_NAMES['rr']}
                    />
                </DivTc>
                <DivTc>
                    <SubBtn type="submit" visib={this.props.try.showRate}>
                        Rate
                    </SubBtn>
                </DivTc>
            </div>
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
    handlers: PropTypes.object,
};

Atry.ddefaultProps = {
    digitVals: ['', '', '', ''],
};

export default Atry;
