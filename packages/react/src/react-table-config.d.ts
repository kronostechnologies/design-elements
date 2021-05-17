/* eslint-disable @typescript-eslint/no-explicit-any */
import {
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
      Record<string, any> {}

  export type Hooks<D extends object = {}> = UseSortByHooks<D>

  export type TableInstance<D extends object = {}> = UseSortByInstanceProps<D>

  /* eslint-disable-next-line @typescript-eslint/no-empty-interface */
  export interface TableState<D extends object = {}>
    extends UseSortByState<D> {}

  export interface ColumnInterface<D extends object = {}>
    extends UseSortByColumnOptions<D>,
      Record<string, any> {}

  export type ColumnInstance<D extends object = {}> = UseSortByColumnProps<D>
}
