import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Atry from './Atry';

const ColDiv = styled.div`
    border: 0.2em solid #1c6ea4;
    padding: 0.4em;
`;

class TriesColumn extends React.PureComponent {
    render() {
        let tryElements = [];
        this.props.tries.map((aTry, i) => {
            tryElements.push(<Atry key={i} try={aTry} />);
        });
        return (
            <ColDiv>
                <h3>{this.props.title}</h3>
                {tryElements}
            </ColDiv>
        );
    }
}

TriesColumn.propTypes = {
    title: PropTypes.string.isRequired,
    tries: PropTypes.array.isRequired,
};

export default TriesColumn;
