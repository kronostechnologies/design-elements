import { VoidFunctionComponent } from 'react';
import { StyledIconButton } from './styled';
import { usePaginationContext } from '../context';

export type NavigationAction = 'previous' | 'next';

export interface PaginationNavButtonProps {
    action: NavigationAction;
}

export const PaginationNavButton: VoidFunctionComponent<PaginationNavButtonProps> = (
    { action },
) => {
    const {
        totalPages,
        pagesDisplayed,
        currentPage,
        changePage,
    } = usePaginationContext();
    const showNavButtons = totalPages > 3 || pagesDisplayed < totalPages;

    if (!showNavButtons) return null;

    const isPrevious = action === 'previous';
    const isDisabled = isPrevious ? currentPage <= 1 : currentPage >= totalPages;
    const onClick = (): void => changePage(currentPage + (isPrevious ? -1 : 1));
    const iconName = isPrevious ? 'chevronLeft' : 'chevronRight';
    const label = isPrevious ? 'previous page' : 'next page';
    const dataTestId = isPrevious ? 'previousPageButton' : 'nextPageButton';

    return (
        <StyledIconButton
            data-testid={dataTestId}
            iconName={iconName}
            label={label}
            type="button"
            buttonType="tertiary"
            isVisible={!isDisabled}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            tab-index={isDisabled ? -1 : 0}
            onClick={onClick}
        />
    );
};
