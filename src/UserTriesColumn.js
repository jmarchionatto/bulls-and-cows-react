import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TriesColumn from './TriesColumn';

/**
 * UserTriesColumn is a TriesColumn which showRate is always false
 */

const DivSt = styled.div`
    width: 30em;
    padding: 8px;
    vertical-align: top;
`;

const UserTriesColumn = props => (
    <DivSt>
        <TriesColumn showRate={false} title={'Your Tries'} tries={props.tries} />
    </DivSt>
);

UserTriesColumn.propTypes = {
    tries: PropTypes.array.isRequired,
};

export default UserTriesColumn;
