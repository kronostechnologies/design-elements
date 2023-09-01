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

const getPrimaryButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({
    inverted,
    theme,
}) => css`
    background-color: ${inverted ? theme.greys.white : theme.main['brand-50']};
    border-color: ${inverted ? theme.greys.white : theme.main['brand-50']};
    color: ${inverted ? theme.main['brand-50'] : theme.greys.white};

    &:hover,
    &[aria-expanded='true'] {
        background-color: ${inverted ? theme.greys.white : theme.main['brand-70']};
        border-color: ${inverted ? theme.greys.white : theme.main['brand-70']};
        ${inverted && `color: ${theme.main['brand-70']}`}
    }

    &:disabled {
        background-color: ${inverted ? theme.greys.white : theme.main['brand-20']};
        border-color: ${inverted ? theme.greys.white : theme.main['brand-20']};
        ${inverted && `color: ${theme.main['brand-20']}`}
    }
`;

const getSecondaryButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({
    inverted,
    theme,
}) => css`
    background-color: ${inverted ? 'transparent' : theme.greys.white};
    border-color: ${inverted ? theme.greys.white : theme.main['brand-50']};
    color: ${inverted ? theme.greys.white : theme.main['brand-50']};

    &:hover,
    &[aria-expanded='true'] {
        border-color: ${inverted ? theme.main['brand-20'] : theme.main['brand-70']};
        color: ${inverted ? theme.main['brand-20'] : theme.main['brand-70']};
    }

    &:disabled {
        border-color: ${inverted ? theme.main['brand-70'] : theme.main['brand-20']};
        color: ${inverted ? theme.main['brand-70'] : theme.main['brand-20']};
    }

    ${inverted && `&:focus {
        background-color: ${theme.main['brand-80']};
        border-color: ${theme.main['brand-50']}
        color: ${theme.greys.white};
    }`}
`;

const getTertiaryButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({
    inverted,
    theme,
}) => css`
    background-color: transparent;
    border-color: transparent;
    color: ${inverted ? theme.greys.white : theme.greys['neutral-65']};

    &:hover,
    &[aria-expanded='true'] {
        background-color: ${inverted ? theme.main['brand-70'] : theme.greys.grey};
        color: ${inverted ? theme.greys.white : theme.greys.black};
    }

    &:disabled {
        background-color: transparent;
        color: ${inverted ? theme.main['brand-70'] : theme.greys['neutral-30']};
    }

    &:focus {
        background-color: ${inverted ? theme.main['brand-80'] : theme.greys.white};
        border-color: ${theme.main['brand-50']};
        color: ${inverted ? theme.greys.white : theme.greys['neutral-65']};
    }
`;

const getDestructiveButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({
    inverted,
    theme,
}) => css`
    background-color: ${inverted ? theme.greys.white : theme.notifications['alert-50']};
    border-color: ${inverted ? theme.greys.white : theme.notifications['alert-50']};
    color: ${inverted ? theme.notifications['alert-50'] : theme.greys.white};

    &:hover,
    &[aria-expanded='true'] {
        /* TODO change colors when updating thematization */
        background-color: ${inverted ? theme.greys.white : theme.notifications['alert-70']};
        border-color: ${inverted ? theme.greys.white : theme.notifications['alert-70']};
        color: ${inverted ? theme.notifications['alert-70'] : theme.greys.white};
    }
   
    &:disabled {
        &,
        &:focus,
        &:hover {
            /* TODO change colors when updating thematization */
            background-color: ${inverted ? theme.greys.white : theme.notifications['alert-20']};
            border-color: ${inverted ? theme.greys.white : theme.notifications['alert-20']};
            color: ${inverted ? theme.notifications['alert-20'] : theme.greys.white};
        }
    }
`;

export const getButtonTypeStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = (props) => css`
    ${focus(props, true)};
    ${() => {
        switch (props.buttonType) {
            case 'primary':
                return getPrimaryButtonStyles(props);
            case 'secondary':
                return getSecondaryButtonStyles(props);
            case 'tertiary':
                return getTertiaryButtonStyles(props);
            case 'destructive':
                return getDestructiveButtonStyles(props);
        }
    }}
`;
