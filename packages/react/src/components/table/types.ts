import { ColumnDef, RowData } from '@tanstack/react-table';
import { CSSProperties } from 'react';

export type TableData<TData extends object> = TData & {
    error?: boolean;
    subRows?: TableData<TData>[];
    subContent?: React.ReactNode;
};

export type TableColumn<TData extends RowData, TValue = unknown> = ColumnDef<TData, TValue> & {
    className?: string;
    footerColSpan?: number;
    headerAriaLabel?: string;
    headerColSpan?: number;
    iconAlign?: 'left' | 'right';
    sortable?: boolean;
    sticky?: boolean;
    textAlign?: CSSProperties['textAlign'];
};
