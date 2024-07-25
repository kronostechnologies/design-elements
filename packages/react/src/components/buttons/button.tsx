import {
    forwardRef,
    KeyboardEvent,
    MouseEvent,
    PropsWithChildren,
    ReactElement,
    Ref,
} from 'react';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { LeftIcon, RightIcon, StyledButton } from './styled';
import { ButtonProps } from './types';

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(({
    autofocus,
    buttonType,
    children,
    className,
    disabled,
    focusable = true,
    label,
    onClick,
    onFocus,
    onBlur,
    onKeyDown,
    title,
    leftIconName,
    rightIconName,
    type = 'button',
    ...props
}: PropsWithChildren<ButtonProps>, ref: Ref<HTMLButtonElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const iconSize = props?.size === 'small' && !isMobile ? '16' : '24';

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
        if (disabled) {
            event.preventDefault();
            event.stopPropagation();
        } else if (onClick) {
            onClick(event);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
        if (disabled) {
            event.preventDefault();
            event.stopPropagation();
        } else if (onKeyDown) {
            onKeyDown(event);
        }
    };

    return (
        <StyledButton
            autoFocus={autofocus}
            ref={ref}
            title={title}
            isMobile={isMobile}
            type={type}
            buttonType={buttonType}
            className={className}
            aria-disabled={disabled ? 'true' : undefined}
            focusable={focusable}
            onClick={handleClick}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            {...props /* eslint-disable-line react/jsx-props-no-spreading *//* To spread aria-* and data-* */}
        >
            {children}
            {leftIconName && (
                <LeftIcon
                    aria-hidden="true"
                    data-testid="left-icon"
                    name={leftIconName}
                    size={iconSize}
                />
            )}
            {label}
            {rightIconName && (
                <RightIcon
                    aria-hidden="true"
                    data-testid="right-icon"
                    name={rightIconName}
                    size={iconSize}
                />
            )}
        </StyledButton>
    );
});

Button.displayName = 'Button';
