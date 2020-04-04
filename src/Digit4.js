import React from 'react';
import PropTypes from 'prop-types';
import Digit from './Digit';
import { FLD_NAMES } from './Const';
// import styled from 'styled-components';

const Digit4 = ({ digitVals, readOnly, onDigitCh }) => (
    <div>
        <Digit
            value={digitVals[0]}
            readonly={readOnly}
            onCh={onDigitCh}
            dn={FLD_NAMES['d0']}
            first
        />
        <Digit value={digitVals[1]} readonly={readOnly} onCh={onDigitCh} dn={FLD_NAMES['d1']} />
        <Digit value={digitVals[2]} readonly={readOnly} onCh={onDigitCh} dn={FLD_NAMES['d2']} />
        <Digit value={digitVals[3]} readonly={readOnly} onCh={onDigitCh} dn={FLD_NAMES['d3']} />
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
    onDigitCh: PropTypes.func.isRequired,
};

export default Digit4;
