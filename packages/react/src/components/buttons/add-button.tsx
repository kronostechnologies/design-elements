import React from 'react';
import styled from 'styled-components';

import PlusSign from 'feather-icons/dist/icons/plus.svg';
import { Button, ButtonProps } from './button';

const PlusIcon = styled(PlusSign)`
  height: 1rem;
  margin-right: 0.5rem;
  width: 1rem;
`;

const AddButton = ({ disabled, onClick, buttonType, label }: ButtonProps) => {
    const handleClick = () => { onClick && onClick(); };

    return (
        <Button disabled={disabled} onClick={handleClick} buttonType={buttonType} label={label}>
            <PlusIcon />
        </Button>
    );
};

export { AddButton };
