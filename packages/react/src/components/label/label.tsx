import React, { ReactNode } from 'react';

import styled from 'styled-components';
import { equisoftTheme } from '../../themes/equisoft';

const StyledLabel = styled.label`
  color: ${equisoftTheme.greys.black};
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.0166em;
  line-height: 1.1666;
  margin: 0;

  input + & {
    margin-left: 0.5rem;
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
