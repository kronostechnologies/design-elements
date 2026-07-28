import styled, { css, type FlattenInterpolation, type ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../../themes';
import { DropdownMenuButton, dropdownMenuButtonClasses } from '../../dropdown-menu-button';
import type { ViewControlVariant } from '../view-control';

interface ViewControlDropdownButtonProps extends ThemeProps<ResolvedTheme> {
    $variant?: ViewControlVariant;
}

function getVariantTokenPrefix(variant: ViewControlVariant | undefined): `${ViewControlVariant}-` | '' {
    return variant ? `${variant}-` : '';
}

function computeTokenStyles({
    $variant,
    theme,
}: ViewControlDropdownButtonProps): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    const tokenKeyword = getVariantTokenPrefix($variant);
    const border = tokenKeyword === ''
        ? `1px solid ${theme.component['view-control-button-border-color']}`
        : 'none';
    return css`
        background-color: ${theme.component[`view-control-button-${tokenKeyword}background-color`]};
        border: ${border};
        color: ${theme.component[`view-control-button-${tokenKeyword}value-color`]};

        &:hover {
            background-color: ${theme.component[`view-control-button-${tokenKeyword}hover-background-color`]};
        }
    `;
}

export const ViewControlDropdownButton = styled(DropdownMenuButton)
    .attrs(() => ({ align: 'left' }))<ViewControlDropdownButtonProps>`
    .${dropdownMenuButtonClasses.button} {
        ${computeTokenStyles};
        border-radius: var(--border-radius);
        display: flex;
        font-weight: ${({ theme }) => theme.ref['font-weight-regular']};
        padding: 0 var(--spacing-1x);

        &:hover {
            border-color: ${({ theme }) => theme.component['view-control-button-hover-border-color']};
            color: ${({ $variant, theme }) => theme.component[`view-control-button-${getVariantTokenPrefix($variant)}hover-value-color`]};
        }

        .${dropdownMenuButtonClasses.expandIcon} {
            flex-shrink: 0;
            margin: 0;
        }
    }
`;
