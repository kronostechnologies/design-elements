import { flexRender, HeaderGroup, SortDirection } from '@tanstack/react-table';
import { CSSProperties, ReactElement, useMemo } from 'react';
import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';
import { focus } from '../../utils/css-state';
import { devConsole } from '../../utils/dev-console';
import { SortButtonIcon, SortState } from './sort-button-icon';
import { CustomHeader } from './types';
import { findNearestTextAlign, isAGroupColumn, isLastColumnInAGroup } from './utils/table-utils';

interface SortButtonProps {
    $textAlign: CSSProperties['textAlign'];
}

function convertTextAlignToMargin(
    { $textAlign }: SortButtonProps,
): FlattenInterpolation<ThemeProps<ResolvedTheme>> | undefined {
    switch ($textAlign) {
        case 'right':
            return css`margin-right: calc(-1 * var(--spacing-half));`;
        default:
            return undefined;
    }
}

function convertTextAlignToFlexAlign({ $textAlign }: SortButtonProps): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    switch ($textAlign) {
        case 'right':
            return css`justify-self: flex-end;`;
        case 'center':
            return css`justify-self: center;`;
        default:
            return css`justify-self: flex-start;`;
    }
}

const SortButton = styled.button<SortButtonProps>`
    align-items: center;
    border-radius: var(--border-radius);
    cursor: pointer;
    display: flex;
    font: inherit;
    ${convertTextAlignToFlexAlign};

    ${({ theme }) => focus({ theme }, { focusType: 'focus-visible', insideOnly: true })};
`;

interface StyledHeaderProps {
    hasRightBorder: boolean;
    $sticky: boolean;
    $startOffset: number;
    $textAlign: CSSProperties['textAlign'];
}

const StyledHeader = styled.th<StyledHeaderProps>`
    background-color: inherit;
    box-sizing: border-box;
    position: relative;
    text-align: ${({ $textAlign }) => $textAlign};

    ${({ $sticky, $startOffset }) => $sticky && css`
        left: ${$startOffset / 2}px;
        position: sticky;
        z-index: 5;
    `}

    ${({ hasRightBorder }) => hasRightBorder && css`
        border-right: 1px solid ${({ theme }) => theme.component['table-group-border-color']};
    `}

    &:before {
        border-bottom: 1px solid ${({ theme }) => theme.component['table-header-border-color']};
        bottom: 0;
        content: '';
        position: absolute;
        right: 0;
        width: 100%;
    }
`;

const StyleHeaderRow = styled.tr<{ $sticky: boolean }>`
    background-color: inherit;
    ${({ $sticky }) => $sticky && css`
        position: sticky;
        top: 0;
        z-index: 6;
    `}
`;

const StyledSortButtonIcon = styled(SortButtonIcon)<SortButtonProps>`
    margin-left: var(--spacing-1x);
    ${convertTextAlignToMargin};
`;

function getSortState(currentSort: false | SortDirection): SortState {
    switch (currentSort) {
        case 'asc':
            return 'ascending';
        case 'desc':
            return 'descending';
        default:
            return 'none';
    }
}

function getHeading<TData extends object, TValue>(header: CustomHeader<TData, TValue>): ReactElement {
    const columnDef = header.column.columnDef;
    const colSpan = header.colSpan > 1 ? header.colSpan : undefined;
    const hasRightBorder = isAGroupColumn(header.column) || isLastColumnInAGroup(header.column);
    const sortState: SortState = getSortState(header.column.getIsSorted());
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const textAlign = useMemo(() => findNearestTextAlign(header.column), [header.column]);

    if (!columnDef.header && !columnDef.headerAriaLabel) {
        devConsole.warn(
            `aria-label missing for column ${header.id} without text. please add headerAriaLabel to column.`,
        );
    }

    if (columnDef.sortable) {
        return (
            <StyledHeader
                aria-label={columnDef.headerAriaLabel}
                aria-sort={sortState}
                className={columnDef.className ?? ''}
                colSpan={colSpan}
                hasRightBorder={hasRightBorder}
                key={header.id}
                scope="col"
                $startOffset={header.getStart()}
                $sticky={columnDef.sticky ?? false}
                $textAlign={textAlign}
            >
                {header.isPlaceholder ? null : (
                    <SortButton
                        $textAlign={textAlign}
                        onClick={header.column.getToggleSortingHandler()}
                    >
                        {flexRender(columnDef.header, header.getContext())}
                        <StyledSortButtonIcon
                            sort={sortState}
                            $textAlign={textAlign}
                            data-testid="sort-icon"
                        />
                    </SortButton>
                )}
            </StyledHeader>
        );
    }

    return (
        <StyledHeader
            aria-label={columnDef.headerAriaLabel}
            className={columnDef.className ?? undefined}
            colSpan={colSpan}
            hasRightBorder={hasRightBorder}
            key={header.id}
            scope="col"
            $startOffset={header.getStart()}
            $sticky={columnDef.sticky ?? false}
            $textAlign={textAlign}
        >
            {!header.isPlaceholder && flexRender(columnDef.header, header.getContext())}
        </StyledHeader>
    );
}

interface TableHeaderProps<T extends object> {
    headerGroup: HeaderGroup<T>;
    sticky: boolean;
}

export const TableHeader = <T extends object>({
    headerGroup,
    sticky,
}: TableHeaderProps<T>): ReactElement => (
    <StyleHeaderRow $sticky={sticky}>
        {headerGroup.headers.map((header) => getHeading(header))}
    </StyleHeaderRow>
);

TableHeader.displayName = 'TableHeader';
