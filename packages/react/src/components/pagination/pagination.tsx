import { IconButton } from '@design-elements/components/buttons/icon-button';
import {
    DeviceContextProps,
    useDeviceContext,
} from '@design-elements/components/device-context-provider/device-context-provider';
import { IconName } from '@design-elements/components/icon/icon';
import { clamp } from '@design-elements/utils/math';
import { calculateShownPageRange, range } from '@design-elements/utils/range';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

const Pages = styled.ol`
    display: flex;
    margin: 0 4px;
    padding: 0;
`;

const Page = styled.li<{ isSelected: boolean, deviceContext: DeviceContextProps }>`
    background-color: ${props => props.isSelected ? props.theme.main['primary-1.1'] : props.theme.greys.white};
    border-radius: 100%;
    color: ${props => props.isSelected ? props.theme.greys.white : props.theme.greys.black};
    display: inline-block;
    font-size: ${props => props.deviceContext.isMobile ? 1 : 0.9}rem;
    font-weight: var(--font-normal);
    height: ${props => props.deviceContext.isMobile ? 32 : 24}px;
    line-height: ${props => props.deviceContext.isMobile ? 32 : 24}px;
    margin: 0 var(--spacing-half);
    text-align: center;
    width: ${props => props.deviceContext.isMobile ? 32 : 24}px;

    &:hover {
        background-color: ${props => props.isSelected ? props.theme.main['primary-1.1'] : props.theme.greys.grey};
        cursor: ${props => props.isSelected ? 'default' : 'pointer'};
    }

    &:focus {
        box-shadow: 0 0 0 1px ${props => props.theme.main['primary-1.1']}, 0 0 0 3px ${props => props.theme.main['primary-1.2']};
        outline: none;
    }
`;

interface NavButtonProps {
    deviceType: DeviceContextProps;
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
            disabled={!props.enabled}
        />
    );
};

const Container = styled.div<{ deviceContext: DeviceContextProps }>`
    align-items: center;
    display: flex;
    flex-direction: ${props => props.deviceContext.isMobile ? 'column' : 'row' };
`;

const ResultsLabel = styled.div<{ deviceContext: DeviceContextProps }>`
    font-size: ${props => props.deviceContext.isMobile ? 1 : 0.9}rem;
    line-height: ${props => props.deviceContext.isMobile ? 32 : 24}px;
    margin-bottom: ${props => props.deviceContext.isMobile ? '12px' : 0};
    margin-right: ${props => props.deviceContext.isMobile ? 0 : '24px'};
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
     * Language
     * @default en
     */
    lang?: 'en' | 'fr';

    /**
     * Function callback when page is changed
     */
    onPageChange?(pageNumber: number): void;
}

export function Pagination({ totalPages,
                               numberOfResults,
                               defaultActivePage = 1,
                               pagesShown = 3,
                               lang= 'en',
                               onPageChange }: PaginationProps): ReactElement {
    const deviceContext = useDeviceContext();
    const pagesDisplayed = Math.min(pagesShown, totalPages);
    const pageChangeCallback = onPageChange ? onPageChange : () => undefined;
    const [currentPage, setCurrentPage] = useState(clamp(defaultActivePage, 1, totalPages));
    const canNavigatePrevious = currentPage > 1;
    const canNavigateNext = currentPage < totalPages;
    const firstLastNavActive = totalPages > 10;
    const forwardBackwardNavActive = totalPages > 3 || pagesDisplayed < totalPages;

    const changePage = (page: number) => {
        setCurrentPage(page);
        pageChangeCallback(page);
    };

    const handlePageKeyDown = (key: string, page: number) => {
        if (key === 'Enter') {
            changePage(page);
        }
    };

    const { begin, end } = calculateShownPageRange(totalPages, pagesDisplayed, currentPage);
    const pages = range(begin, end).map(i => {
        const id = 'page-' + i;
        return (
            <Page
                key={id}
                data-testid={id}
                isSelected={i === currentPage}
                onClick={() => changePage(i)}
                onKeyPress={(event) => handlePageKeyDown(event.key, i)}
                deviceContext={deviceContext}
                tabIndex={0}
            ><a aria-label={`go to page ${i}`}>{i}</a>
            </Page>
        );
    });

    return (
        <Container deviceContext={deviceContext}>
            {numberOfResults !== undefined && <ResultsLabel deviceContext={deviceContext} data-testid="resultsLabel">
                {numberOfResults} {lang === 'fr' ? 'résultats' : 'results'/* TODO refactor with i18n support */}
            </ResultsLabel>}
            <Navigation aria-label="pagination">
                {firstLastNavActive && <NavButton
                    deviceType={deviceContext}
                    data-testid="firstPageButton"
                    iconName="chevronsLeft"
                    label="first page"
                    enabled={canNavigatePrevious}
                    onClick={() => changePage(1)}
                />}
                {forwardBackwardNavActive && <NavButton
                    deviceType={deviceContext}
                    data-testid="previousPageButton"
                    iconName="chevronLeft"
                    label="previous page"
                    enabled={canNavigatePrevious}
                    onClick={() => changePage(+currentPage - 1)}
                />}
                <Pages>{pages}</Pages>
                {forwardBackwardNavActive && <NavButton
                    deviceType={deviceContext}
                    data-testid="nextPageButton"
                    iconName="chevronRight"
                    label="next page"
                    enabled={canNavigateNext}
                    onClick={() => changePage(+currentPage + 1)}
                />}
                {firstLastNavActive && <NavButton
                    deviceType={deviceContext}
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
