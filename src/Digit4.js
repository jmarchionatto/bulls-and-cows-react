import React from 'react';
import PropTypes from 'prop-types';
import Digit from './Digit';
// import styled from 'styled-components';

const Digit4 = (digitVals, valrReadonly) => (
    <>
        <Digit value={digitVals[0]} readonly={valrReadonly} first={true} />
        <Digit value={digitVals[1]} readonly={valrReadonly} />
        <Digit value={digitVals[2]} readonly={valrReadonly} />
        <Digit value={digitVals[3]} readonly={valrReadonly} />
    </>
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
    divClass: PropTypes.string,
    digitClass: PropTypes.string,
};

Digit4.defaultProps = {
    digitVals: ['', '', '', ''],
    valrReadonly: PropTypes.bool,
};

export default Digit4;
