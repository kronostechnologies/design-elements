import React, { ReactElement } from 'react';
import { Column, TableOptions, useTable } from 'react-table';
import styled from 'styled-components';

import { DeviceType, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Theme } from '../theme-wrapper/theme-wrapper';

interface TableWrapperProps {
    device: DeviceType;
    theme: Theme;
}

export type ColumnsProps = Column[];

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

        tr:last-child td {
            border-bottom: 0;
        }
    }
`;

export function Table({ columns, data }: TableOptions<{}>): ReactElement {
    const { device } = useDeviceContext();

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data });

    return (
        <TableWrapper device={device}>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                        <tr key={i} {...row.getRowProps()}>
                            {row.cells.map((cell, index) => {
                                return <td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                        );
                    })}
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
