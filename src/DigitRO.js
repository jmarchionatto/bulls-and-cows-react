import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputTxt = styled.input`
    background: black;
    height: 2em;
    width: 2em;
    text-align: center;

    /* border-top: 4px solid #1c6ea4; */
    border-right: 4px solid #1c6ea4;
    border-bottom: 4px solid #1c6ea4;
    border-left: ${(props) => (props.first ? '4px' : '0px')} solid #1c6ea4;

    /* font-family: Verdana; */
    font-size: 1em;
    color: #27b11e;
    font-weight: bold;
`;

class DigitRO extends React.PureComponent {
    constructor(props) {
        super(props);
        // console.log('Digit -> constructor -> props', props);
    }

    render() {
        return (
            <InputTxt
                type="text"
                length="1"
                defaultValue={this.props.value}
                first={this.props.first}
                readOnly
            />
        );
    }
}

DigitRO.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    first: PropTypes.bool,
    dn: PropTypes.string,
};

export default DigitRO;
