import React from 'react';
import PropTypes from 'prop-types';
import Digit from './Digit';
import { FLD_NAMES } from './Const';
// import styled from 'styled-components';

const Digit4 = ({ digitVals, readOnly, onDigitCh, refs }) => (
    <div>
        <Digit
            value={digitVals[0]}
            readonly={readOnly}
            onCh={onDigitCh}
            dn={FLD_NAMES['d0']}
            first
            inptRef={refs[0]}
        />
        <Digit
            value={digitVals[1]}
            readonly={readOnly}
            onCh={onDigitCh}
            dn={FLD_NAMES['d1']}
            inptRef={refs[1]}
        />
        <Digit
            value={digitVals[2]}
            readonly={readOnly}
            onCh={onDigitCh}
            dn={FLD_NAMES['d2']}
            inptRef={refs[2]}
        />
        <Digit
            value={digitVals[3]}
            readonly={readOnly}
            onCh={onDigitCh}
            dn={FLD_NAMES['d3']}
            inptRef={refs[3]}
        />
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
    refs: PropTypes.array.isRequired,
};

export default Digit4;
