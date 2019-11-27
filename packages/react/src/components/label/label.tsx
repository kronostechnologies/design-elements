import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  color: ${props => props.theme.greys.black};
  display: block;
  font-size: 0.75rem;
  font-weight: var(--font-normal);
  letter-spacing: 0.025rem;
  line-height: 1.25rem;
  margin: 0;

  input + & {
    margin-left: var(--spacing-half);
  }
`;

interface LabelProps {
    children: ReactNode;
    forId: string;
}

const Label = ({ children, forId }: LabelProps) => (
    <StyledLabel htmlFor={forId}>
        {children}
    </StyledLabel>
);

export { Label };
