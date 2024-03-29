import { ColumnDef, RowData } from '@tanstack/react-table';
import { CSSProperties } from 'react';

export type CustomColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<TData, TValue> & {
    className?: string;
    footerColSpan?: number;
    headerAriaLabel?: string;
    headerColSpan?: number;
    iconAlign?: 'left' | 'right';
    sortable?: boolean;
    sticky?: boolean;
    textAlign?: CSSProperties['textAlign'];
};
