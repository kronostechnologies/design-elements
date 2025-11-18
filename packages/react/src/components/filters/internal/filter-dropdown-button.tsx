import styled, { createGlobalStyle, css, type FlattenInterpolation, type ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../../themes';
import { DropdownMenuButton, dropdownMenuButtonClasses } from '../../dropdown-menu-button';

interface FilterDropdownButtonProps extends ThemeProps<ResolvedTheme> {
    $label: string;
    $hasFilters: boolean;
}

function computeTokenStyles({
    $hasFilters,
    theme,
}: FilterDropdownButtonProps): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    const tokenKeyword = $hasFilters ? 'active-' : '';
    return css`
        background-color: ${theme.component[`filter-button-${tokenKeyword}background-color`]};
        border: 1px solid ${theme.component[`filter-button-${tokenKeyword}border-color`]};
        color: ${theme.component[`filter-button-${tokenKeyword}value-color`]};
        font-weight: ${$hasFilters ? theme.ref['font-weight-semibold'] : theme.ref['font-weight-regular']};

        &::before {
            color: ${theme.component[`filter-button-${tokenKeyword}label-color`]};
        }
    `;
}

interface PortalDropdownMenuProps {
    $dropdownMenuId: string;
}

export const PortalFilterDropdownMenuStyle = createGlobalStyle<PortalDropdownMenuProps>`
    #${({ $dropdownMenuId }) => $dropdownMenuId} {
        min-width: 250px;
    }
`;

export const FilterDropdownButton = styled(DropdownMenuButton)
    .attrs<FilterDropdownButtonProps>(() => ({ align: 'left' }))`
    .${dropdownMenuButtonClasses.button} {
        ${computeTokenStyles};
        border-radius: var(--border-radius);
        padding: 0 var(--spacing-1x);

        &::before {
            content: '${({ $label }) => `${$label} : `}';
            font-weight: ${({ theme }) => theme.ref['font-weight-regular']};
            margin-right: var(--spacing-half);
        }

        &:hover {
            background-color: ${({ theme }) => theme.component['filter-button-hover-background-color']};
            border-color: ${({ theme }) => theme.component['filter-button-hover-border-color']};
            color: ${({ theme }) => theme.component['filter-button-hover-value-color']};

            &::before {
                color: ${({ theme }) => theme.component['filter-button-hover-label-color']};
            }
        }

        .${dropdownMenuButtonClasses.expandIcon} {
            color: ${({ theme }) => theme.component['filter-expand-icon-color']};
        }
    }
`;
