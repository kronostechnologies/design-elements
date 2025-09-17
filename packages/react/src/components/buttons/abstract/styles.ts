import { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import type { ResolvedTheme } from '../../../themes';
import { focus } from '../../../utils/css-state';
import type { ButtonSize } from './abstract-button';

export interface BaseButtonStyles {
    $size?: ButtonSize;
    $isMobile: boolean;
    $focusable?: boolean;
    $inverted?: boolean;
}

function getButtonMinHeight({ $isMobile, $size }: BaseButtonStyles): string {
    switch ($size) {
        case 'small':
            return $isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)';
        case 'medium':
        default:
            return 'var(--size-2x)';
    }
}

function getButtonPadding({ $isMobile, $size }: BaseButtonStyles): string {
    switch ($size) {
        case 'small':
            return $isMobile ? '0 var(--spacing-3x);' : '0 var(--spacing-1halfx);';
        case 'medium':
        default:
            return $isMobile ? '0 var(--spacing-3x);' : '0 var(--spacing-2x);';
    }
}

export const getBaseButtonStyles = ({
    $size,
    $isMobile,
    $focusable,
    $inverted,
}: BaseButtonStyles): FlattenInterpolation<ThemeProps<ResolvedTheme>> => css`
    align-items: center;
    appearance: none;
    background: inherit;
    border: 1px solid;
    border-radius: 1.5rem;
    box-sizing: border-box;
    color: inherit;
    display: inline-flex;
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
        height: ${$isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)'};
        width: ${$isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)'};
    }
`;
