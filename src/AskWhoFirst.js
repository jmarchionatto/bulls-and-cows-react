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

const AskWhoFirst = ({ setWhoFirst }) => (
    <StlDiv>
        <h3>Who do you want to play first?</h3>
        <UserBtn onClick={e => setWhoFirst(true, e)}>You</UserBtn>
        <CompBtn onClick={e => setWhoFirst(false, e)}>Me</CompBtn>
    </StlDiv>
);

AskWhoFirst.propTypes = {
    setWhoFirst: PropTypes.func.isRequired,
};

export default AskWhoFirst;
