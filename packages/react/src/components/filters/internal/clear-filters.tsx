import React, { type FC, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../../i18n/use-translation';
import { focus } from '../../../utils/css-state';
import { Icon } from '../../icon';

const ClearFiltersContainer = styled.div`
    align-items: center;
    border-radius: var(--border-radius);
    color: ${({ theme }) => theme.component['filter-clear-color']};
    column-gap: var(--spacing-1x);
    display: flex;
    line-height: 1rem;
    margin: 0 var(--spacing-1x);
    padding: var(--spacing-1x) var(--spacing-1x);

    &[aria-disabled='true'] {
        color: ${({ theme }) => theme.component['filter-clear-disabled-color']};
    }

    ${focus};
`;

export interface ClearFiltersProps {
    selectedFiltersCount: number;

    onClearFilters(): void;
}

export const ClearFilters: FC<ClearFiltersProps> = ({
    selectedFiltersCount,
    onClearFilters,
}) => {
    const { t } = useTranslation('filter');
    const hasSelectedFilters = selectedFiltersCount > 0;

    const handleClearFilterOnKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.code === 'Space' || event.code === 'Enter') {
            onClearFilters();
            event.preventDefault();
        }
    }, [onClearFilters]);

    return (
        <ClearFiltersContainer
            aria-disabled={!hasSelectedFilters}
            tabIndex={hasSelectedFilters ? 0 : -1}
            onKeyDown={handleClearFilterOnKeyDown}
            onClick={hasSelectedFilters ? onClearFilters : undefined}
            role="button"
        >
            <Icon name="x" size="16" />
            <span>{t('clearFilter', { count: selectedFiltersCount })}</span>
        </ClearFiltersContainer>
    );
};

ClearFilters.displayName = 'ClearFilters';
