import {
    ButtonHTMLAttributes,
    EventHandler,
    forwardRef,
    MouseEvent,
    Ref,
    useCallback,
} from 'react';
import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { Theme } from '../../themes';
import { focus } from '../../utils/css-state';

export const defaultButtonStyles = css<{ isMobile: boolean }>`
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
    letter-spacing: ${({ isMobile }) => (isMobile ? 0.53 : 0.4)}px;
    line-height: ${({ isMobile }) => (isMobile ? 1.5 : 1)}rem;
    min-height: ${({ isMobile }) => (isMobile ? 48 : 32)}px;
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

interface AbstractButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isMobile: boolean;
}

const StyledButton = styled.button<AbstractButtonProps>`
    ${defaultButtonStyles}
`;

export const AbstractButton = forwardRef((
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
    background-color: ${inverted ? theme.greys.white : theme.main['primary-1.1']};
    border-color: ${inverted ? theme.greys.white : theme.main['primary-1.1']};
    color: ${inverted ? theme.main['primary-1.1'] : theme.greys.white};

    &:hover,
    &[aria-expanded="true"] {
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
    &[aria-expanded="true"] {
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
    &[aria-expanded="true"] {
        background-color: ${inverted ? theme.main['primary-1.3'] : theme.greys.grey};
        color: ${inverted ? theme.greys.white : theme.greys.black};
    }

    &:disabled {
        background-color: transparent;
        color: ${inverted ? theme.main['primary-1.3'] : theme.greys['mid-grey']};
    }

    &:focus {
        background-color: ${inverted ? theme.main['primary-2'] : theme.greys.white};
        border-color: ${theme.main['primary-1.1']};
        color: ${inverted ? theme.greys.white : theme.greys['dark-grey']};
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
    &[aria-expanded="true"] {
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
