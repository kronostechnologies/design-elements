import { IconButton } from '@design-elements/components/buttons/icon-button';
import {
    DeviceContextProps,
    useDeviceContext,
} from '@design-elements/components/device-context-provider/device-context-provider';
import { IconName } from '@design-elements/components/icon/icon';
import { clamp } from '@design-elements/utils/math';
import { calculateShownPageRange } from '@design-elements/utils/range';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

const Pages = styled.ol`
    margin: 0 4px;
    padding: 0;
`;

const Page = styled.li<{ isSelected: boolean, deviceContext: DeviceContextProps }>`
    background-color: ${props => props.isSelected ? props.theme.main['primary-1.1'] : props.theme.greys.white};
    border-radius: 100%;
    color: ${props => props.isSelected ? props.theme.greys.white : props.theme.greys.black};
    display: inline-block;
    font-size: ${props => props.deviceContext.isMobile ? 1 : 0.9}rem;
    font-weight: ${props => props.isSelected ? '600' : '400'};
    line-height: ${props => props.deviceContext.isMobile ? 32 : 24}px;
    margin: 0 4px;
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

const StyledNavButton = styled(IconButton)<NavButtonProps>`
    margin: ${props => props.deviceType.isMobile ? '-8px 0' : '-4px 0'};
`;

const NavButton = (props: NavButtonProps) => {
    return (
        <StyledNavButton
            {...props}
            type="button"
            buttonType="tertiary"
            disabled={!props.enabled}
        />
    );
};

const Container = styled.div`
    align-items: center;
    display: flexbox;
`;

const ResultsLabel = styled.div<{ deviceContext: DeviceContextProps }>`
    font-size: ${props => props.deviceContext.isMobile ? 1 : 0.9}rem;
    line-height: ${props => props.deviceContext.isMobile ? 32 : 24}px;
    margin-right: 16px;
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

export function Pagination(
    { totalPages, numberOfResults, defaultActivePage, pagesShown, lang, onPageChange }: PaginationProps): ReactElement {
    const deviceContext = useDeviceContext();
    const concretePagesShown = Math.min(pagesShown ? pagesShown : 3, totalPages);
    const pageChangeCallback = onPageChange ? onPageChange : () => undefined;
    const [currentPage, setCurrentPage] = useState(defaultActivePage ? clamp(defaultActivePage, 1, totalPages) : 1);
    const canNavigatePrevious = currentPage > 1;
    const canNavigateNext = currentPage < totalPages;
    const firstLastNavActive = totalPages > 10;
    const forwardBackwardNavActive = totalPages > 3 || concretePagesShown < totalPages;

    const changePage = (page: number) => {
        setCurrentPage(page);
        pageChangeCallback(page);
    };

    const range = calculateShownPageRange(totalPages, concretePagesShown, currentPage);
    const pages = [];
    for (let i = range.begin; i <= range.end; i++) {
        const id = 'page-' + i;
        pages.push(
            <Page
                key={id}
                data-testid={id}
                isSelected={i === currentPage}
                onClick={() => changePage(i)}
                deviceContext={deviceContext}
                tabIndex={0}
            >{i}
            </Page>);
    }

    return (
        <Container>
            {numberOfResults !== undefined && <ResultsLabel deviceContext={deviceContext} data-testid="resultsLabel">
                {numberOfResults} {lang === 'fr' ? 'résultats' : 'results'/* TODO refactor with i18n support */}
            </ResultsLabel>}
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
        </Container>
    );
}
