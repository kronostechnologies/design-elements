import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useId } from '../../hooks/use-id';
import { clamp } from '../../utils/math';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Navigation } from './styled';
import { PaginationContext } from './context';
import { PaginationLabel } from './label/pagination-label';
import { PaginationButtons } from './buttons/pagination-buttons';

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
    const pagesDisplayed = Math.min(Math.max(pagesShown, 1), totalPages);
    const [currentPage, setCurrentPage] = useState(clamp(activePage || defaultActivePage, 1, totalPages));

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
                <PaginationButtons />
            </Navigation>
        </PaginationContext.Provider>
    );
};
