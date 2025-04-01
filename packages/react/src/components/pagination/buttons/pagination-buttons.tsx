import { FC } from 'react';
import { useDeviceContext } from '../../device-context-provider/device-context-provider';
import { usePaginationContext } from '../context';
import { range } from '../../../utils/range';
import { calculateShownPageRange } from '../util/pagination-util';
import { PaginationPageButton } from './page-button/pagination-page-button';
import { PaginationNavButton } from './nav-button/pagination-nav-button';
import { PaginationButtonsWrapper, PaginationPageButtonsWrapper } from './styled';

export const PaginationButtons: FC = () => {
    const { isMobile } = useDeviceContext();
    const { currentPage, totalPages, pagesDisplayed } = usePaginationContext();
    const { begin, end } = calculateShownPageRange(totalPages, pagesDisplayed, currentPage);

    if (totalPages <= 1) {
        return null;
    }

    return (
        <PaginationButtonsWrapper
            className="pagination-buttons-wrapper"
            $isMobile={isMobile}
        >
            <PaginationNavButton action="previous" />
            <PaginationPageButtonsWrapper
                className="pagination-page-buttons-wrapper"
                $isMobile={isMobile}
            >
                {range(begin, end).map((i) => (
                    <PaginationPageButton key={i} index={i} />
                ))}
            </PaginationPageButtonsWrapper>
            <PaginationNavButton action="next" />
        </PaginationButtonsWrapper>

    );
};
