import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputTxt = styled.input`
    background: black;
    height: 2em;
    width: 2em;
    text-align: center;

    border-top: 4px solid #1c6ea4;
    border-right: 4px solid #1c6ea4;
    border-bottom: 4px solid #1c6ea4;
    border-left: ${props => (props.first ? '4px' : '0px')} solid #1c6ea4;

    font-family: Verdana;
    font-size: 1em;
    color: #27b11e;
    font-weight: bold;
`;

class Digit extends React.PureComponent {
    constructor(props) {
        super();
        this.state = { ...props };
    }

    handleChange = e => {
        this.state.onCh(e, this.state.dn);
        this.setState({ ...this.setState, value: e.target.value });
    };

    render() {
        return (
            <InputTxt
                type="text"
                length="1"
                value={this.state.value}
                first={this.state.first}
                readonly={this.state.readOnly}
                onChange={this.handleChange}
            />
        );
    }
}

Digit.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    readOnly: PropTypes.bool,
    onCh: PropTypes.func.isRequired,
    first: PropTypes.bool,
    dn: PropTypes.string,
};

export default Digit;
