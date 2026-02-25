import styled, { css, type FlattenInterpolation, type ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../../themes';
import { badgeClasses } from '../../badge';
import { DropdownMenuButton, dropdownMenuButtonClasses } from '../../dropdown-menu-button';

interface FilterDropdownButtonProps extends ThemeProps<ResolvedTheme> {
    $labelPrefix?: string;
    $hasFilters: boolean;
    $multiselect?: boolean;
}

function computeTokenStyles({
    $hasFilters,
    $multiselect,
    theme,
}: FilterDropdownButtonProps): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    const tokenKeyword = $hasFilters ? 'active-' : '';
    return css`
        background-color: ${theme.component[`filter-button-${tokenKeyword}background-color`]};
        border: 1px solid ${theme.component[`filter-button-${tokenKeyword}border-color`]};
        color: ${theme.component[`filter-button-${tokenKeyword}value-color`]};
        font-weight: ${$hasFilters && !$multiselect ? theme.ref['font-weight-semibold'] : theme.ref['font-weight-regular']};

        &::before {
            color: ${theme.component[`filter-button-${tokenKeyword}label-color`]};
        }
    `;
}

function displayLabelPrefixAsBeforePseudo(
    { $labelPrefix, $hasFilters }: FilterDropdownButtonProps,
): FlattenInterpolation<ThemeProps<ResolvedTheme>> | null {
    if ($labelPrefix && $hasFilters) {
        return css`
            &::before {
                content: '${$labelPrefix} : ';
                font-weight: ${({ theme }) => theme.ref['font-weight-regular']};
                margin-right: var(--spacing-half);
            }
        `;
    }
    return null;
}

export const DEFAULT_CONTENT_WIDTH_SINGLE = 180;
export const DEFAULT_CONTENT_WIDTH_MULTI = 200;
export const DEFAULT_CONTENT_WIDTH_LARGE = 260;

type DropdownFeatures = {
    async?: boolean;
    multi?: boolean
    search?: boolean;
}

export function getFallbackContentWidth({ async, multi, search }: DropdownFeatures): number {
    if (async || search) {
        return DEFAULT_CONTENT_WIDTH_LARGE;
    }
    if (multi) {
        return DEFAULT_CONTENT_WIDTH_MULTI;
    }
    return DEFAULT_CONTENT_WIDTH_SINGLE;
}

export const FilterDropdownButton = styled(DropdownMenuButton)
    .attrs<FilterDropdownButtonProps>(() => ({ align: 'left' }))`
    .${dropdownMenuButtonClasses.button} {
        ${computeTokenStyles};
        border-radius: var(--border-radius);
        padding: 0 var(--spacing-1x);

        ${({ $multiselect }) => $multiselect && css`
            .${badgeClasses.root} {
                margin-right: var(--spacing-1x);
                width: 0.75rem;
            }
        `}

        ${displayLabelPrefixAsBeforePseudo};

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
