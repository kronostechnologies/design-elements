import React from 'react';
import styled from 'styled-components';
import PlusSign from 'feather-icons/dist/icons/plus.svg';

import { SECONDARY } from '../../constants';

import primaryStyle from './styles/primary.js';
import secondaryStyle from './styles/secondary.js';

import AbstractButton from './abstract-button';


const Button = styled(AbstractButton)`
  ${props => (props.type === SECONDARY ? secondaryStyle : primaryStyle)}
`;

const PlusIcon = styled(PlusSign)`
  height: 1rem;
  margin-right: 0.5rem;
  width: 1rem;
`;

const AddButton = ({ children, disabled, onClick, type }) => (
    <Button disabled={disabled} onClick={onClick} type={type}>
        <PlusIcon />
        {children}
    </Button>
);

export default AddButton;
