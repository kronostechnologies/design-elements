import PlusSign from 'feather-icons/dist/icons/plus.svg';
import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { Button } from './button';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

type Type = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>['type'];

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
     * @default submit
     */
    type?: Type;
    label?: string;
    children?: ReactNode;
    disabled?: boolean;

    onClick?(): void;
}

export function AddButton({ type = 'submit', ...props }: ButtonProps): ReactElement {
    return (
        <Button type={type} {...props}>
            <PlusIcon />
        </Button>
    );
}
