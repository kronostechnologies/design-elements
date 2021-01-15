import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { Theme } from '../../themes';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { AbstractButton, getButtonTypeStyles } from './abstract-button';

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'destructive';

type Type = 'submit' | 'button' | 'reset';

interface ButtonProps {
    /**
     * Visual style
     * @default primary
     */
    buttonType: ButtonType;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    inverted?: boolean;
    label?: string;
    type?: Type;

    onClick?(): void;
}

const StyledButton = styled(AbstractButton)<{ theme: Theme } & ButtonProps>`
    ${getButtonTypeStyles}
`;

export function Button({
    children, className, label, type = 'submit', buttonType, disabled, onClick, ...props
}: ButtonProps): ReactElement {
    const { isMobile } = useDeviceContext();

    return (
        <StyledButton
            isMobile={isMobile}
            type={type}
            buttonType={buttonType}
            className={className}
            disabled={disabled}
            onClick={onClick}
            {...props /* eslint-disable-line react/jsx-props-no-spreading *//* To spread aria-* and data-* */}
        >
            {children}
            {label}
        </StyledButton>
    );
}
