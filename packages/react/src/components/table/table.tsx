import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import {
    CellProps,
    Column, ColumnInstance, HeaderGroup, HeaderProps,
    Hooks,
    Row,
    TableState,
    useRowSelect,
    UseRowSelectRowProps,
    useSortBy,
    UseSortByColumnOptions,
    useTable,
} from 'react-table';
import styled, { css } from 'styled-components';
import { Theme } from '../../themes';
import { Checkbox } from '../checkbox/checkbox';
import { DeviceType, useDeviceContext } from '../device-context-provider/device-context-provider';
import { SortableColumnHeading } from './sortable-column-heading';
import { TableRow } from './table-row';
import { calculateStickyPosition } from './utils/table-utils';

type RowSize = 'small' | 'medium';

type ColumnSort = 'asc' | 'desc';

interface StyledTableProps {
    clickableRows: boolean;
    device: DeviceType;
    striped: boolean;
    theme: Theme;
    rowSize?: RowSize;
}

type CustomColumn<T extends object> = Column<T> & UseSortByColumnOptions<T> & {
    defaultSort?: ColumnSort;
    sortable?: boolean,
    textAlign?: string,
    className?: string,
    sticky?: boolean,
    footerColSpan?: number,
};

export type TableColumn<T extends object> = CustomColumn<T>[];
export type TableRow<T> = T & { error?: boolean };

interface CustomRowProps {
    error?: boolean;
}

const utilColumnClassName = 'eq-table__util-column';

const StyledHeader = styled.th<{ sticky: boolean }>`
    background-color: inherit;

    position: relative;
    ${({ sticky }) => sticky && css`
        position: sticky;
    `}

    &:before {
        border-bottom: 1px solid ${({ theme }) => theme.greys.grey};
        bottom: 0;
        content: '';
        position: absolute;
        right: 0;
        width: 100%;
    }
`;

