import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputTxt = styled.input`
    background: black;
    height: 2em;
    width: 2em;
    text-align: center;

    border-top:    4px solid #1c6ea4;
    border-right:  4px solid #1c6ea4;
    border-bottom: 4px solid #1c6ea4;
    border-left:   ${props => (props.first ? '4px' : '0px')} solid #1c6ea4;

    font-family: Verdana
    font-size: 3em;
    color: #27B11E;
    font-weight: bold;
`;

const Digit = ({ value, first, readOnly, ...rest }) => (
    <InputTxt
        className={rest.className}
        first={first}
        type="text"
        length="1"
        value={value}
        readonly={readOnly}
    />
);

Digit.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    first: PropTypes.bool,
    className: PropTypes.string,
    readOnly: PropTypes.bool,
};

Digit.defaultProps = {
    value: '',
    className: '',
};

export default Digit;
