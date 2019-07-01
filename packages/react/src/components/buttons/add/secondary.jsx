import React from 'react';
import styled from 'styled-components';
import PlusSign from 'feather-icons/dist/icons/plus.svg';

import Abstract from '../abstract';
import style from '../styles/secondary.js';

const Button = styled(Abstract)`
  ${style}
`;

const PlusIcon = styled(PlusSign)`
  height: 1rem;
  margin-right: 0.5rem;
  width: 1rem;
`;

export default ({ children, disabled, onClick }) => (
    <Button disabled={disabled} onClick={onClick}>
        <PlusIcon />
        {children}
    </Button>
);
