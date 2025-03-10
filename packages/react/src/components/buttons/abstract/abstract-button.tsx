import { forwardRef, PropsWithChildren, Ref, MouseEvent } from 'react';
import { useDeviceContext } from '../../device-context-provider/device-context-provider';
import { StyledAbstractButton } from './styled';
import { AbstractButtonProps } from './types';

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

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
        if (disabled) {
            event.preventDefault();
            event.stopPropagation();
        } else if (onClick) {
            onClick(event);
        }
    };

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
