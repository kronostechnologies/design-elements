import { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import {
    Header,
    HeaderGroup,
    Column,
    flexRender,
    RowData,
} from '@tanstack/react-table';
import { CustomColumnDef } from './types';

interface CustomFooter<TData extends RowData, TValue = unknown> extends Header<TData, TValue> {
    column: Column<TData, TValue> & {
        columnDef: CustomColumnDef<TData, TValue>;
    };
}

const StyledFooter = styled.td<{ $sticky: boolean }>`
    background-color: inherit;
    font-weight: var(--font-semi-bold);
    position: relative;
    ${({ $sticky }) => $sticky && css`
        position: sticky;
    `}
    &:before {
        border-bottom: 1px solid ${({ theme }) => theme.greys.grey};
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
    footer: CustomFooter<TData, TValue>,
    sticky: boolean,
): ReactElement | null {
    if (footer.column.columnDef.footerColSpan === 0) {
        // If the columns object has footerColSpan === 0, skip rendering the td
        return null;
    }
    return (
        <StyledFooter
            key={footer.id}
            colSpan={footer.column.columnDef.footerColSpan ?? footer.colSpan}
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
    <StyleFooterRow key={footerGroup.id} $sticky={sticky}>
        {footerGroup.headers.map((footer) => getFooter(footer as CustomFooter<T>, sticky))}
    </StyleFooterRow>
);
