import React, { ReactElement, ReactNode } from 'react';

import PlusSign from 'feather-icons/dist/icons/plus.svg';
import styled from 'styled-components';
import { Button } from './button';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

type Type = 'submit' | 'button' | 'reset';

const PlusIcon = styled(PlusSign)`
    margin: -1px var(--spacing-half) -1px calc(var(--spacing-half) * -1);
`;

interface ButtonProps {
    /**
     * Visual style
     * @default primary
     **/
    buttonType: ButtonType;
    /**
     * Sets button type
     * @default button
     */
    type?: Type;
    label?: string;
    children?: ReactNode;
    disabled?: boolean;

    onClick?(): void;
}

export function AddButton({ onClick, type = 'submit', ...props }: ButtonProps): ReactElement {
    const handleClick = () => { onClick && onClick(); };

    return (
        <Button onClick={handleClick} type={type} {...props}>
            <PlusIcon />
        </Button>
    );
}
