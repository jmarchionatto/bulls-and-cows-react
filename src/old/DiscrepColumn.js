import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Discrep from '../Discrep';

const DivSt = styled.div`
    width: 30em;
    padding: 8px;
    vertical-align: top;
`;

const ColDiv = styled.div`
    visibility: ${(props) => props.visib || 'hidden'};
    border: 0.2em solid #1c6ea4;
    padding: 0.4em;
`;

const StH3 = styled.h3`
    text-align: center;
`;

class DiscrepColumn extends React.PureComponent {
    render() {
        let tryDiscreps = this.props.tries.map((e) => e.discrep);
        // console.log('DiscrepColumn -> render -> tryDiscreps', tryDiscreps);

        let discrepComps = [];
        tryDiscreps.map((discrep, i) => {
            if (discrep) {
                discrepComps.push(<Discrep key={i} discrep={discrep} />);
            }
        });
        // console.log('DiscrepColumn -> render -> discrepComps', discrepComps);

        return (
            <DivSt>
                <ColDiv visib={this.props.visib}>
                    <StH3>{this.props.title}</StH3>
                    {discrepComps}
                </ColDiv>
            </DivSt>
        );
    }
}

DiscrepColumn.propTypes = {
    title: PropTypes.string.isRequired,
    tries: PropTypes.array.isRequired,
    visib: PropTypes.string,
};

export default DiscrepColumn;
