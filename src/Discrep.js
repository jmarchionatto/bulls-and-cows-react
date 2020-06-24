import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DigitRO from './DigitRO';

const DivT = styled.div`
    display: table;
`;

const DivTc = styled.div`
    display: table-cell;
    padding: 8px;
    vertical-align: top;
`;

/**
 * Discrepancy component, to display a discrepancy between a user
 * incorrect reply sent and the correct reply
 *
 * @author Juan Marchionatto
 *
 */
class Discrep extends React.PureComponent {
    constructor(props) {
        super(props);
        console.log('Discrep -> constructor -> props', props);
    }

    render() {
        return (
            <DivT>
                <DivTc>
                    <DigitRO value={this.props.discrep.rightRate.rg} readOnly={true} />
                </DivTc>
                <DivTc>
                    <DigitRO value={this.props.discrep.rightRate.rr} readOnly={true} />
                </DivTc>
            </DivT>
        );
    }
}

Discrep.propTypes = {
    discrep: PropTypes.object.isRequired,
};

export default Discrep;
