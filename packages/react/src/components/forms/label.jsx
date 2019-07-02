import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  color: rgb(0, 0, 0);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.0166em;
  line-height: 1.1666;
  margin: 0;

  input + & {
    margin-left: 0.5rem;
  }
`;

export default ({ children, forId }) => (
    <Label htmlFor={forId}>
        {children}
    </Label>
);
