import React, { ReactElement } from 'react';
import { Column, Row, useSortBy, useTable } from 'react-table';
import styled from 'styled-components';

import { useTheme } from '../../hooks/use-theme';
import { DeviceType, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { Theme as ThemeProps } from '../theme-wrapper/theme-wrapper';

interface TableWrapperProps {
    clickableRows: boolean;
    device: DeviceType;
    theme: ThemeProps;
}

const TableWrapper = styled.div<TableWrapperProps>`
    table {
        border-spacing: 0;
        width: 100%;

        th {
            font-weight: var(--font-semi-bold);
            padding: ${({ device }) => getThPadding(device)};
        }

        td {
            padding: ${({ device }) => getTdPadding(device)};
        }

        th,
        td {
            border-bottom: 1px solid ${({ theme }) => theme.greys.grey};
            font-size: ${({ device }) => device === 'desktop' ? 0.875 : 1}rem;
            line-height: 24px;
            margin: 0;
            text-align: left;

            :last-child {
                border-right: 0;
            }
        }

        tbody tr {
            ${({ clickableRows, theme }) => clickableRows ? `
              :hover {
                  background-color: ${theme.greys.grey};
                  cursor: pointer;
              }
            ` : ''}
        }

        tr:last-child td {
            border-bottom: 0;
        }
    }
`;

const StyledIcon = styled(Icon)`
    margin-right: var(--spacing-1x);
`;

type CustomColumn = Column & { sort?: boolean };

export type ColumnsProps = CustomColumn[];

interface RowProps extends Row {
    original: any;
}
interface TableProps {
    columns: ColumnsProps;
    data: {}[];
    onRowClick?(row: RowProps): void;
}

export function Table({ columns, data, onRowClick }: TableProps): ReactElement {
    const Theme = useTheme();
    const { device } = useDeviceContext();
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy,
    );

    return (
      <TableWrapper device={device} clickableRows={onRowClick !== undefined}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                    if (column.sort) {
                        return (
                          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? <StyledIcon name="chevronDown" size="16" color={Theme.greys['dark-grey']}/>
                                  : <StyledIcon name="chevronUp" size="16" color={Theme.greys['dark-grey']}/>
                                : <StyledIcon name="reorder" size="16" color={Theme.greys['dark-grey']}/>}
                              {column.render('Header')}
                            </div>
                          </th>
                        );
                    } else {
                        return (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        );
                    }
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(
                (row, i) => {
                    prepareRow(row);
                    return (
                  <tr key={i} onClick={() => onRowClick && onRowClick(row)} {...row.getRowProps()}>
                    {row.cells.map((cell, index) => {
                        return (
                        <td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        );
                    })}
                  </tr>
                    ); },
            )}
          </tbody>
        </table>
      </TableWrapper>
    );
}

function getThPadding(device: DeviceType): string {
    switch (device) {
        case 'desktop':
            return 'var(--spacing-1x) var(--spacing-2x)';
        case 'tablet':
            return 'var(--spacing-2x) var(--spacing-1x)';
        case 'mobile':
            return 'var(--spacing-2x) 0';
    }
}

function getTdPadding(device: DeviceType): string {
    switch (device) {
        case 'desktop':
            return 'var(--spacing-2x)';
        case 'tablet':
            return 'var(--spacing-3x) var(--spacing-1x)';
        case 'mobile':
            return 'var(--spacing-3x) 0';
    }
}
