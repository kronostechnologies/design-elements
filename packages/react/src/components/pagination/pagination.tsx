import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { IconButton } from '@design-elements/components/buttons/icon-button';
import { useDeviceContext } from '@design-elements/components/device-context-provider/device-context-provider';
import { IconName } from '@design-elements/components/icon/icon';
import { clamp } from '@design-elements/utils/math';
import { range } from '@design-elements/utils/range';
import { calculateShownPageRange } from './util/pagination-util';

const Pages = styled.ol`
    display: flex;
    margin: 0 var(--spacing-half);
    padding: 0;
`;

const Page = styled.li<{ isSelected: boolean, isMobile: boolean }>`
    background-color: ${props => props.isSelected ? props.theme.main['primary-1.1'] : props.theme.greys.white};
    border-radius: 100%;
    color: ${props => props.isSelected ? props.theme.greys.white : props.theme.greys.black};
    display: inline-block;
    font-size: ${props => props.isMobile ? 1 : 0.9}rem;
    font-weight: var(--font-normal);
    height: ${props => props.isMobile ? 32 : 24}px;
    line-height: ${props => props.isMobile ? 32 : 24}px;
    margin: 0 var(--spacing-half);
    text-align: center;
    width: ${props => props.isMobile ? 32 : 24}px;

    &:hover {
        background-color: ${props => props.isSelected ? props.theme.main['primary-1.1'] : props.theme.greys.grey};
        cursor: ${props => props.isSelected ? 'default' : 'pointer'};
    }

    &:focus {
        box-shadow: ${({ theme }) => theme.tokens['focus-box-shadow']};
        outline: none;
    }
`;

interface NavButtonProps {
    iconName: IconName;
    label: string;
    enabled: boolean;
    onClick(): void;
}

const NavButton = (props: NavButtonProps) => {
    return (
        <IconButton
            {...props}
            type="button"
            buttonType="tertiary"
            aria-disabled={!props.enabled}
            disabled={!props.enabled}
            tab-index={props.enabled ? 0 : -1}
        />
    );
};

const Container = styled.div<{ isMobile: boolean }>`
    align-items: center;
    display: flex;
    flex-direction: ${props => props.isMobile ? 'column' : 'row' };
`;

const ResultsLabel = styled.div<{ isMobile: boolean }>`
    font-size: ${props => props.isMobile ? 1 : 0.9}rem;
    line-height: ${props => props.isMobile ? 32 : 24}px;
    margin-bottom: ${props => props.isMobile ? '12px' : 0};
    margin-right: ${props => props.isMobile ? 0 : '24px'};
    white-space: nowrap;
`;

const Navigation = styled.nav`
    align-items: center;
    display: flex;
`;

interface PaginationProps {
    /**
     * Total number of pages
     * @default desktop
     */
    totalPages: number;
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
     * Function callback when page is changed
     */
    onPageChange?(pageNumber: number): void;
}

export function Pagination({
   totalPages,
   numberOfResults,
   defaultActivePage = 1,
   pagesShown = 3,
   onPageChange = () => undefined,
}: PaginationProps): ReactElement {
    const { t } = useTranslation('pagination');
    const { isMobile } = useDeviceContext();
    const pagesDisplayed = Math.min(pagesShown, totalPages);
    const [currentPage, setCurrentPage] = useState(clamp(defaultActivePage, 1, totalPages));
    const canNavigatePrevious = currentPage > 1;
    const canNavigateNext = currentPage < totalPages;
    const firstLastNavActive = totalPages > 5;
    const forwardBackwardNavActive = totalPages > 3 || pagesDisplayed < totalPages;

    const changePage = (page: number) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    const handlePageKeyDown = (key: string, page: number) => {
        if (key === 'Enter') {
            changePage(page);
        }
    };

    const { begin, end } = calculateShownPageRange(totalPages, pagesDisplayed, currentPage);
    const pages = range(begin, end).map(i => {
        const id = 'page-' + i;
        const isCurrentPage = i === currentPage;
        return (
            <Page
                key={id}
                data-testid={id}
                isSelected={isCurrentPage}
                onClick={isCurrentPage ? undefined : () => changePage(i)}
                onKeyPress={event => handlePageKeyDown(event.key, i)}
                isMobile={isMobile}
                tabIndex={0}
            ><a aria-label={`go to page ${i}`} aria-current={isCurrentPage ? 'page' : undefined}>{i}</a>
            </Page>
        );
    });

    return (
        <Container isMobile={isMobile}>
            {numberOfResults !== undefined && (
                <ResultsLabel isMobile={isMobile} data-testid="resultsLabel">
                    {numberOfResults} {t('results')}
                </ResultsLabel>
            )}
            <Navigation aria-label="pagination">
                {firstLastNavActive && <NavButton
                    data-testid="firstPageButton"
                    iconName="chevronsLeft"
                    label="first page"
                    enabled={canNavigatePrevious}
                    onClick={() => changePage(1)}
                />}
                {forwardBackwardNavActive && <NavButton
                    data-testid="previousPageButton"
                    iconName="chevronLeft"
                    label="previous page"
                    enabled={canNavigatePrevious}
                    onClick={() => changePage(currentPage - 1)}
                />}
                <Pages>{pages}</Pages>
                {forwardBackwardNavActive && <NavButton
                    data-testid="nextPageButton"
                    iconName="chevronRight"
                    label="next page"
                    enabled={canNavigateNext}
                    onClick={() => changePage(currentPage + 1)}
                />}
                {firstLastNavActive && <NavButton
                    data-testid="lastPageButton"
                    iconName="chevronsRight"
                    label="last page"
                    enabled={canNavigateNext}
                    onClick={() => changePage(totalPages)}
                />}
            </Navigation>
        </Container>
    );
}
