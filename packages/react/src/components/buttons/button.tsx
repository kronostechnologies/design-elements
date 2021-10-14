import React, { forwardRef, MouseEvent, KeyboardEvent, ReactElement, ReactNode, Ref } from 'react';
import styled from 'styled-components';
import { Theme } from '../../themes';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { AbstractButton, getButtonTypeStyles } from './abstract-button';

export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'destructive';

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
    title?: string;
    type?: Type;

    onClick?(event: MouseEvent<HTMLButtonElement>): void;

    onKeyDown?(event: KeyboardEvent<HTMLButtonElement>): void;
}

const StyledButton = styled(AbstractButton)<{ theme: Theme } & ButtonProps>`
    ${getButtonTypeStyles}
`;

export const Button = forwardRef(({
    children, className, label, title, type = 'submit', buttonType, disabled, onClick, onKeyDown, ...props
}: ButtonProps, ref: Ref<HTMLButtonElement>): ReactElement => {
    const { isMobile } = useDeviceContext();

    return (
        <StyledButton
            ref={ref}
            title={title}
            isMobile={isMobile}
            type={type}
            buttonType={buttonType}
            className={className}
            disabled={disabled}
            onClick={onClick}
            onKeyDown={onKeyDown}
            {...props /* eslint-disable-line react/jsx-props-no-spreading *//* To spread aria-* and data-* */}
        >
            {children}
            {label}
        </StyledButton>
    );
});
