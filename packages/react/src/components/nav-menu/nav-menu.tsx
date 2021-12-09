import { createRef, forwardRef, KeyboardEvent, ReactElement, Ref, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from '../../utils/uuid';
import { ListOption, NavMenuItem } from './nav-menu-item';
import { NavMenuOption } from './nav-menu-option';

const List = styled.ul`
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['dark-grey']};
    border-radius: var(--border-radius);
    box-shadow: ${({ theme }) => theme.tokens['overlay-box-shadow']};
    list-style-type: none;
    margin: 0;
    overflow-y: auto;
    padding: 0;
    position: absolute;
    width: 100%;
`;

export interface NavMenuProps {
    id?: string;
    options: NavMenuOption[];
    className?: string;
    /** Sets the current focused element in the menu */
    focusedValue?: string;
    hidden?: boolean;

    /** onChange callback function, invoked when an option is selected */
    onChange?(option: NavMenuOption): void;

    /** onKeyDown callback function, invoked when a key is pressed */
    onKeyDown?(event: KeyboardEvent): void;

    ordered?: boolean;
}

export const NavMenu = forwardRef(({
    className,
    id: providedId,
    options,
    focusedValue,
    hidden,
    onChange,
    onKeyDown,
    ordered,
}: NavMenuProps, ref: Ref<HTMLUListElement>): ReactElement => {
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const list: ListOption[] = useMemo((): ListOption[] => options.map((option, index) => ({
        ...option,
        id: `${id}_${option.value}`,
        focused: false,
        focusIndex: index,
        ref: createRef<HTMLAnchorElement>(),
    })), [id, options]);

    useEffect(() => {
        if (focusedValue) {
            const currentOption = list.find((option) => option.value === focusedValue);
            currentOption?.ref.current?.focus();
        }
    }, [focusedValue, list]);

    function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>, option: NavMenuOption): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.currentTarget.click();

            onChange?.(option);
        }

        onKeyDown?.(event);
    }

    return (
        <List
            as={ordered ? 'ol' : 'ul'}
            className={className}
            data-testid="menu-list"
            id={id}
            ref={ref}
            hidden={hidden}
        >
            {list.map((option) => (
                <NavMenuItem
                    data-testid={`listitem-${option.value}`}
                    key={option.id}
                    onKeyDown={handleKeyDown}
                    onSelect={onChange}
                    option={option}
                />
            ))}
        </List>
    );
});

NavMenu.displayName = 'NavMenu';
