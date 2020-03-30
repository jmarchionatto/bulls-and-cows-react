import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Atry from './Atry';

const ColDiv = styled.div`
    padding: 8px;
`;

class TriesColumn extends React.PureComponent {
    render() {
        let tryElements = [];
        this.props.tries.map((aTry, i) => {
            tryElements.push(<Atry key={i} try={aTry} />);
        });
        return <ColDiv>{tryElements}</ColDiv>;
    }
}

TriesColumn.propTypes = {
    tries: PropTypes.array.isRequired,
};

export default TriesColumn;
