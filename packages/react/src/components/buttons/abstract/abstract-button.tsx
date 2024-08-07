import { forwardRef, PropsWithChildren, Ref } from 'react';
import { StyledAbstractButton } from './styled';
import { AbstractButtonProps } from './types';

export const AbstractButton = forwardRef<HTMLButtonElement, PropsWithChildren<AbstractButtonProps>>(({
    children,
    onClick,
    focusable,
    ...props
}: AbstractButtonProps, ref: Ref<HTMLButtonElement>) => (
    <StyledAbstractButton
        $focusable={focusable}
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
