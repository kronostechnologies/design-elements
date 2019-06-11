import React from 'react';
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin: 0 0 1.5rem;
`;

export default ({ children, ...props }) => (
    <FieldContainer {...props}>
        {children}
    </FieldContainer>
);
