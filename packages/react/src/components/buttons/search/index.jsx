import React from 'react';
import styled from 'styled-components';

import Abstract from '../abstract';

const ButtonSearch = styled(Abstract)`
  background: rgb(255, 255, 255);
  border-color: rgb(217, 221, 226);
  color: rgb(99, 114, 130);

  &:focus,
  &:hover {
    background-color: #e2732e;
    border-color: #e2732e;
    color: white;
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

export default ({ children, disabled, onClick, ...props }) => (
    <ButtonSearch {...props} disabled={disabled} onClick={onClick}>
        {children}
    </ButtonSearch>
);
