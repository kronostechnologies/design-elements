import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement } from 'react';
import styled from 'styled-components';

import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { AbstractButtonProps } from './abstract-button';
import { Button } from './button';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

type Type = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>['type'];

const PlusIcon = styled(Icon)`
    margin-right: var(--spacing-1x);
`;

interface ButtonProps extends Omit<AbstractButtonProps, 'children'> {
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
}

export function AddButton({
    className,
    type = 'submit',
    buttonType,
    disabled,
    label,
    onClick,
}: ButtonProps): ReactElement {
    const { isMobile } = useDeviceContext();

    return (
        <Button
            className={className}
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
