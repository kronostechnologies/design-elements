import React from 'react';
import styled from 'styled-components';
import plusicon from 'feather-icons/dist/icons/plus.svg';


import SVG from '../../svg';
import Abstract from '../abstract';
import style from '../styles/primary.js';

const Button = styled(Abstract)`
  ${style}
`;

const Plus = styled(SVG)`
  height: 1rem;
  margin-right: 0.5rem;
  width: 1rem;
`;

export default ({ children, disabled, onClick }) => (
    <Button disabled={disabled} onClick={onClick}>
        <Plus svg={plusicon} />
        {children}
    </Button>
);
