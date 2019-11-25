import React, { ReactNode } from 'react';

import styled from 'styled-components';

const StyledLi = styled.li`
  > * {
    margin: 12px 0;
  }

  > a {
    margin: 0;
    padding: 12px 0;
  }

  .external {
    color: ${props => props.theme.greys['dark-grey']};

    &:hover {
      color: ${props => props.theme.greys.black};
      text-decoration: none;
    }

    &:visited {
      color: ${props => props.theme.greys['dark-grey']};

      svg {
        color: ${props => props.theme.greys['dark-grey']};
      }

      &:hover {
        color: ${props => props.theme.greys.black};

        svg {
          color: ${props => props.theme.greys.black};
        }
      }
    }
  }
`;

interface MobileMenuItemProps {
    children: ReactNode;
}

export const MobileMenuItem = ({ children }: MobileMenuItemProps) => (
    <StyledLi>
        {children}
    </StyledLi>
);
