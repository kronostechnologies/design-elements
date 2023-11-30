import { ReactElement, useMemo } from 'react';
import { HeaderGroup } from 'react-table';
import styled from 'styled-components';
import { SortButtonIcon, SortState } from './sort-button-icon';

const SortButton = styled.button`
    cursor: pointer;
    margin-left: var(--spacing-1x);

    &:focus {
        outline: none;
    }
`;

const StyledDiv = styled.div<{ textAlign: string }>`
    align-items: center;
    display: flex;
    ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
`;

interface SortableColumnHeadingProps<T extends object = {}> {
    header: HeaderGroup<T>;
}

export const SortableColumnHeading = <T extends object>({ header }: SortableColumnHeadingProps<T>): ReactElement => {
    const sortState: SortState = useMemo(() => {
        if (header.isSorted) {
            return header.isSortedDesc ? 'descending' : 'ascending';
        }
        return 'none';
    }, [header.isSorted, header.isSortedDesc]);

    return (
        <th
            {...header.getHeaderProps(header.getSortByToggleProps()) /* eslint-disable-line react/jsx-props-no-spreading,max-len */}
            scope="col"
            aria-sort={sortState}
        >
            <StyledDiv textAlign={header.textAlign}>
                {header.render('Header')}
                <SortButton>
                    <SortButtonIcon sort={sortState} data-testid="sort-icon" />
                </SortButton>
            </StyledDiv>
        </th>
    );
};
