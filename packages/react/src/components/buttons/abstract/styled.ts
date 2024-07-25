import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../../themes/theme';
import { focus } from '../../../utils/css-state';
import { Size } from '../types';

export interface BaseButtonStyles {
    $size?: Size;
    $isMobile: boolean;
    $focusable?: boolean;
    $inverted?: boolean;
}

export const getButtonMinHeight = ({ $isMobile, $size }: BaseButtonStyles): string => {
    switch ($size) {
        case 'small':
            return $isMobile ? 'var(--size-3x)' : 'var(--size-1halfx)';
        case 'medium':
        default:
            return $isMobile ? 'var(--size-3x)' : 'var(--size-2x)';
    }
};

export const getButtonPadding = ({ $isMobile, $size }: BaseButtonStyles): string => {
    switch ($size) {
        case 'small':
            return $isMobile ? '0 var(--spacing-3x);' : '0 var(--spacing-1halfx);';
        case 'medium':
        default:
            return $isMobile ? '0 var(--spacing-3x);' : '0 var(--spacing-2x);';
    }
};

export const getBaseButtonStyles = ({
    $size, $isMobile, $focusable, $inverted,
}: BaseButtonStyles): FlattenInterpolation<ThemeProps<ResolvedTheme>> => css`
    align-items: center;
    appearance: none;
    background: inherit;
    border: 1px solid;
    border-radius: 1.5rem;
    box-sizing: border-box;
    color: inherit;
    display: inline-flex;
    flex-direction: row;
    gap: var(--spacing-1x);
    font-family: inherit;
    font-size: ${$isMobile ? 0.875 : 0.75}rem;
    font-weight: var(--font-bold);
    justify-content: center;
    letter-spacing: ${$isMobile ? 0.033125 : 0.025}rem;
    line-height: ${$isMobile ? 1.5 : 1}rem;
    min-height: ${getButtonMinHeight({ $isMobile, $size })};
    min-width: 2rem;
    outline: none;
    padding: ${getButtonPadding({ $isMobile, $size })};
    text-transform: uppercase;
    user-select: none;

    ${({ theme }) => $focusable !== false && focus({ theme }, { inverted: $inverted })};

    > svg {
        color: inherit;
        height: ${$isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)'};
        width: ${$isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)'};
    }
`;

export const baseButtonStyles = css<BaseButtonStyles>`
    align-items: center;
    appearance: none;
    background: inherit;
    border: 1px solid;
    border-radius: 1.5rem;
    box-sizing: border-box;
    color: inherit;
    display: inline-flex;
    font-family: inherit;
    font-size: ${({ $isMobile }) => ($isMobile ? 0.875 : 0.75)}rem;
    font-weight: var(--font-bold);
    justify-content: center;
    letter-spacing: ${({ $isMobile }) => ($isMobile ? 0.033125 : 0.025)}rem;
    line-height: ${({ $isMobile }) => ($isMobile ? 1.5 : 1)}rem;
    min-height: ${getButtonMinHeight};
    min-width: 2rem;
    outline: none;
    padding: ${getButtonPadding};
    text-transform: uppercase;
    user-select: none;

    ${(props) => props.$focusable !== false && focus};

    > svg {
        color: inherit;
        height: ${({ $isMobile }) => ($isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
        width: ${({ $isMobile }) => ($isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
    }
`;

export const StyledAbstractButton = styled.button<BaseButtonStyles>`
    ${baseButtonStyles}
`;
