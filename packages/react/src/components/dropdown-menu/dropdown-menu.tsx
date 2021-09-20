import React, { forwardRef, KeyboardEvent, ReactElement, Ref, useMemo } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from '../../utils/uuid';
import { GroupItemProps } from './list-items';

const List = styled.div`
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['dark-grey']};
    border-radius: var(--border-radius);
    box-shadow: ${({ theme }) => theme.tokens['overlay-box-shadow']};
    color: ${({ theme }) => theme.greys.black};
    list-style-type: none;
    position: absolute;
    width: 100%;
    
    h3 {
        margin: 0;
        padding: 0 var(--spacing-2x);
        padding-bottom: var(--spacing-1x);
    }
    
    ul:not(:last-child)::after, ol:not(:last-child)::after {
        content: "";
        border-bottom: 1px solid ${({ theme }) => theme.greys.grey};
        display:block;
        margin: 0 var(--spacing-2x);
    }
`;

export interface DropdownMenuProps {
    children?: ReactElement<GroupItemProps> | ReactElement<GroupItemProps>[];
    id?: string;
    className?: string;
    hidden?: boolean;

    onChange?(event: KeyboardEvent): void;
    onKeyDown?(event: KeyboardEvent): void;
}

export const DropdownMenu = forwardRef(({
    children,
    className,
    id: providedId,
    hidden,
    onChange,
    onKeyDown,
}: DropdownMenuProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const id = useMemo(() => providedId || uuid(), [providedId]);

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
        if (event.key === 'Enter') {
            if (onChange) {
                onChange(event);
            }
        }

        if (onKeyDown) {
            onKeyDown(event);
        }
    }

    return (
        <List
            ref={ref}
            className={className}
            data-testid="menu-list"
            id={id}
            hidden={hidden}
            onKeyDownCapture={handleKeyDown}
        >
            {children}
        </List>
    );
});

DropdownMenu.displayName = 'DropdownMenu';
