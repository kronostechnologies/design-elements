import { ColumnDef } from '@tanstack/react-table';
import { CSSProperties } from 'react';

export type TableDataAsRowData<TData> = TData & {
    id?: number | string;
    error?: boolean;
    subRows?: TableDataAsRowData<TData>[];
    subContent?: React.ReactNode;
}

export type TableDataAsRowGroup<TData> = {
    groupLabel?: string;
    subRows?: TableDataAsRowData<TData>[];
}

export type TableData<TData> = TableDataAsRowData<TData> | TableDataAsRowGroup<TData>;

export type TableColumn<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
    className?: string;
    footerColSpan?: number;
    headerAriaLabel?: string;
    headerColSpan?: number;
    iconAlign?: 'left' | 'right';
    sortable?: boolean;
    sticky?: boolean;
    textAlign?: CSSProperties['textAlign'];
};
