import React, { MouseEvent, ReactElement } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { Button } from './button';

const PlusIcon = styled(Icon)`
    margin-right: var(--spacing-1x);
`;

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'destructive';

type Type = 'submit' | 'button' | 'reset';

interface ButtonProps {
    /**
     * Visual style
     * @default primary
     */
    buttonType: ButtonType;
    className?: string;
    disabled?: boolean;
    inverted?: boolean;
    label?: string;
    type?: Type;

    onClick?(event: MouseEvent<HTMLButtonElement>): void;
}

export function AddButton({
    className,
    type = 'submit',
    buttonType,
    disabled,
    inverted,
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
            inverted={inverted}
            label={label}
        >
            <PlusIcon name="plusSign" size={isMobile ? '24' : '16'} />
        </Button>
    );
}
