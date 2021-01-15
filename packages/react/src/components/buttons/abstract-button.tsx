import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { Theme } from '../../themes/theme';
import { focus } from '../../utils/css-state';

export const AbstractButton = styled.button<{ isMobile: boolean }>`
    align-items: center;
    appearance: none;
    background: inherit;
    border: 1px solid;
    border-radius: 1.5rem;
    color: inherit;
    display: inline-flex;
    font-family: inherit;
    font-size: ${({ isMobile }) => (isMobile ? 0.875 : 0.75)}rem;
    font-weight: var(--font-bold);
    height: ${({ isMobile }) => (isMobile ? 48 : 32)}px;
    justify-content: center;
    letter-spacing: ${({ isMobile }) => (isMobile ? 0.53 : 0.4)}px;
    line-height: ${({ isMobile }) => (isMobile ? 1.5 : 1)}rem;
    min-height: 2rem;
    min-width: 2rem;
    outline: none;
    padding: ${({ isMobile }) => (isMobile ? '0 var(--spacing-3x);' : '0 var(--spacing-2x);')};
    text-transform: uppercase;
    user-select: none;

    ${(props) => focus(props, true)};

    &:not(:disabled) {
        cursor: pointer;
    }

    > svg {
        color: inherit;
    }
`;

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'destructive';

interface ButtonTypeStyles {
    buttonType: ButtonType;
    inverted?: boolean;
    theme: Theme;
}

const getPrimaryButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({ theme }) => css`
    background-color: ${theme.main['primary-1.1']};
    border-color: ${theme.main['primary-1.1']};
    color: ${theme.greys.white};

    &:hover {
        background-color: ${theme.main['primary-1.3']};
        border-color: ${theme.main['primary-1.3']};
    }

    &:disabled {
        background-color: ${theme.main['primary-1.2']};
        border-color: ${theme.main['primary-1.2']};
    }
`;

const getSecondaryButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({ theme }) => css`
    background-color: transparent;
    border-color: ${theme.main['primary-1.1']};
    color: ${theme.main['primary-1.1']};

    &:hover {
        border-color: ${theme.main['primary-1.3']};
        color: ${theme.main['primary-1.3']};
    }

    &:disabled {
        border-color: ${theme.main['primary-1.2']};
        color: ${theme.main['primary-1.2']};
    }
`;

const getTertiaryButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({ theme }) => css`
    background-color: transparent;
    border-color: transparent;
    color: ${theme.greys['dark-grey']};

    &:hover {
        background-color: ${theme.greys.grey};
        color: ${theme.greys.black};
    }

    &:disabled {
        background-color: transparent;
        color: ${theme.greys['mid-grey']};
    }
`;

const getDestructiveButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<Theme>> = ({ inverted, theme }) => css`
    background-color: ${inverted ? theme.greys.white : theme.notifications['error-2.1']};
    border-color: ${inverted ? theme.greys.white : theme.notifications['error-2.1']};
    color: ${inverted ? theme.notifications['error-2.1'] : theme.greys.white};

    &:hover {
        /* TODO change colors when updating thematization */
        background-color: ${inverted ? theme.greys.white : '#62071b'};
        border-color: ${inverted ? theme.greys.white : '#62071b'};
        color: ${inverted ? '#62071b' : theme.greys.white};
    }

    &:disabled {
        &,
        &:focus,
        &:hover {
            /* TODO change colors when updating thematization */
            background-color: ${inverted ? theme.greys.white : '#ea8da3'};
            border-color: ${inverted ? theme.greys.white : '#ea8da3'};
            color: ${inverted ? '#ea8da3' : theme.greys.white};
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
