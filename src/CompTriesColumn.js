import React from 'react';
import PropTypes from 'prop-types';
import TriesColumn from './TriesColumn';

/**
 * CompTriesColumn is a TriesColumn which showSendTry is always false
 */
const CompTriesColumn = props => (
    <TriesColumn showSendTry={false} title={'My Tries'} tries={props.tries} />
);

CompTriesColumn.propTypes = {
    tries: PropTypes.array.isRequired,
};

export default CompTriesColumn;
