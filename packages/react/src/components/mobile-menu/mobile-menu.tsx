import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

const StyledUl = styled.ul`
  font-size: 1.125rem;
  list-style: none;
  margin: 0;
  padding: 12px 24px;
`;

interface MobileMenuProps {
    children: ReactNode;
}

export const MobileMenu = ({ children }: MobileMenuProps): ReactElement => {
    return (
        <StyledUl>
            {children}
        </StyledUl>
    );
};
