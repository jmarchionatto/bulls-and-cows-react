import React from 'react';
import PropTypes from 'prop-types';
import TriesColumn from './TriesColumn';

/**
 * UserTriesColumn is a TriesColumn which showRate is always false
 */
const UserTriesColumn = props => (
    <TriesColumn showRate={false} title={'Your Tries'} tries={props.tries} />
);

UserTriesColumn.propTypes = {
    tries: PropTypes.array.isRequired,
};

export default UserTriesColumn;
