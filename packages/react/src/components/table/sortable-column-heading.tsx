import { useTheme } from '@design-elements/hooks/use-theme';
import React, { ReactElement, useMemo, VoidFunctionComponent } from 'react';
import { Column } from 'react-table';
import styled from 'styled-components';
import { Icon } from '../icon/icon';

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

type SortState = 'ascending' | 'descending' | 'none';

interface SortButtonIconProps {
    sort: SortState;
}

const SortButtonIcon: VoidFunctionComponent<SortButtonIconProps> = ({ sort }) => {
    const theme = useTheme();

    switch (sort) {
        case 'ascending':
            return <Icon name="arrowUp" size="16" color={theme.greys['dark-grey']} />;
        case 'descending':
            return <Icon name="arrowDown" size="16" color={theme.greys['dark-grey']} />;
        default:
            return <Icon name="reorder" size="16" color={theme.greys['dark-grey']} />;
    }
};

export function SortableColumnHeading({ column }: SortableColumnHeadingProps): ReactElement {
    const sortState: SortState = useMemo(() => {
        if (column.isSorted) {
            return column.isSortedDesc ? 'descending' : 'ascending';
        }
        return 'none';
    }, [column]);

    return (
        <th
            {...column.getHeaderProps(column.getSortByToggleProps()) /* eslint-disable-line react/jsx-props-no-spreading,max-len */}
            scope="col"
            aria-sort={sortState}
        >
            <StyledDiv textAlign={column.textAlign}>
                <SortButton>
                    <SortButtonIcon sort={sortState} />
                </SortButton>
                {column.render('Header')}
            </StyledDiv>
        </th>
    );
}
