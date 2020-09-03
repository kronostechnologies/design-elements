import React, { CSSProperties, ReactElement } from 'react';
import { UseTableRowProps } from 'react-table';
import { RowProps } from './table';

interface TableRowProps {
    row: UseTableRowProps<{}>;
    onClick?(row: RowProps): void;
}

export function TableRow({ row, onClick }: TableRowProps): ReactElement {
    return (
        <tr onClick={() => onClick && onClick(row)} {...row.getRowProps()}>
            {row.cells.map(cell => {
                const style: CSSProperties = { textAlign: cell.column.textAlign };
                return (
                    <td
                        style={style}
                        {...{ ...cell.getCellProps(), key: `${cell.column.id}-${cell.row.id}` }}
                    >
                        {cell.render('Cell')}
                    </td>
                );
            })}
        </tr>
    );
}
