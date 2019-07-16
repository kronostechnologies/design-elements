import React from 'react';
import styled from 'styled-components';

import { AbstractButton } from './abstract-button';

const Button = styled(AbstractButton)`
  background: rgb(255, 255, 255);
  border-color: rgb(217, 221, 226);
  color: rgb(99, 114, 130);

  &:focus,
  &:hover {
    background-color: rgb(217, 221, 226);
    border-color: rgb(217, 221, 226);
    color: rgb(99, 114, 130);
  }

  &:disabled {
    &,
    &:focus,
    &:hover {
      background-color: rgb(242, 243, 249);
      border-color: rgb(217, 221, 226);
      color: rgb(156, 167, 180);
    }
  }
`;

const SearchButton = ({ children, disabled, onClick, ...props }) => (
    <Button {...props} disabled={disabled} onClick={onClick}>
        {children}
    </Button>
);

export { SearchButton };
