import React, { ReactElement, ReactNode } from 'react';

import PlusSign from 'feather-icons/dist/icons/plus.svg';
import styled from 'styled-components';
import { Button } from './button';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

const PlusIcon = styled(PlusSign)`
    margin: -1px var(--spacing-half) -1px calc(var(--spacing-half) * -1);
`;

interface ButtonProps {
    /**
     * Visual style
     * @default primary
     **/
    buttonType: ButtonType;
    label?: string;
    children?: ReactNode;
    disabled?: boolean;

    onClick?(): void;
}

export function AddButton({ disabled, onClick, buttonType, label }: ButtonProps): ReactElement {
    const handleClick = () => { onClick && onClick(); };

    return (
        <Button disabled={disabled} onClick={handleClick} buttonType={buttonType} label={label}>
            <PlusIcon />
        </Button>
    );
}
