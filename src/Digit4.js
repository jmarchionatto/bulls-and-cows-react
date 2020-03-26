import React from 'react';
import PropTypes from 'prop-types';
import Digit from './Digit';
// import styled from "styled-components";

const Digit4 = ({ digValues, divClass, digitClass }) => (
    <div className={divClass}>
        <div className={digitClass}>
            <Digit value={digValues[0]} />
        </div>
        <div className={digitClass}>
            <Digit value={digValues[1]} />
        </div>
        <div className={digitClass}>
            <Digit value={digValues[2]} />
        </div>
        <div className={digitClass}>
            <Digit value={digValues[3]} />
        </div>
    </div>
);

Digit4.propTypes = {
  digValues: PropTypes.arrayOf( function(propValue, key, componentName, location, propFullName) {
    const blankOrSingleNumber = RegExp('^(?:\\d{1}|)$');
    if ( ! blankOrSingleNumber.test(propValue[key]) ) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  }),
  divClass: PropTypes.string,
  digitClass: PropTypes.string,
};

Digit4.defaultProps = {
  digvalues: ['', '', '', ''],
};

export default Digit4;
