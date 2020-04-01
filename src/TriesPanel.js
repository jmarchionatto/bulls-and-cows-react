import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserTriesColumn from './UserTriesColumn';
import CompTriesColumn from './CompTriesColumn';

const DivT = styled.div`
    display: table;
`;

const DivTc = styled.div`
    display: table-cell;
    padding: 8px;
    vertical-align: top;
`;

class TriesPanel extends React.PureComponent {
    render() {
        if (this.props.userFirst) {
            return (
                <DivT>
                    <DivTc>
                        <UserTriesColumn tries={this.props.userTries} />,
                    </DivTc>
                    <DivTc>
                        <CompTriesColumn tries={this.props.compTries} />
                    </DivTc>
                </DivT>
            );
        } else {
            return (
                <DivT>
                    <DivTc>
                        <CompTriesColumn tries={this.props.compTries} />
                    </DivTc>
                    <DivTc>
                        <UserTriesColumn tries={this.props.userTries} />,
                    </DivTc>
                </DivT>
            );
        }
    }
}

TriesPanel.propTypes = {
    userFirst: PropTypes.bool.isRequired,
    userTries: PropTypes.array.isRequired,
    compTries: PropTypes.array.isRequired,
};

export default TriesPanel;
