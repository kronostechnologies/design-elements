import { ColumnDef, RowData } from '@tanstack/react-table';
import { CSSProperties } from 'react';

export type CustomColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<TData, TValue> & {
    className?: string;
    footerColSpan?: number;
    headerColSpan?: number;
    iconAlign?: 'left' | 'right';
    sticky?: boolean;
    sortable?: boolean;
    textAlign?: CSSProperties['textAlign'];
};
