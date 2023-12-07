import { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import {
    Header,
    HeaderGroup,
    ColumnDef as OriginalColumnDef,
    Column,
    flexRender,
} from '@tanstack/react-table';

type TextAlignOptions = 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';

type CustomColumnDef<TData extends object, TValue> = OriginalColumnDef<TData, TValue> & {
    className?: string;
    textAlign?: TextAlignOptions; // Define this type if not already defined
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
    background-color: ${({ theme }) => theme.greys.white};
    ${({ sticky }) => sticky && css`
        position: sticky;
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
            {footer.isPlaceholder
                ? null
                : flexRender(
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
}:FooterProps<T>): ReactElement => { // eslint-disable-line arrow-body-style
    return (
        <tr key={footerGroup.id}>
            {footerGroup.headers.map((footer) => getFooter(footer, stickyFooter))}
        </tr>
    );
};
