import { ButtonHTMLAttributes, forwardRef, MouseEvent, PropsWithChildren, Ref, useCallback } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../../device-context-provider';
import { type BaseButtonStyles, getBaseButtonStyles } from './styles';

export const StyledAbstractButton = styled.button<BaseButtonStyles>`
    ${getBaseButtonStyles};
`;

export type ButtonSize = 'small' | 'medium';

export interface AbstractButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    focusable?: boolean;
    isMobile: boolean;
    size?: ButtonSize;
    tabIndex?: number;
}

export const AbstractButton = forwardRef<HTMLButtonElement, PropsWithChildren<AbstractButtonProps>>(({
    children,
    onClick,
    focusable,
    isMobile: providedIsMobile,
    size,
    disabled,
    ...props
}: AbstractButtonProps, ref: Ref<HTMLButtonElement>) => {
    const { isMobile } = useDeviceContext();

    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>): void => {
        if (disabled) {
            event.preventDefault();
            event.stopPropagation();
        } else if (onClick) {
            onClick(event);
        }
    }, [disabled, onClick]);

    return (
        <StyledAbstractButton
            $focusable={focusable}
            $isMobile={providedIsMobile !== undefined ? providedIsMobile : isMobile}
            $size={size}
            onClick={handleClick}
            ref={ref}
            tabIndex={focusable === false ? -1 : undefined}
            aria-disabled={disabled ? 'true' : undefined}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        >
            {children}
        </StyledAbstractButton>
    );
});

AbstractButton.displayName = 'AbstractButton';
