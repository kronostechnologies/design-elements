import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { Button } from './button';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

type Type = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>['type'];

const PlusIcon = styled(Icon)`
    margin-right: var(--spacing-1x);
`;

interface ButtonProps {
    /**
     * Visual style
     * @default primary
     * */
    buttonType: ButtonType;
    /**
     * Sets button type
     * @default submit
     */
    type?: Type;
    label?: string;
    disabled?: boolean;

    onClick?(): void;
}

export function AddButton({
    type = 'submit',
    buttonType,
    disabled,
    label,
    onClick,
}: ButtonProps): ReactElement {
    const { isMobile } = useDeviceContext();

    return (
        <Button
            type={type}
            buttonType={buttonType}
            onClick={onClick}
            disabled={disabled}
            label={label}
        >
            <PlusIcon name="plusSign" size={isMobile ? '24' : '16'} />
        </Button>
    );
}
