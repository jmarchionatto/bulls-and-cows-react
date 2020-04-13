import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TriesColumn from './TriesColumn';

/**
 * CompTriesColumn is a TriesColumn which showSendTry is always false
 */

const DivSt = styled.div`
    /* width: 30em; */
    width: ${(props) => props.width};
    padding: 8px;
    vertical-align: top;
`;

const CompTriesColumn = (props) => (
    <DivSt width={props.discrepVisib ? '35em' : '30em'}>
        <TriesColumn
            userOrComp={'comp'}
            title={'My Tries'}
            tries={props.tries}
            handlers={props.handlers}
            discrepVisib={props.discrepVisib}
        />
    </DivSt>
);

CompTriesColumn.propTypes = {
    tries: PropTypes.array.isRequired,
    handlers: PropTypes.object,
    discrepVisib: PropTypes.string,
};

export default CompTriesColumn;
