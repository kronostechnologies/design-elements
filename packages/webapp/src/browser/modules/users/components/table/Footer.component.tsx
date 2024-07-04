import { Pagination } from '@equisoft/design-elements-react';
import { FunctionComponent, ReactElement, useCallback } from 'react';
import styled from 'styled-components';

const FooterPaginationWrapper = styled.nav`
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    display: flex;
    gap: 8px;
    justify-content: space-between;
`;

export interface TableFooterPaginationProps {
    currentPage: number,
    itemsPerPage: number,
    numberOfResults: number,
    updatePageData: (itemsPerPage: number, currentPage?: number) => void
}

export const Footer: FunctionComponent<TableFooterPaginationProps> = (
    {
        currentPage, itemsPerPage, numberOfResults, updatePageData,
    },
) => {
    const renderPagination = useCallback((): ReactElement => (
        <Pagination
            resultsPerPage={itemsPerPage}
            numberOfResults={numberOfResults}
            activePage={currentPage}
            onPageChange={(page) => updatePageData(page)}
            pagesShown={3}
        />
    ), [itemsPerPage, numberOfResults, currentPage, updatePageData]);

    return (
        <FooterPaginationWrapper aria-label="table's pagination">
            <div />
            {renderPagination()}
        </FooterPaginationWrapper>
    );
};
