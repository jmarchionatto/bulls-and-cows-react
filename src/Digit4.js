import React from 'react';
import PropTypes from 'prop-types';
import Digit from './Digit';
// import styled from 'styled-components';

const Digit4 = (digitVals, readOnly) => (
    <div>
        <Digit value={digitVals[0]} readonly={readOnly} first />
        <Digit value={digitVals[1]} readonly={readOnly} />
        <Digit value={digitVals[2]} readonly={readOnly} />
        <Digit value={digitVals[3]} readonly={readOnly} />
    </div>
);

Digit4.propTypes = {
    digitVals: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
        const blankOrSingleNumber = RegExp('^(?:\\d{1}|)$');
        if (!blankOrSingleNumber.test(propValue[key])) {
            return new Error(
                'Invalid prop `' +
                    propFullName +
                    '` supplied to' +
                    ' `' +
                    componentName +
                    '`. Validation failed.'
            );
        }
    }),
    readOnly: PropTypes.bool,
};

Digit4.defaultProps = {
    digitVals: ['', '', '', ''],
};

export default Digit4;
