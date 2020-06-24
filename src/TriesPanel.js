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

/**
 * A component panel composed of user and comp tries columns
 *
 * @author Juan Marchionatto
 *
 */
class TriesPanel extends React.PureComponent {
    // constructor(props) {
    //     super(props);
    //     console.log('TriesPanel -> constructor -> props', props);
    // }

    render() {
        if (this.props.userTryFirst) {
            return (
                <DivT>
                    <DivTc>
                        <UserTriesColumn
                            tries={this.props.userTries}
                            handlers={this.props.handlers}
                        />
                    </DivTc>
                    <DivTc>
                        <CompTriesColumn
                            tries={this.props.compTries}
                            handlers={this.props.handlers}
                            discrepVisib={this.props.discrepVisib}
                        />
                    </DivTc>
                </DivT>
            );
        } else {
            return (
                <DivT>
                    <DivTc>
                        <CompTriesColumn
                            tries={this.props.compTries}
                            handlers={this.props.handlers}
                            discrepVisib={this.props.discrepVisib}
                        />
                    </DivTc>
                    <DivTc>
                        <UserTriesColumn
                            tries={this.props.userTries}
                            handlers={this.props.handlers}
                        />
                    </DivTc>
                </DivT>
            );
        }
    }
}

TriesPanel.propTypes = {
    userTryFirst: PropTypes.bool.isRequired,
    userTries: PropTypes.array.isRequired,
    compTries: PropTypes.array.isRequired,
    handlers: PropTypes.object,
    discrepVisib: PropTypes.string,
};

export default TriesPanel;
