import type { Cell, Column, ColumnDef, Header } from '@tanstack/react-table';
import type { CSSProperties, ReactNode } from 'react';

export type TableData<TData> = TData & {
    error?: boolean;
    subRows?: TableData<TData>[];
    subContent?: ReactNode;
}

export type TableColumn<TData> = ColumnDef<TData> & {
    className?: string;
    footerColSpan?: number;
    headerAriaLabel?: string;
    headerColSpan?: number;
    iconAlign?: 'left' | 'right';
    sortable?: boolean;
    sticky?: boolean;
    textAlign?: CSSProperties['textAlign'];
};

export interface CustomHeader<TData extends object, TValue = unknown> extends Header<TData, TValue> {
    column: Column<TData, TValue> & {
        columnDef: TableColumn<TData>;
    };
}

export interface CustomCell<TData extends object, TValue = unknown> extends Cell<TData, TValue> {
    column: Column<TData, TValue> & {
        columnDef: TableColumn<TData>;
    };
}
