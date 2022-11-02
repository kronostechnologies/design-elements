/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    UseRowSelectHooks,
    UseRowSelectInstanceProps,
    UseRowSelectOptions,
    UseRowSelectRowProps,
    UseRowSelectState,
    UseSortByColumnOptions,
    UseSortByColumnProps,
    UseSortByHooks,
    UseSortByInstanceProps,
    UseSortByOptions,
    UseSortByState,
} from 'react-table';

declare module 'react-table' {
    export interface TableOptions<D extends object>
        extends UseSortByOptions<D>,
            UseRowSelectOptions<D>,
            Record<string, any> {
    }

    export interface Hooks<D extends object = {}> extends UseSortByHooks<D>, UseRowSelectHooks<D> {
    }

    export interface TableInstance<D extends object = {}>
        extends UseSortByInstanceProps<D>,
            UseRowSelectInstanceProps<D> {
    }

    export interface TableState<D extends object = {}>
        extends UseSortByState<D>,
            UseRowSelectState<D> {
    }

    export interface ColumnInterface<D extends object = {}>
        extends UseSortByColumnOptions<D>,
            Record<string, any> {
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface ColumnInstance<D extends object = {}> extends UseSortByColumnProps<D> {
    }

    /* eslint-disable-next-line @typescript-eslint/no-empty-interface */
    export interface Row<D extends object = {}> extends UseRowSelectRowProps<D> {
    }
}
