import { createRef, forwardRef, KeyboardEvent, ReactElement, Ref, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { v4 as uuid } from '../../utils/uuid';
import { ListOption, NavListItem } from './nav-list-item';
import { NavListOption } from './nav-list-option';

const List = styled.ul`
    background-color: ${({ theme }) => theme.ref['color-white']};
    border: 1px solid ${({ theme }) => theme.ref['color-neutral-65']};
    border-radius: var(--border-radius);
    box-shadow: ${({ theme }) => theme.component['overlay-box-shadow']};
    list-style-type: none;
    margin: 0;
    overflow-y: auto;
    padding: 0;
    position: absolute;
    width: 100%;
`;

export interface NavListProps {
    id?: string;
    options: NavListOption[];
    className?: string;
    /** Sets the current focused element in the menu */
    focusedValue?: string;
    hidden?: boolean;

    /** onChange callback function, invoked when an option is selected */
    onChange?(option: NavListOption): void;

    /** onKeyDown callback function, invoked when a key is pressed */
    onKeyDown?(event: KeyboardEvent): void;

    ordered?: boolean;
}

export const NavList = forwardRef(({
    className,
    id: providedId,
    options,
    focusedValue,
    hidden,
    onChange,
    onKeyDown,
    ordered,
    ...rest
}: NavListProps, ref: Ref<HTMLUListElement>): ReactElement => {
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const dataAttributes = useDataAttributes(rest);
    const dataTestId = dataAttributes['data-testid'] ?? 'menu-list';
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

    function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>, option: NavListOption): void {
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
            data-testid={dataTestId}
            id={id}
            ref={ref}
            hidden={hidden}
        >
            {list.map((option) => (
                <NavListItem
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

NavList.displayName = 'NavList';
