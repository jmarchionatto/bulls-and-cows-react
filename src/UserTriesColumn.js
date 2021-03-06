import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TriesColumn from './TriesColumn';

/**
 * UserTriesColumn is a TriesColumn which showRate is always false
 *
 * @author Juan Marchionatto
 *
 */
const DivSt = styled.div`
    width: 30em;
    padding: 8px;
    vertical-align: top;
`;

const UserTriesColumn = (props) => (
    <DivSt>
        <TriesColumn
            userOrComp={'user'}
            title={'Your Tries'}
            tries={props.tries}
            handlers={props.handlers}
        />
    </DivSt>
);

UserTriesColumn.propTypes = {
    tries: PropTypes.array.isRequired,
    handlers: PropTypes.object,
};

export default UserTriesColumn;
