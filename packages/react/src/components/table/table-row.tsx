import React, { ReactElement } from 'react';
import { UseTableRowProps } from 'react-table';
import { RowProps } from './table';

interface TableRowProps {
    row: UseTableRowProps<{}>;
    onClick?(row: RowProps): void;
}

export function TableRow({ row, onClick }: TableRowProps): ReactElement {
    return (
        <tr onClick={() => onClick && onClick(row)} {...row.getRowProps()}>
            {row.cells.map(cell => (
                <td
                    key={`${cell.column.id}-${cell.row.id}`}
                    style={{ textAlign: cell.column.textAlign }}
                    {...cell.getCellProps()}
                >
                    {cell.render('Cell')}
                </td>
            ))}
        </tr>
    );
}
