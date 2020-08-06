import React, { ReactElement } from 'react';
import { Column } from 'react-table';
import styled from 'styled-components';

import { useTheme } from '@design-elements/hooks/use-theme';
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
    column: Column<{}>;
}

export function SortableColumnHeading({ column }: SortableColumnHeadingProps): ReactElement {
    const Theme = useTheme();

    return (
        <th
          {...column.getHeaderProps(column.getSortByToggleProps())}
          scope="col"
          aria-sort={
            column.isSorted
              ? column.isSortedDesc
                ? 'descending'
                : 'ascending'
              : 'none'
          }
        >
          <StyledDiv textAlign={column.textAlign}>
            <SortButton>
              {column.isSorted
                ? column.isSortedDesc
                  ? <Icon name="chevronDown" size="16" color={Theme.greys['dark-grey']}/>
                  : <Icon name="chevronUp" size="16" color={Theme.greys['dark-grey']}/>
                : <Icon name="reorder" size="16" color={Theme.greys['dark-grey']}/>}
            </SortButton>
            {column.render('Header')}
          </StyledDiv>
        </th>
    );
}
