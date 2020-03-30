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

const Atry = props => (
    <div>
        <DivTc>
            <SubBtn type="submit" visib={props.showSendTry}>
                Send Try
            </SubBtn>
        </DivTc>
        <DivTc>
            <Digit4 {...props.digitVals} readOnly={props.valsRO} />
        </DivTc>
        <DivTc>
            <Digit value={props.rg} readOnly={props.rateRO} />
        </DivTc>
        <DivTc>
            <Digit value={props.rr} readOnly={props.rateRO} />
        </DivTc>
        <DivTc>
            <SubBtn type="submit" visib={props.showRate}>
                Rate
            </SubBtn>
        </DivTc>
    </div>
);

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
