import { ButtonHTMLAttributes, forwardRef, PropsWithChildren, Ref } from 'react';
import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';
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

export const defaultButtonStyles = css<{ $focusable?: boolean, isMobile: boolean, size?: Size }>`
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

    ${(props) => props.$focusable !== false && focus(props, true)};

    > svg {
        color: inherit;
        height: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
        width: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
    }
`;

interface AbstractButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    focusable?: boolean;
    isMobile: boolean;
    size?: Size;
}

const StyledButton = styled.button<{ $focusable?: boolean; isMobile: boolean; size?: Size }>`
    ${defaultButtonStyles}
`;

export const AbstractButton = forwardRef<HTMLButtonElement, PropsWithChildren<AbstractButtonProps>>(({
    children,
    onClick,
    focusable,
    ...props
}: AbstractButtonProps, ref: Ref<HTMLButtonElement>) => (
    <StyledButton
        $focusable={focusable}
        onClick={onClick}
        ref={ref}
        tabIndex={focusable === false ? -1 : undefined}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
    >
        {children}
    </StyledButton>
));

AbstractButton.displayName = 'AbstractButton';

export type ButtonType =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'destructive-primary'
    | 'destructive-secondary'
    | 'destructive-tertiary';

export interface ButtonTypeStyles {
    buttonType: ButtonType;
    focusable?: boolean;
    inverted?: boolean;
    theme: ResolvedTheme;
}

const getButtonStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<ResolvedTheme>> = ({
    focusable,
    inverted,
    buttonType,
    theme,
}) => {
    const inversionSuffix = inverted ? '-inverted' : '';

    return css`
        background-color: ${theme.component[`button-${buttonType}${inversionSuffix}-background-color`]};
        border-color: ${theme.component[`button-${buttonType}${inversionSuffix}-border-color`]};
        color: ${theme.component[`button-${buttonType}${inversionSuffix}-text-color`]};

        &:hover,
        &[aria-expanded='true'] {
            background-color: ${theme.component[`button-${buttonType}${inversionSuffix}-hover-background-color`]};
            border-color: ${theme.component[`button-${buttonType}${inversionSuffix}-hover-border-color`]};
            color: ${theme.component[`button-${buttonType}${inversionSuffix}-hover-text-color`]};
        }

        &:disabled {
            background-color: ${theme.component[`button-${buttonType}${inversionSuffix}-disabled-background-color`]};
            border-color: ${theme.component[`button-${buttonType}${inversionSuffix}-disabled-border-color`]};
            color: ${theme.component[`button-${buttonType}${inversionSuffix}-disabled-text-color`]};
            ${buttonType === 'destructive-primary' && css`
                &,
                ${focusable !== false && '&:focus,'}
                &:hover {
                    background-color: ${theme.component[`button-${buttonType}${inversionSuffix}-disabled-background-color`]};
                    border-color: ${theme.component[`button-${buttonType}${inversionSuffix}-disabled-border-color`]};
                    color: ${theme.component[`button-${buttonType}${inversionSuffix}-disabled-text-color`]};
                }
            `}
        }
    `;
};

export const getButtonTypeStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<ResolvedTheme>> = (props) => css`
    ${props.focusable !== false && focus(props, true)};
    ${getButtonStyles(props)};
`;
