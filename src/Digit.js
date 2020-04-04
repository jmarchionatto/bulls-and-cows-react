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
    border-left: ${props => (props.first ? '4px' : '0px')} solid #1c6ea4;

    /* font-family: Verdana; */
    font-size: 1em;
    color: #27b11e;
    font-weight: bold;
`;

class Digit extends React.PureComponent {
    constructor(props) {
        super();
        this.handlers = props.onCh;
        // console.log('Digit -> constructor -> props', props);
    }

    handleChange = e => {
        console.log(
            'Digit -> handleChange App.state before: ',
            this.handlers.getState().userTries.slice(-1)[0].digitVals
        );

        this.handlers.onChangeKey(e, this.props.dn);
        // this.setState({ value: e.target.value });

        console.log(
            'Digit -> handleChange App.state after: ',
            this.handlers.getState().userTries.slice(-1)[0].digitVals
        );
    };

    render() {
        return (
            <InputTxt
                type="text"
                length="1"
                value={this.props.value}
                first={this.props.first}
                readonly={this.props.readOnly}
                onChange={this.handleChange}
            />
        );
    }
}

Digit.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    readOnly: PropTypes.bool,
    // onCh: PropTypes.func.isRequired,
    onCh: PropTypes.any,
    first: PropTypes.bool,
    dn: PropTypes.string,
};

export default Digit;
