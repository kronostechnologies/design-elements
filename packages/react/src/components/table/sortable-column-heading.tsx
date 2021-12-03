import { ReactElement, useMemo } from 'react';
import { Column } from 'react-table';
import styled from 'styled-components';
import { SortButtonIcon, SortState } from './sort-button-icon';

const SortButton = styled.button`
    cursor: pointer;
    margin-right: var(--spacing-1x);

    &:focus {
        outline: none;
    }
`;

const StyledDiv = styled.div<{ textAlign: string }>`
    align-items: center;
    display: flex;
    ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
`;

interface SortableColumnHeadingProps {
    column: Column;
}

export function SortableColumnHeading({ column }: SortableColumnHeadingProps): ReactElement {
    const sortState: SortState = useMemo(() => {
        if (column.isSorted) {
            return column.isSortedDesc ? 'descending' : 'ascending';
        }
        return 'none';
    }, [column.isSorted, column.isSortedDesc]);

    return (
        <th
            {...column.getHeaderProps(column.getSortByToggleProps()) /* eslint-disable-line react/jsx-props-no-spreading,max-len */}
            scope="col"
            aria-sort={sortState}
        >
            <StyledDiv textAlign={column.textAlign}>
                <SortButton>
                    <SortButtonIcon sort={sortState} data-testid="sort-icon" />
                </SortButton>
                {column.render('Header')}
            </StyledDiv>
        </th>
    );
}
