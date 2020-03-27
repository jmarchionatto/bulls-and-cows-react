import React from 'react';
import PropTypes from 'prop-types';
import Digit from './Digit';
import Digit4 from './Digit4';
import styled from 'styled-components';

const DivT = styled.div`
    display: table;
`;

const DivTr = styled.div`
    display: table-row;
`;

const DivTc = styled.div`
    display: table-cell;
    padding: 8px;
`;

const SubBtn = styled.button`
    // display: ${props => props.subVisible || 'none'};
    visibility: ${props => props.visib || 'hidden'};
    width: 4em;
    height: 2em;
    vertical-align: top;
    border-radius: 10px;
`;

const DigitsLine = ({ digitVals, rg, rr, valsReadOnly, btnVisib }) => (
    <DivT>
        <DivTr>
            <DivTc>
                <SubBtn type="submit" visib={btnVisib}>
                    Send
                </SubBtn>
            </DivTc>
            <DivTc>
                <Digit4 {...digitVals} valsReadOnly={valsReadOnly} />
            </DivTc>
            <DivTc>
                <Digit value={rg} readOnly={!valsReadOnly} />
            </DivTc>
            <DivTc>
                <Digit value={rr} readOnly={!valsReadOnly} />
            </DivTc>
        </DivTr>
    </DivT>
);

DigitsLine.propTypes = {
    digitVals: PropTypes.arrayOf(PropTypes.string).isRequired,
    rg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    rr: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    valsReadOnly: PropTypes.bool,
    btnVisib: PropTypes.string,
};

DigitsLine.defaultProps = {
    digitVals: ['', '', '', ''],
    rg: '',
    rr: '',
    subVisible: true,
};

export default DigitsLine;
