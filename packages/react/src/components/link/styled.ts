import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';
import { focus } from '../../utils/css-state';
import { getButtonStyles } from '../buttons/styled';
import { LinkProps } from './types';

export const getLinkStyles = ({
    $disabled, $isMobile,
}: {
    $disabled: LinkProps['disabled'],
    $isMobile: boolean
}, theme: ResolvedTheme): FlattenInterpolation<ThemeProps<ResolvedTheme>> => css`
    align-items: center;
    border-radius: var(--border-radius);
    color: ${$disabled ? theme.component['link-disabled-text-color'] : theme.component['link-text-color']};
    cursor: ${$disabled ? 'default' : 'pointer'};
    display: inline-flex;
    flex-direction: row;
    font-size: ${$isMobile ? '1rem' : '0.875rem'};
    gap: var(--spacing-half);
    line-height: 1.5rem;
    text-decoration: underline;
    padding: 0 4px;

    svg {
        height: 1rem;
        width: 1rem;
    }

    &:visited {
        color: ${!$disabled && theme.component['link-visited-text-color']};
        text-decoration-color: ${!$disabled && theme.component['link-visited-text-color']};
        svg {
            color: ${!$disabled && theme.component['link-visited-icon-color']};
        }
    }

    &:hover {
        color: ${!$disabled && theme.component['link-hover-text-color']};
        text-decoration-color: ${!$disabled && theme.component['link-hover-text-color']};
        svg {
            color: ${!$disabled && theme.component['link-hover-icon-color']};
        }
    }

    &[disabled] {
        cursor: not-allowed;
        pointer-events: none;
    }

    ${focus({ theme }, { focusType: 'focus-visible' })};
`;

export const StyledLink = styled.a<{
    $disabled: LinkProps['disabled'],
    $buttonProps?: LinkProps['buttonProps'],
    $isMobile: boolean
}>`
    ${({
        $buttonProps, $disabled, $isMobile, theme,
    }) => (
        $buttonProps
            ? getButtonStyles($buttonProps, $isMobile, theme)
            : getLinkStyles({ $disabled, $isMobile }, theme))
};
`;
