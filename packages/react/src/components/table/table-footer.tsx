import { CSSProperties, ReactElement } from 'react';
import styled, { css } from 'styled-components';
import {
    Header,
    HeaderGroup,
    ColumnDef,
    Column,
    flexRender,
} from '@tanstack/react-table';

type CustomColumnDef<TData extends object, TValue> = ColumnDef<TData, TValue> & {
    className?: string;
    textAlign?: CSSProperties['textAlign'];
    sticky?: boolean;
    footerColSpan?: number;
};

interface CustomFooter<TData extends object, TValue> extends Header<TData, TValue> {
    column: Column<TData, TValue> & {
        columnDef: CustomColumnDef<TData, TValue>;
    };
    footerColSpan?: number;
}

const StyledFooter = styled.td<{ sticky: boolean }>`
    background-color: inherit;
    font-weight: var(--font-semi-bold);
    position: relative;
    ${({ sticky }) => sticky && css`
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

const StyleFooterRow = styled.tr<{ stickyFooter: boolean }>`
    background-color: inherit;
    ${({ stickyFooter }) => stickyFooter && css`
        bottom: 0;
        position: sticky;
        z-index: 6;
    `}
`;

function getFooter<TData extends object, TValue>(
    footer: CustomFooter<TData, TValue>,
    stickyFooter: boolean,
): ReactElement | null {
    if (footer.column.columnDef.footerColSpan === 0) {
        // If the columns object has footerColSpan === 0, skip rendering the td
        return null;
    }
    return (
        <StyledFooter
            key={footer.id}
            colSpan={footer.column.columnDef.footerColSpan || footer.colSpan}
            sticky={stickyFooter}
        >
            {!footer.isPlaceholder && flexRender(
                footer.column.columnDef.footer,
                footer.getContext(),
            )}
        </StyledFooter>
    );
}

export interface FooterProps<T extends object> {
    footerGroup: HeaderGroup<T>;
    stickyFooter: boolean;
}

export const TableFooter = <T extends object>({
    footerGroup,
    stickyFooter,
}: FooterProps<T>): ReactElement => (
    <StyleFooterRow key={footerGroup.id} stickyFooter={stickyFooter}>
        {footerGroup.headers.map((footer) => getFooter(footer, stickyFooter))}
    </StyleFooterRow>
);
