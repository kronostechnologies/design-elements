import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';
import { focus } from '../../utils/css-state';
import { getButtonStyles } from '../buttons';
import { LinkProps } from './types';

interface LinkStylesProps {
    $isMobile: boolean;
    $disabled: LinkProps['disabled'];
    theme: ResolvedTheme;
}

export const getLinkStyles = ({
    $disabled, $isMobile, theme,
}: LinkStylesProps): FlattenInterpolation<ThemeProps<ResolvedTheme>> => css`
    align-items: center;
    border-radius: var(--border-radius);
    color: ${theme.component['link-text-color']};
    cursor: pointer;
    font-size: ${$isMobile ? '1rem' : '0.875rem'};
    font-style: normal;
    font-weight: var(--font-normal);
    letter-spacing: 0.2px;
    line-height: 20px;
    padding: 0 4px;

    svg {
        color: ${theme.component['link-icon-color']};
        height: 1rem;
        width: 1rem;
    }

    &[visited],
    &:visited {
        color: ${theme.component['link-visited-text-color']};
        text-decoration-color: ${theme.component['link-visited-text-color']};
        svg {
            color: ${theme.component['link-visited-icon-color']};
        }
    }

    &[hover],
    &:hover {
        color: ${theme.component['link-hover-text-color']};
        text-decoration-color: ${theme.component['link-hover-text-color']};
        svg {
            color: ${theme.component['link-hover-icon-color']};
        }
    }

    &[disabled],
    &[aria-disabled='true'],
    &:disabled {
        color: ${$disabled && theme.component['link-disabled-text-color']};
        cursor: not-allowed;
        pointer-events: none;
        text-decoration-color: ${$disabled && theme.component['link-disabled-text-color']};
        svg {
            color: ${$disabled && theme.component['link-disabled-icon-color']};
        }
    }

    ${focus({ theme }, { focusType: 'focus-visible' })};
`;

export const StyledLink = styled.a<{
    $disabled: LinkProps['disabled'],
    $buttonProps?: LinkProps['button'],
    $isMobile: boolean
}>`
    ${({
        $buttonProps, $disabled, $isMobile, theme,
    }) => (
        $buttonProps
            ? getButtonStyles({
                $size: $buttonProps.size,
                buttonType: $buttonProps.buttonType,
                focusable: $buttonProps.focusable,
                inverted: $buttonProps.inverted,
                $isMobile,
                theme,
            })
            : getLinkStyles({
                $disabled,
                $isMobile,
                theme,
            }))
};

    display: inline-flex;
    flex-direction: row;
    gap: ${({ $buttonProps }) => ($buttonProps ? 'var(--spacing-1x)' : 'var(--spacing-half)')};
    text-decoration: underline;
`;
