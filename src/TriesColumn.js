import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Atry from './Atry';

const ColDiv = styled.div`
    border: 0.2em solid #1c6ea4;
    padding: 0.4em;
`;

const StH3 = styled.h3`
    text-align: center;
`;

class TriesColumn extends React.PureComponent {
    render() {
        let tryElements = [];
        this.props.tries.map((aTry, i) => {
            tryElements.push(
                <Atry
                    userOrComp={this.props.userOrComp}
                    key={i}
                    try={aTry}
                    handlers={this.props.handlers}
                    discrepVisib={this.props.discrepVisib}
                />
            );
        });
        return (
            <ColDiv>
                <StH3>{this.props.title}</StH3>
                {tryElements}
            </ColDiv>
        );
    }
}

TriesColumn.propTypes = {
    title: PropTypes.string.isRequired,
    tries: PropTypes.array.isRequired,
    handlers: PropTypes.object,
    userOrComp: PropTypes.string.isRequired,
    discrepVisib: PropTypes.string,
};

export default TriesColumn;
