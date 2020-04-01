import React from 'react';
import PropTypes from 'prop-types';
import Digit from './Digit';
import Digit4 from './Digit4';
import styled from 'styled-components';

const DivTc = styled.div`
    display: table-cell;
    padding: 8px;
    vertical-align: top;
`;

const SubBtn = styled.button`
    /* display: ${props => props.subVisible || 'none'}; */
    visibility: ${props => props.visib || 'hidden'};
    width: 4em;
    height: 3em;
    text-align: center;
    border-radius: 10px;
`;

class Atry extends React.PureComponent {
    onDigitChange = e => {
        console.log('onDigitChange -> e.target: ', e.target);
        console.log('onDigitChange -> e.target.value: ', e.target.value);
        return true;
    };

    render() {
        console.log('this.onDigitChange: ', this.onDigitChange);

        return (
            <div>
                <DivTc>
                    <SubBtn type="submit" visib={this.props.showSendTry}>
                        Send Try
                    </SubBtn>
                </DivTc>
                <DivTc>
                    <Digit4
                        {...this.props.digitVals}
                        readOnly={this.props.valsRO}
                        onDigitCh={this.onDigitChange}
                    />
                </DivTc>
                <DivTc>
                    <Digit
                        value={this.props.rg}
                        readOnly={this.props.rateRO}
                        onCh={this.onDigitChange}
                        dn={'Digit-g'}
                    />
                </DivTc>
                <DivTc>
                    <Digit
                        value={this.props.rr}
                        readOnly={this.props.rateRO}
                        onCh={this.onDigitChange}
                        dn={'Digit-r'}
                    />
                </DivTc>
                <DivTc>
                    <SubBtn type="submit" visib={this.props.showRate}>
                        Rate
                    </SubBtn>
                </DivTc>
            </div>
        );
    }
}

Atry.propTypes = {
    digitVals: PropTypes.arrayOf(PropTypes.number),
    rg: PropTypes.number,
    rr: PropTypes.number,
    showSendTry: PropTypes.bool,
    showRate: PropTypes.bool,
    valsRO: PropTypes.bool,
    rateRO: PropTypes.bool,
};

Atry.ddefaultProps = {
    digitVals: ['', '', '', ''],
};

export default Atry;
