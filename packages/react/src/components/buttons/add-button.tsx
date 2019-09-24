import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import PlusSign from 'feather-icons/dist/icons/plus.svg';
import { Button } from './button';

const PlusIcon = styled(PlusSign)`
  height: 1rem;
  margin-right: 0.5rem;
  width: 1rem;
`;

interface ButtonProps {
    label?: string;
    children?: ReactNode;
    disabled?: boolean;

    onClick?(): void;
    buttonType: 'primary' | 'secondary' | 'tertiary';
}

export function AddButton({ disabled, onClick, buttonType, label }: ButtonProps): ReactElement {
    const handleClick = () => { onClick && onClick(); };

    return (
        <Button disabled={disabled} onClick={handleClick} buttonType={buttonType} label={label}>
            <PlusIcon />
        </Button>
    );
}
