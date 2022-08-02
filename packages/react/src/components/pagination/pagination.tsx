import { useEffect, useState, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { focus } from '../../utils/css-state';
import { clamp } from '../../utils/math';
import { range } from '../../utils/range';
import { IconButton } from '../buttons/icon-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { IconName } from '../icon/icon';
import { calculateShownPageRange } from './util/pagination-util';

const Pages = styled.ol`
    display: flex;
    margin: 0 var(--spacing-half);
    padding: 0;
`;

const Page = styled.li<{ isSelected: boolean, isMobile: boolean }>`
    align-items: center;
    background-color: ${(props) => (props.isSelected ? props.theme.main['primary-1.1'] : props.theme.greys.white)};
    border-radius: 16px;
    box-sizing: border-box;
    color: ${(props) => (props.isSelected ? props.theme.greys.white : props.theme.greys.black)};
    display: inline-flex;
    font-size: ${(props) => (props.isMobile ? 1 : 0.9)}rem;
    font-weight: var(--font-normal);
    height: ${(props) => (props.isMobile ? 32 : 24)}px;
    justify-content: center;
    line-height: ${(props) => (props.isMobile ? 32 : 24)}px;
    margin: 0 var(--spacing-half);
    min-width: ${(props) => (props.isMobile ? 32 : 24)}px;
    padding: 0 var(--spacing-1x);
    text-align: center;

    ${focus};

    &:hover {
        background-color: ${(props) => (props.isSelected ? props.theme.main['primary-1.1'] : props.theme.greys.grey)};
        cursor: ${(props) => (props.isSelected ? 'default' : 'pointer')};
    }
`;

interface NavButtonProps {
    iconName: IconName;
    label: string;
    enabled: boolean;

    onClick(): void;
}

const NavButton: VoidFunctionComponent<NavButtonProps> = ({
    enabled,
    iconName,
    label,
    ...props
}) => (
    <IconButton
        {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        iconName={iconName}
        label={label}
        type="button"
        buttonType="tertiary"
        aria-disabled={!enabled}
        disabled={!enabled}
        tab-index={enabled ? 0 : -1}
    />
);

const Container = styled.div<{ isMobile: boolean }>`
    align-items: center;
    display: flex;
    flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
`;

const ResultsLabel = styled.div<{ isMobile: boolean }>`
    font-size: ${(props) => (props.isMobile ? 1 : 0.9)}rem;
    line-height: ${(props) => (props.isMobile ? 32 : 24)}px;
    margin-bottom: ${(props) => (props.isMobile ? '12px' : 0)};
    margin-right: ${(props) => (props.isMobile ? 0 : '24px')};
    white-space: nowrap;
`;

const Navigation = styled.nav`
    align-items: center;
    display: flex;
`;

interface PaginationProps {
    className?: string;
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

    /**
     * The current active page of the pagination
     */
    activePage?: number;
}

export const Pagination: VoidFunctionComponent<PaginationProps> = ({
    className,
    totalPages,
    numberOfResults,
    defaultActivePage = 1,
    pagesShown = 3,
    onPageChange = () => undefined,
    activePage,
}) => {
    const { t } = useTranslation('pagination');
    const { isMobile } = useDeviceContext();
    const pagesDisplayed = Math.min(pagesShown, totalPages);
    const [currentPage, setCurrentPage] = useState(clamp(activePage || defaultActivePage, 1, totalPages));
    const canNavigatePrevious = currentPage > 1;
    const canNavigateNext = currentPage < totalPages;
    const firstLastNavActive = totalPages > 5;
    const forwardBackwardNavActive = totalPages > 3 || pagesDisplayed < totalPages;

    useEffect(() => {
        if (activePage && currentPage !== activePage) {
            setCurrentPage(activePage);
        }
    }, [activePage, currentPage]);

    function changePage(page: number): void {
        setCurrentPage(page);
        onPageChange(page);
    }

    function handlePageKeyDown(key: string, page: number): void {
        if (key === 'Enter') {
            changePage(page);
        }
    }

    const { begin, end } = calculateShownPageRange(totalPages, pagesDisplayed, currentPage);
    const pages = range(begin, end).map((i) => {
        const id = `page-${i}`;
        const isCurrentPage = i === currentPage;

        return (
            <Page
                key={id}
                data-testid={id}
                isSelected={isCurrentPage}
                onClick={isCurrentPage ? undefined : () => changePage(i)}
                onKeyPress={(event) => handlePageKeyDown(event.key, i)}
                isMobile={isMobile}
                tabIndex={0}
            >
                <a aria-label={`go to page ${i}`} aria-current={isCurrentPage ? 'page' : undefined}>{i}</a>
            </Page>
        );
    });

    return (
        <Container className={className} isMobile={isMobile}>
            {numberOfResults !== undefined && (
                <ResultsLabel isMobile={isMobile} data-testid="resultsLabel">
                    {numberOfResults}
                    {' '}
                    {t('results')}
                </ResultsLabel>
            )}
            <Navigation aria-label="pagination">
                {firstLastNavActive && (
                    <NavButton
                        data-testid="firstPageButton"
                        iconName="chevronsLeft"
                        label="first page"
                        enabled={canNavigatePrevious}
                        onClick={() => changePage(1)}
                    />
                )}
                {forwardBackwardNavActive && (
                    <NavButton
                        data-testid="previousPageButton"
                        iconName="chevronLeft"
                        label="previous page"
                        enabled={canNavigatePrevious}
                        onClick={() => changePage(currentPage - 1)}
                    />
                )}
                <Pages>{pages}</Pages>
                {forwardBackwardNavActive && (
                    <NavButton
                        data-testid="nextPageButton"
                        iconName="chevronRight"
                        label="next page"
                        enabled={canNavigateNext}
                        onClick={() => changePage(currentPage + 1)}
                    />
                )}
                {firstLastNavActive && (
                    <NavButton
                        data-testid="lastPageButton"
                        iconName="chevronsRight"
                        label="last page"
                        enabled={canNavigateNext}
                        onClick={() => changePage(totalPages)}
                    />
                )}
            </Navigation>
        </Container>
    );
};
