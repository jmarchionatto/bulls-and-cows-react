import React from 'react';
import PropTypes from 'prop-types';
// import styled from "styled-components";

const Digit = ({ value, ...props }) => (
    <input className={props.className} type="text" length="1" value={value} />
);

Digit.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
};

Digit.defaultProps = {
    value: '',
    className: '',
};

export default Digit;
