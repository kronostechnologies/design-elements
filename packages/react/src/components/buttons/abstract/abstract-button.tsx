import { forwardRef, PropsWithChildren, Ref } from 'react';
import { StyledAbstractButton } from './styled';
import { AbstractButtonProps } from './types';

export const AbstractButton = forwardRef<HTMLButtonElement, PropsWithChildren<AbstractButtonProps>>(({
    children,
    onClick,
    focusable,
    size,
    isMobile,
    ...props
}: AbstractButtonProps, ref: Ref<HTMLButtonElement>) => (
    <StyledAbstractButton
        $focusable={focusable}
        $size={size}
        $isMobile={isMobile}
        onClick={onClick}
        ref={ref}
        tabIndex={focusable === false ? -1 : undefined}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
    >
        {children}
    </StyledAbstractButton>
));

AbstractButton.displayName = 'AbstractButton';
