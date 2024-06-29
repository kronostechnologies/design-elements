import { DropdownList, Pagination } from '@equisoft/design-elements-react';
import { FunctionComponent, ReactElement, useCallback } from 'react';
import styled from 'styled-components';

const FooterPaginationContainer = styled.div`
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
    align-self: stretch;
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
    const itemsPerPageFooter = useCallback((): ReactElement => (
        <DropdownList
            noMargin
            id="items_per_page_dropdown"
            options={[5, 10, 15, 20].map((value) => (
                {
                    value: value.toString(),
                    label: value.toString(),
                }
            ))}
            defaultValue={itemsPerPage.toString()}
            onChange={(option) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const { value } = option;
                updatePageData(1, parseInt(value, 10));
            }}
        />
    ), [itemsPerPage, updatePageData]);

    const paginationFooter = useCallback((): ReactElement => (
        <Pagination
            resultsPerPage={itemsPerPage}
            numberOfResults={numberOfResults}
            activePage={currentPage}
            onPageChange={(page) => updatePageData(page)}
            pagesShown={3}
        />
    ), [itemsPerPage, numberOfResults, currentPage, updatePageData]);

    return (
        <FooterPaginationContainer>
            {itemsPerPageFooter()}
            {paginationFooter()}
        </FooterPaginationContainer>
    );
};
