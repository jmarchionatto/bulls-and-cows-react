import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserTriesColumn from './UserTriesColumn';
import CompTriesColumn from './CompTriesColumn';

const DivTc = styled.div`
    display: table-cell;
    padding: 8px;
    vertical-align: top;
`;

class TriesPanel extends React.PureComponent {
    render() {
        let tryCols = [];
        if (this.props.userFirst) {
            tryCols.push(
                <UserTriesColumn userTries={this.props.userTries} />,
                <CompTriesColumn compTries={this.props.compTries} />
            );
        } else {
            tryCols.push(<CompTriesColumn />, <UserTriesColumn />);
        }
        return <DivTc>{tryCols}</DivTc>;
    }
}

TriesPanel.propTypes = {
    userFirst: PropTypes.bool.isRequired,
    userTries: PropTypes.array.isRequired,
    compTries: PropTypes.array.isRequired,
};

export default TriesPanel;
