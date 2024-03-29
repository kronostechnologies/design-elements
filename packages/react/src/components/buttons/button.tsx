import { forwardRef, KeyboardEvent, MouseEvent, PropsWithChildren, ReactElement, Ref } from 'react';
import styled from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { AbstractButton, ButtonType, getButtonTypeStyles } from './abstract-button';

type Size = 'small' | 'medium';

type Type = 'submit' | 'button' | 'reset';

interface ButtonProps {
    id?: string;
    autofocus?: boolean;
    /**
     * Visual style
     * @default primary
     */
    buttonType: ButtonType;
    className?: string;
    disabled?: boolean;
    /**
     * @default true
     */
    focusable?: boolean;
    inverted?: boolean;
    label?: string;
    /**
     * Size variant
     * @default medium
     */
    size?: Size;
    title?: string;
    type?: Type;

    onClick?(event: MouseEvent<HTMLButtonElement>): void;

    onKeyDown?(event: KeyboardEvent<HTMLButtonElement>): void;
}

const StyledButton = styled(AbstractButton)<{ theme: ResolvedTheme } & ButtonProps>`
    ${getButtonTypeStyles}
`;

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(({
    autofocus,
    buttonType,
    children,
    className,
    disabled,
    focusable = true,
    label,
    onClick,
    onKeyDown,
    title,
    type = 'button',
    ...props
}: PropsWithChildren<ButtonProps>, ref: Ref<HTMLButtonElement>): ReactElement => {
    const { isMobile } = useDeviceContext();

    return (
        <StyledButton
            autoFocus={autofocus}
            ref={ref}
            title={title}
            isMobile={isMobile}
            type={type}
            buttonType={buttonType}
            className={className}
            disabled={disabled}
            focusable={focusable}
            onClick={onClick}
            onKeyDown={onKeyDown}
            {...props /* eslint-disable-line react/jsx-props-no-spreading *//* To spread aria-* and data-* */}
        >
            {children}
            {label}
        </StyledButton>
    );
});

Button.displayName = 'Button';
