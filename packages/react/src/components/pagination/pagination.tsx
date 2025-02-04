import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useId } from '../../hooks/use-id';
import { clamp } from '../../utils/math';
import { range } from '../../utils/range';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { calculateShownPageRange } from './util/pagination-util';
import { Navigation, PaginationButtonsWrapper, PaginationPageButtonsWrapper } from './styled';
import { PaginationNavButton } from './nav-button/pagination-nav-button';
import { PaginationPageButton } from './page-button/pagination-page-button';
import { PaginationContext } from './context';
import { PaginationLabel } from './label/pagination-label';

export interface PaginationProps {
    className?: string;
    /**
     * Number of results to display per page
     */
    resultsPerPage: number;
    /**
     * Displays the total number of results when provided
     */
    numberOfResults?: number;
    /**
     * Selected page
     * @default 1
     */
    defaultActivePage?: number;
    /**
     * Number of page shown
     * @default 3
     */
    pagesShown?: number;
    /**
     * The current active page of the pagination
     */
    activePage?: number;

    /**
     * Function callback when page is changed
     */
    onPageChange?(pageNumber: number): void;
}

export const Pagination: FC<PaginationProps> = ({
    className,
    resultsPerPage,
    numberOfResults,
    defaultActivePage = 1,
    pagesShown = 3,
    activePage,
    onPageChange = () => undefined,
}) => {
    const { isMobile } = useDeviceContext();
    const headingId = useId();
    const currentNumberOfResults = numberOfResults === undefined ? 0 : numberOfResults;
    const totalPages = currentNumberOfResults === 0 ? 0 : Math.ceil(currentNumberOfResults / resultsPerPage);
    const pagesDisplayed = Math.min(pagesShown, totalPages);
    const [currentPage, setCurrentPage] = useState(clamp(activePage || defaultActivePage, 1, totalPages));
    const { begin, end } = calculateShownPageRange(totalPages, pagesDisplayed, currentPage);

    useEffect(() => {
        if (activePage) {
            const clampedActivePage = clamp(activePage, 1, totalPages);
            if (currentPage !== clampedActivePage) {
                setCurrentPage(clampedActivePage);
            }
        }
    }, [activePage, currentPage, totalPages]);

    const changePage = useCallback((page: number): void => {
        setCurrentPage(page);
        onPageChange(page);
    }, [onPageChange]);

    const value = useMemo(() => ({
        resultsPerPage,
        numberOfResults: currentNumberOfResults,
        totalPages,
        pagesDisplayed,
        currentPage,
        changePage,
    }), [resultsPerPage, currentNumberOfResults, totalPages, pagesDisplayed, currentPage, changePage]);

    return (
        <PaginationContext.Provider value={value}>
            <Navigation
                className={`pagination-container ${className}`}
                $isMobile={isMobile}
                aria-labelledby={headingId}
            >
                <PaginationLabel id={headingId} />
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
            </Navigation>
        </PaginationContext.Provider>
    );
};
