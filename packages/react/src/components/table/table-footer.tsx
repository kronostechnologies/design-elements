import { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { CustomHeader } from './types';

const StyledFooter = styled.td<{ $sticky: boolean }>`
    background-color: inherit;
    font-weight: var(--font-semi-bold);
    position: relative;

    ${({ $sticky }) => $sticky && css`
        position: sticky;
    `}

    &:before {
        border-bottom: 1px solid ${({ theme }) => theme.component['table-footer-border-color']};
        content: '';
        height: 1px;
        position: absolute;
        right: 0;
        top: 1px;
        width: 100%;
    }
`;

const StyleFooterRow = styled.tr<{ $sticky: boolean }>`
    background-color: inherit;

    ${({ $sticky }) => $sticky && css`
        bottom: 0;
        position: sticky;
        z-index: 6;
    `}
`;

function getFooter<TData extends object, TValue>(
    footer: CustomHeader<TData, TValue>,
    sticky: boolean,
): ReactElement | null {
    const columnDef = footer.column.columnDef;

    if (columnDef.footerColSpan === 0) {
        // If the columns object has footerColSpan === 0, skip rendering the td
        return null;
    }

    return (
        <StyledFooter
            key={footer.id}
            colSpan={columnDef.footerColSpan ?? footer.colSpan}
            $sticky={sticky}
        >
            {!footer.isPlaceholder && flexRender(
                footer.column.columnDef.footer,
                footer.getContext(),
            )}
        </StyledFooter>
    );
}

interface TableFooterProps<T extends object> {
    footerGroup: HeaderGroup<T>;
    sticky: boolean;
}

export const TableFooter = <T extends object>({
    footerGroup,
    sticky,
}: TableFooterProps<T>): ReactElement => (
    <StyleFooterRow $sticky={sticky}>
        {footerGroup.headers.map((footer) => getFooter(footer, sticky))}
    </StyleFooterRow>
);

TableFooter.displayName = 'TableFooter';
