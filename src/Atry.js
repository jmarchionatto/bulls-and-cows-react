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
    // display: ${props => props.subVisible || 'none'};
    visibility: ${props => props.visib || 'hidden'};
    width: 4em;
    height: 3em;
    text-align: center;
    border-radius: 10px;
`;

const Atry = tryProps => (
    <div>
        <DivTc>
            <SubBtn type="submit" visib={tryProps.showSendTry}>
                Send Try
            </SubBtn>
        </DivTc>
        <DivTc>
            <Digit4 {...tryProps.digitVals} readOnly={tryProps.valsRO} />
        </DivTc>
        <DivTc>
            <Digit value={tryProps.rg} readOnly={tryProps.rateRO} />
        </DivTc>
        <DivTc>
            <Digit value={tryProps.rr} readOnly={tryProps.rateRO} />
        </DivTc>
        <DivTc>
            <SubBtn type="submit" visib={tryProps.showSendTry}>
                Rate
            </SubBtn>
        </DivTc>
    </div>
);

Atry.propTypes = {
    tryProps: PropTypes.object.isRequired,
};

export default Atry;
