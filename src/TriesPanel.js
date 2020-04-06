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
    constructor(props) {
        super(props);
        // console.log('TriesPanel -> constructor -> props', props);
    }

    render() {
        if (this.props.userTryFirst) {
            return (
                <DivT>
                    <DivTc>
                        <UserTriesColumn
                            tries={this.props.userTries}
                            handlers={this.props.handlers}
                        />
                        ,
                    </DivTc>
                    <DivTc>
                        <CompTriesColumn
                            tries={this.props.compTries}
                            handlers={this.props.handlers}
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
                        />
                    </DivTc>
                    <DivTc>
                        <UserTriesColumn
                            tries={this.props.userTries}
                            handlers={this.props.handlers}
                        />
                        ,
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
};

export default TriesPanel;
