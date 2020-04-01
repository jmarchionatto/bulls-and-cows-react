import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TriesColumn from './TriesColumn';

/**
 * CompTriesColumn is a TriesColumn which showSendTry is always false
 */

const DivSt = styled.div`
    width: 30em;
    padding: 8px;
    vertical-align: top;
`;

const CompTriesColumn = props => (
    <DivSt>
        <TriesColumn showSendTry={false} title={'My Tries'} tries={props.tries} />
    </DivSt>
);

CompTriesColumn.propTypes = {
    tries: PropTypes.array.isRequired,
};

export default CompTriesColumn;