function getHeading<T extends object>(column: HeaderGroup<T>, stickyHeader: boolean): ReactElement {
    if (column.sortable) {
        return <SortableColumnHeading<T> key={column.id} header={column} />;
    }
    return (
        <StyledHeader
            className={column.className}
            scope="col"
            style={{ textAlign: column.textAlign }}
            sticky={stickyHeader}
            {...column.getHeaderProps() /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {column.render('Header')}
        </StyledHeader>
    );
}

const StyledFooter = styled.td<{ sticky: boolean }>`
    background-color: inherit;
    font-weight: var(--font-semi-bold);
    position: relative;
    ${({ sticky }) => sticky && css`
        position: sticky;
    `}

    &:before {
        background-color: rgba(0, 0, 0, 0.05);
        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.05), 0px -2px 6px 0px rgba(0, 0, 0, 0.05);
        content: '';
        height: 1px;
        position: absolute;
        right: 0;
        top: 1px;
        width: 100%;
    }
`;

function getFooter<T extends object>(column: HeaderGroup<T>, sticky: boolean): ReactElement | null {
    if (column.footerColSpan === 0) {
        // If the Footer content is empty, skip rendering the td
        return null;
    }
    const footerProps = column.footerColSpan
        ? { ...column.getFooterProps(), colSpan: column.footerColSpan }
        : column.getFooterProps();

    return (
        <StyledFooter
            className={column.className}
            style={{ textAlign: column.textAlign }}
            sticky={sticky}
            {...footerProps /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {column.render('Footer')}
        </StyledFooter>
    );
}

function getThPadding(device: DeviceType, rowSize?: RowSize): string {
    if (rowSize === 'small') {
        switch (device) {
            case 'desktop':
            case 'tablet':
                return 'var(--spacing-half) var(--spacing-1x)';
            case 'mobile':
                return 'var(--spacing-1x)';
        }
    }
    switch (device) {
        case 'desktop':
            return 'var(--spacing-1x) var(--spacing-2x)';
        case 'tablet':
            return 'var(--spacing-2x) var(--spacing-1x)';
        case 'mobile':
            return 'var(--spacing-2x) 0';
    }
}

function getTdPadding(device: DeviceType, rowSize?: RowSize): string {
    if (rowSize === 'small') {
        switch (device) {
            case 'desktop':
            case 'tablet':
                return 'var(--spacing-1x)';
            case 'mobile':
                return 'var(--spacing-2x) var(--spacing-1x)';
        }
    }
    switch (device) {
        case 'desktop':
            return 'var(--spacing-2x)';
        case 'tablet':
            return 'var(--spacing-3x) var(--spacing-1x)';
        case 'mobile':
            return 'var(--spacing-3x) 0';
    }
}

function getRenderedColumns<T extends object>(rowNumbers: boolean, columns: TableColumn<T>): TableColumn<T> {
    if (rowNumbers) {
        // Cast because we don't really need the accessor here
        const accessor = utilColumnClassName as unknown as keyof T;
        return [
            {
                Header: '',
                accessor,
                className: utilColumnClassName,
                Cell: ({ viewIndex }: CellProps<T, unknown>) => (viewIndex + 1),
            },
            ...columns,
        ];
    }
    return columns;
}

const StyledTable = styled.table<StyledTableProps>`
    background: ${({ theme }) => theme.greys.white};;
    border-collapse: collapse;
    color: ${({ theme }) => theme.greys['neutral-90']};
    width: 100%;

    th {
        font-weight: var(--font-semi-bold);
        padding: ${({ device, rowSize }) => getThPadding(device, rowSize)};
    }

    td {
        padding: ${({ device, rowSize }) => getTdPadding(device, rowSize)};
    }

    th,
    td {
        font-size: ${({ device }) => (device === 'desktop' ? 0.875 : 1)}rem;
        line-height: 1.5rem;
        margin: 0;
        text-align: left;
        :last-child {
            border-right: 0;
        }
    }

    ${`.${utilColumnClassName}`} {
        box-sizing: border-box;
        color: ${({ theme }) => theme.greys['dark-grey']};
        font-size: 0.75rem;
        min-width: var(--size-2halfx);
        text-align: center;
        width: var(--size-2halfx);
    }
`;

const StyledTableRow = styled.tr`
    background: inherit;
`;

const StyledTableHead = styled.thead`
    background: inherit;
`;

const StyledTBody = styled.tbody`
    background: inherit;
`;

const StyledFooterTableRow = styled.tr`
    background: inherit;
`;

const StyledTableFooter = styled.tfoot`
    background: inherit;
`;

interface SelectableRowProps<T extends object> extends CellProps<T> {
    row: Row<T> & UseRowSelectRowProps<T>;
}

const SelectableRow: <T extends object>(props: SelectableRowProps<T>) => ReactElement = ({ row }) => (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <Checkbox data-testid={`row-checkbox-${row.index}`} {...row.getToggleRowSelectedProps()} />
);

// eslint-disable-next-line max-len
const SelectableHeader: <T extends object>(props: HeaderProps<T>) => ReactElement = ({ getToggleAllRowsSelectedProps }) => (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <Checkbox data-testid="row-checkbox-all" {...getToggleAllRowsSelectedProps()} />
);

function useSelectableRows<T extends object>(selectableRows?: boolean): (hooks: Hooks<T>) => void {
    return (hooks) => {
        if (selectableRows) {
            hooks.visibleColumns.push((columnsArray: Array<ColumnInstance<T>>): Column<T>[] => [
                {
                    id: 'selection',
                    className: utilColumnClassName,
                    Header: SelectableHeader,
                    Cell: SelectableRow,
                },
                ...columnsArray,
            ]);
        }
    };
}

type PartialTableState<T extends object> = Omit<TableState<T>, 'selectedRowIds'>;

export interface TableProps<T extends object> {
    className?: string;
    footerColSpan?: number | undefined;
    columns: TableColumn<T>;
    /** Array of Objects that defines your table data.
     * See stories code or refer to react-table docs for more information */
    data: (T & CustomRowProps)[];
    /**
     * Adds row numbers
     * @default false
     */
    rowNumbers?: boolean;
    /**
     * Sets table rows type
     * @default medium
     */
    rowSize?: RowSize;
    selectableRows?: boolean;
    /**
     * Adds striped rows
     * @default false
     */
    striped?: boolean;

    stickyHeader?: boolean;

    stickyFooter?: boolean;

    onRowClick?(row: Row<T>): void;

    onSelectedRowsChange?(selectedRows: T[]): void;
}

export const Table = <T extends object>({
    className,
    columns,
    data,
    rowNumbers = false,
    rowSize = 'medium',
    selectableRows,
    striped = false,
    onRowClick,
    onSelectedRowsChange,
    stickyHeader = false,
    stickyFooter = false,
}: TableProps<T>): ReactElement => {
    const tableRef = useRef<HTMLTableElement>(null);
    const { device } = useDeviceContext();
    const [renderedColumns, setRenderedColumns] = useState<TableColumn<T>>(
        () => getRenderedColumns(rowNumbers, columns),
    );

    useEffect(() => {
        setRenderedColumns(getRenderedColumns(rowNumbers, columns));
    }, [columns, rowNumbers]);

    const stickyColumns = renderedColumns.map((column) => !!column.sticky);
    useEffect(() => {
        calculateStickyPosition(stickyColumns, stickyHeader, stickyFooter, tableRef);

        const handleResize = (): void => calculateStickyPosition(
            stickyColumns,
            stickyHeader,
            stickyFooter,
            tableRef,
        );
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [stickyColumns, stickyHeader, stickyFooter, tableRef]);

    const getInitialState = useCallback((): PartialTableState<T> | undefined => {
        const defaultSortColumn = columns.find(({ defaultSort }) => !!defaultSort);

        if (defaultSortColumn) {
            const { id, accessor, defaultSort } = defaultSortColumn;

            return {
                sortBy: [{
                    id: id || accessor as string,
                    desc: defaultSort === 'desc',
                },
                ],
            };
        }
        return undefined;
    }, [columns]);

    const hasFooter = columns.some((column) => 'Footer' in column);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
    } = useTable<T>(
        {
            columns: renderedColumns,
            data,
            initialState: getInitialState(),
            disableMultiSort: true,
        },
        useSortBy,
        useRowSelect,
        useSelectableRows(selectableRows),
    );

    useEffect(() => {
        if (selectableRows) {
            onSelectedRowsChange?.(selectedFlatRows.map((row) => row.original));
        }
    }, [selectableRows, selectedFlatRows, onSelectedRowsChange]);

    return (
        <StyledTable
            className={className}
            rowSize={rowSize}
            striped={striped}
            device={device}
            clickableRows={onRowClick !== undefined}
            {...getTableProps() /* eslint-disable-line react/jsx-props-no-spreading */}
            ref={tableRef}
        >
            <StyledTableHead>
                {headerGroups.map((headerGroup) => (
                    /* eslint-disable-next-line max-len */
                    <StyledTableRow {...headerGroup.getHeaderGroupProps() /* eslint-disable-line react/jsx-props-no-spreading */}>
                        {headerGroup.headers.map((column) => getHeading(column, stickyHeader))}
                    </StyledTableRow>
                ))}
            </StyledTableHead>
            <StyledTBody {...getTableBodyProps() /* eslint-disable-line react/jsx-props-no-spreading */}>
                {rows.map((row: Row<T>, i: number) => {
                    prepareRow(row);
                    return (
                        <TableRow<T>
                            striped={striped}
                            error={!!(row.original as CustomRowProps).error}
                            key={row.id}
                            row={row}
                            onClick={onRowClick}
                            viewIndex={i}
                        />
                    );
                })}
            </StyledTBody>
            {hasFooter && (
                <StyledTableFooter>
                    {footerGroups.map((group) => (
                        /* eslint-disable-next-line max-len */
                        <StyledFooterTableRow {...group.getFooterGroupProps() /* eslint-disable-line react/jsx-props-no-spreading */}>
                            {group.headers.map((column) => (
                                getFooter(column, stickyFooter)
                            ))}
                        </StyledFooterTableRow>
                    ))}
                </StyledTableFooter>
            )}
        </StyledTable>
    );
};
