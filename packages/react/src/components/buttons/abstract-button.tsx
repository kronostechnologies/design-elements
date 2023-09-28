import { ButtonHTMLAttributes, EventHandler, forwardRef, MouseEvent, PropsWithChildren, Ref, useCallback } from 'react';
import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { Theme } from '../../themes';
import { focus } from '../../utils/css-state';

type Size = 'small' | 'medium';

const getButtonMinHeight = ({ isMobile, size }: { isMobile: boolean, size?: Size }): string => {
    switch (size) {
        case 'small':
            return isMobile ? 'var(--size-3x)' : 'var(--size-1halfx)';
        case 'medium':
        default:
            return isMobile ? 'var(--size-3x)' : 'var(--size-2x)';
    }
};

const getButtonPadding = ({ isMobile, size }: { isMobile: boolean, size?: Size }): string => {
    switch (size) {
        case 'small':
            return isMobile ? '0 var(--spacing-3x);' : '0 var(--spacing-1halfx);';
        case 'medium':
        default:
            return isMobile ? '0 var(--spacing-3x);' : '0 var(--spacing-2x);';
    }
};

export const defaultButtonStyles = css<{ isMobile: boolean, size?: Size }>`
    align-items: center;
    appearance: none;
    background: inherit;
    border: 1px solid;
    border-radius: 1.5rem;
    box-sizing: border-box;
    color: inherit;
    display: inline-flex;
    font-family: inherit;
    font-size: ${({ isMobile }) => (isMobile ? 0.875 : 0.75)}rem;
    font-weight: var(--font-bold);
    justify-content: center;
    letter-spacing: ${({ isMobile }) => (isMobile ? 0.033125 : 0.025)}rem;
    line-height: ${({ isMobile }) => (isMobile ? 1.5 : 1)}rem;
    min-height: ${getButtonMinHeight};
    min-width: 2rem;
    outline: none;
    padding: ${getButtonPadding};
    text-transform: uppercase;
    user-select: none;

    ${(props) => focus(props, true)};

    &:not(:disabled) {
        cursor: pointer;
    }

    > svg {
        color: inherit;
        height: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
        width: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
    }
`;

interface AbstractButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isMobile: boolean;
    size?: Size;
}

const StyledButton = styled.button<AbstractButtonProps>`
    ${defaultButtonStyles}
`;

export const AbstractButton = forwardRef<HTMLButtonElement, PropsWithChildren<AbstractButtonProps>>((
    { children, onClick, ...props }: AbstractButtonProps,
    ref: Ref<HTMLButtonElement>,
) => {
    const handleClick: EventHandler<MouseEvent<HTMLButtonElement>> = useCallback((event) => {
        event.stopPropagation();
        onClick?.(event);
    }, [onClick]);

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <StyledButton onClick={handleClick} ref={ref} {...props}>{children}</StyledButton>
    );
});
AbstractButton.displayName = 'AbstractButton';

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'destructive';

export interface ButtonTypeStyles {
    buttonType: ButtonType;
    inverted?: boolean;
    theme: Theme;
}

const getButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({
    inverted,
    buttonType,
    theme,
}) => (
    css`
        background-color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-bg`] : theme.tokens[`button-${buttonType}-bg`]};
        border-color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-border`] : theme.tokens[`button-${buttonType}-border`]};
        color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-color`] : theme.tokens[`button-${buttonType}-color`]};

        &:hover,
        &[aria-expanded='true'] {
            background-color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-hover-bg`] : theme.tokens[`button-${buttonType}-hover-bg`]};
            border-color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-hover-border`] : theme.tokens[`button-${buttonType}-hover-border`]};
            color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-hover-color`] : theme.tokens[`button-${buttonType}-hover-color`]};
        }

        &:focus {
            background-color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-focus-bg`] : theme.tokens[`button-${buttonType}-focus-bg`]};
            border-color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-focus-border`] : theme.tokens[`button-${buttonType}-focus-border`]};
            color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-focus-color`] : theme.tokens[`button-${buttonType}-focus-color`]};
        }

        &:disabled {
            background-color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-disabled-bg`] : theme.tokens[`button-${buttonType}-disabled-bg`]};
            border-color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-disabled-border`] : theme.tokens[`button-${buttonType}-disabled-border`]};
            color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-disabled-color`] : theme.tokens[`button-${buttonType}-disabled-color`]};
            ${buttonType === 'destructive' ? css`
                &,
                &:focus,
                &:hover {
                    background-color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-disabled-bg`] : theme.tokens[`button-${buttonType}-disabled-bg`]};
                    border-color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-disabled-border`] : theme.tokens[`button-${buttonType}-disabled-border`]};
                    color: ${inverted ? theme.tokens[`button-${buttonType}-inverted-disabled-color`] : theme.tokens[`button-${buttonType}-disabled-color`]};
                }
            ` : ''}
        }
    `
);

export const getButtonTypeStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = (props) => css`
    ${focus(props, true)};
    ${getButtonStyles(props)};
    
`;
