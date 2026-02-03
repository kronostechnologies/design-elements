import { forwardRef, KeyboardEvent, ReactElement, Ref, useMemo } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { v4 as uuid } from '../../utils/uuid';
import { type GroupItemProps } from './list-items';

const List = styled.div`
    background-color: ${({ theme }) => theme.component['dropdown-menu-background-color']};
    border: 1px solid ${({ theme }) => theme.component['dropdown-menu-border-color']};
    border-radius: var(--border-radius);
    box-shadow: 0 10px 20px 0 ${({ theme }) => theme.component['dropdown-menu-box-shadow-color']};
    color: ${({ theme }) => theme.component['dropdown-menu-text-color']};
    list-style-type: none;
    position: absolute;
    width: 100%;
    z-index: 700;
`;

export interface DropdownMenuProps {
    children?: ReactElement<GroupItemProps> | ReactElement<GroupItemProps>[];
    id?: string;
    className?: string;
    onKeyDown?(event: KeyboardEvent): void;
}

export const DropdownMenu = forwardRef(({
    children,
    className,
    id: providedId,
    onKeyDown,
    ...otherProps
}: DropdownMenuProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const dataAttributes = useDataAttributes(otherProps);

    return (
        <List
            ref={ref}
            className={className}
            data-testid="menu-list"
            id={id}
            onKeyDownCapture={(event: KeyboardEvent<HTMLDivElement>) => onKeyDown?.(event)}
            {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {children}
        </List>
    );
});

DropdownMenu.displayName = 'DropdownMenu';
