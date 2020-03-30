import React from 'react';
import PropTypes from 'prop-types';
import DigitsLine from './DigitsLine';
import styled from 'styled-components';

const RowDiv = styled.div`
    display: table-row;
    padding: 8px;
`;

const CellDiv = styled.div`
    display: table-cell;
    padding: 8px;
`;

const GameRow = ({ aRow }) => (
    <RowDiv className="gamerow">
        <CellDiv>
            <DigitsLine
                digitVals={aRow.userTry.digitVals}
                rg={aRow.userTry.rg}
                rr={aRow.userTry.rr}
                valsRO={aRow.userTry.valsRO}
                rateRO={aRow.userTry.rateRO}
                showSendTry={aRow.userTry.showSendTry}
                showSendRate={aRow.userTry.showSendRate}
            />
        </CellDiv>
        <CellDiv>
            <DigitsLine
                digitVals={aRow.compTry.digitVals}
                rg={aRow.compTry.rg}
                rr={aRow.compTry.rr}
                valsRO={aRow.compTry.valsRO}
                rateRO={aRow.compTry.rateRO}
                showSendTry={aRow.compTry.showSendTry}
                showSendRate={aRow.compTry.showSendRate}
            />
        </CellDiv>
    </RowDiv>
);

GameRow.propTypes = {
    aRow: PropTypes.any.isRequired,
};

GameRow.defaultProps = {
    digit4Vals: ['', '', '', ''],
    rg: '',
    rr: '',
    subVisible: true,
};

export default GameRow;
