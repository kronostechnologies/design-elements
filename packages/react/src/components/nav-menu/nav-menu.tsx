import React, { forwardRef, KeyboardEvent, ReactElement, Ref, RefObject, useEffect, useMemo } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider'

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

const ListItemLink = styled(NavLink)<ListItemLinkProps>`
    align-items: center;
    color: ${({ theme }) => theme.greys.black};
    display: flex;
    font-size: ${({ $device: { isMobile, isTablet } }) => (isTablet || isMobile) ? '1rem' : '0.875rem'};
    line-height: ${({ $device: { isMobile, isTablet } }) => (isTablet || isMobile) ? 2.5 : 2}rem;
    overflow: hidden;
    padding: 0 var(--spacing-2x);
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:focus {
        box-shadow: ${({ theme }) => theme.tokens['focus-border-box-shadow-inset']};
        outline: none;
    }

    :hover {
        background-color: ${({ theme }) => theme.greys.grey};
    }
`;

export interface NavMenuOption {
    href: string;
    // Option label, if not provided will be set with value
    label?: string;
    value: string;
}

interface ListOption extends NavMenuOption {
    id: string;
    focusIndex: number;
    ref: RefObject<HTMLAnchorElement>;
}

interface ListItemLinkProps extends NavLinkProps {
    $device: DeviceContextProps;
}

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
}

export const NavMenu = forwardRef(({
    className,
    id = useMemo(uuid, []),
    options,
    focusedValue,
    hidden,
    onChange,
    onKeyDown,
}: NavMenuProps, ref: Ref<HTMLUListElement>): ReactElement => {
    const device = useDeviceContext();
    const list: ListOption[] = useMemo((): ListOption[] =>
        options.map((option, index)  =>
            ({
                ...option,
                id: `${id}_${option.value}`,
                focused: false,
                focusIndex: index,
                ref: React.createRef<HTMLAnchorElement>(),
            }))
    , [id, options]);

    useEffect(() => {
        if (focusedValue) {
            const currentOption = list.find(option => option.value === focusedValue);
            currentOption?.ref.current?.focus();
        }
    }, [focusedValue, list]);

    function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>, option: NavMenuOption): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.currentTarget.click();

            if (onChange) {
                onChange(option);
            }
        }

        if (onKeyDown) {
            onKeyDown(event);
        }
    }

    return (
        <List
            className={className}
            data-testid="menu-list"
            id={id}
            ref={ref}
            hidden={hidden}
        >
            {list.map(option => (
                <li key={option.id}>
                    <ListItemLink
                        data-testid={`listitem-${option.value}`}
                        innerRef={option.ref}
                        $device={device}
                        to={option.href}
                        onClick={() => onChange && onChange(option)}
                        onKeyDown={(event) => handleKeyDown(event, option)}
                    >
                        {option.label || option.value}
                    </ListItemLink>
                </li>
            ))}
        </List>
    );
});
