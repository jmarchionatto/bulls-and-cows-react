import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StlDiv = styled.div`
    padding: 8px;
`;
const UserBtn = styled.button`
    padding: 8px;
    text-align: left;
`;
const CompBtn = styled.button`
    padding: 8px;
    text-align: right;
`;

/**
 * Player order choice widget
 *
 * @author Juan Marchionatto
 *
 */
const AskWhoFirst = ({ onSetWhoFirst }) => (
    <StlDiv>
        <h3>Who do you want to play first?</h3>
        <UserBtn onClick={(e) => onSetWhoFirst(true, e)}>Me</UserBtn>
        <CompBtn onClick={(e) => onSetWhoFirst(false, e)}>You</CompBtn>
    </StlDiv>
);

AskWhoFirst.propTypes = {
    onSetWhoFirst: PropTypes.func.isRequired,
};

export default AskWhoFirst;
