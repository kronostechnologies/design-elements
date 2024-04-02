import { ButtonHTMLAttributes, forwardRef, PropsWithChildren, Ref } from 'react';
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
) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledButton onClick={onClick} ref={ref} {...props}>{children}</StyledButton>
));

AbstractButton.displayName = 'AbstractButton';

export type ButtonType =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'destructive'
    | 'destructive-secondary'
    | 'destructive-tertiary';

export interface ButtonTypeStyles {
    buttonType: ButtonType;
    inverted?: boolean;
    theme: Theme;
}

const getPrimaryButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({
    inverted,
    theme,
}) => css`
    background-color: ${inverted ? theme.greys.white : theme.main['primary-1.1']};
    border-color: ${inverted ? theme.greys.white : theme.main['primary-1.1']};
    color: ${inverted ? theme.main['primary-1.1'] : theme.greys.white};

    &:hover,
    &[aria-expanded='true'] {
        background-color: ${inverted ? theme.greys.white : theme.main['primary-1.3']};
        border-color: ${inverted ? theme.greys.white : theme.main['primary-1.3']};
        ${inverted && `color: ${theme.main['primary-1.3']}`}
    }

    &:disabled {
        background-color: ${inverted ? theme.greys.white : theme.main['primary-1.2']};
        border-color: ${inverted ? theme.greys.white : theme.main['primary-1.2']};
        ${inverted && `color: ${theme.main['primary-1.2']}`}
    }
`;

const getSecondaryButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({
    inverted,
    theme,
}) => css`
    background-color: ${inverted ? 'transparent' : theme.greys.white};
    border-color: ${inverted ? theme.greys.white : theme.main['primary-1.1']};
    color: ${inverted ? theme.greys.white : theme.main['primary-1.1']};

    &:hover,
    &[aria-expanded='true'] {
        border-color: ${inverted ? theme.main['primary-1.2'] : theme.main['primary-1.3']};
        color: ${inverted ? theme.main['primary-1.2'] : theme.main['primary-1.3']};
    }

    &:disabled {
        border-color: ${inverted ? theme.main['primary-1.3'] : theme.main['primary-1.2']};
        color: ${inverted ? theme.main['primary-1.3'] : theme.main['primary-1.2']};
    }

    ${inverted && `&:focus {
        background-color: ${theme.main['primary-2']};
        border-color: ${theme.main['primary-1.1']}
        color: ${theme.greys.white};
    }`}
`;

const getTertiaryButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({
    inverted,
    theme,
}) => css`
    background-color: transparent;
    border-color: transparent;
    color: ${inverted ? theme.greys.white : theme.greys['dark-grey']};

    &:hover,
    &[aria-expanded='true'] {
        background-color: ${inverted ? theme.main['primary-1.3'] : theme.greys.grey};
        color: ${inverted ? theme.greys.white : theme.greys['neutral-90']};
    }

    &:disabled {
        background-color: transparent;
        color: ${inverted ? theme.main['primary-1.3'] : theme.greys['mid-grey']};
    }
`;

const getDestructiveButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({
    inverted,
    theme,
}) => css`
    background-color: ${inverted ? theme.greys.white : theme.notifications['alert-2.1']};
    border-color: ${inverted ? theme.greys.white : theme.notifications['alert-2.1']};
    color: ${inverted ? theme.notifications['alert-2.1'] : theme.greys.white};

    &:hover,
    &[aria-expanded='true'] {
        /* TODO change colors when updating thematization */
        background-color: ${inverted ? theme.greys.white : '#7B1A15'};
        border-color: ${inverted ? theme.greys.white : '#7B1A15'};
        color: ${inverted ? '#7B1A15' : theme.greys.white};
    }

    &:disabled {
        &,
        &:focus,
        &:hover {
            /* TODO change colors when updating thematization */
            background-color: ${inverted ? theme.greys.white : '#F99D99'};
            border-color: ${inverted ? theme.greys.white : '#F99D99'};
            color: ${inverted ? '#F99D99' : theme.greys.white};
        }
    }
`;

const getDestructiveSecondaryButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({
    inverted,
    theme,
}) => css`
    background-color: ${inverted ? 'transparent' : theme.greys.white};
    border-color: ${inverted ? theme.greys.white : theme.notifications['alert-2.1']};
    color: ${inverted ? theme.greys.white : theme.notifications['alert-2.1']};

    &:hover,
    &[aria-expanded='true'] {
        /* TODO change colors when updating thematization */
        background-color: ${inverted ? '#7B1A15' : theme.greys.white};
        border-color: ${inverted ? theme.greys.white : '#7B1A15'};
        color: ${inverted ? theme.greys.white : '#7B1A15'};
    }

    &:disabled {
        color: ${inverted ? theme.greys.white : '#F99D99'};

        &,
        &:focus,
        &:hover {
            /* TODO change colors when updating thematization */
            background-color: ${inverted ? '#F99D99' : theme.greys.white};
            border-color: ${inverted ? theme.greys.white : '#F99D99'};
            color: ${inverted ? theme.greys.white : '#F99D99'};
        }
    }
`;

const getDestructiveTertiaryButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({
    theme,
}) => css`
    background-color: transparent;
    border-color: transparent;
    color: ${theme.notifications['alert-2.1']};

    &:hover,
    &[aria-expanded='true'] {
        /* TODO change colors when updating thematization */
        background-color: #faeae9;
        border-color: transparent;
        color: #7b1a15;
    }

    &:disabled {
        color: #f99d99;

        &,
        &:focus,
        &:hover {
            /* TODO change colors when updating thematization */
            background-color: transparent;
            border-color: transparent;
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
            case 'destructive-secondary':
                return getDestructiveSecondaryButtonStyles(props);
            case 'destructive-tertiary':
                return getDestructiveTertiaryButtonStyles(props);
        }
    }}
`;
