import React, { forwardRef, KeyboardEvent, ReactElement, Ref, RefObject, useEffect, useMemo } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { Icon, IconName } from '../icon/icon';
import { v4 as uuid } from '../../utils/uuid';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';

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

interface ListItemLinkProps extends NavLinkProps {
    $device: DeviceContextProps;
}

const Label = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const StartIcon = styled(Icon).attrs({ size: '16' })`
    color: ${({ theme }) => theme.greys['dark-grey']};
    margin-right: var(--spacing-1x);
    min-width: 16px;
`;

const EndIcon = styled(Icon).attrs({ size: '16' })`
    color: ${({ theme }) => theme.greys['dark-grey']};
    margin-left: var(--spacing-1x);
    min-width: 16px;
`;

const ListItemLink = styled(NavLink)<ListItemLinkProps>`
    align-items: center;
    color: ${({ theme }) => theme.greys.black};
    display: flex;
    font-size: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? '1rem' : '0.875rem')};
    line-height: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? 2.5 : 2)}rem;
    overflow: hidden;
    padding: 0 var(--spacing-2x);
    text-decoration: none;

    &:focus {
        box-shadow: ${({ theme }) => theme.tokens['focus-border-box-shadow-inset']};
        outline: none;
    }

    :hover {
        background-color: ${({ theme }) => theme.greys.grey};

        ${StartIcon},
        ${EndIcon} {
            color: ${({ theme }) => theme.greys.black};
        }
    }
`;

export interface NavMenuOption {
    endIcon?: IconName;
    exact?: boolean;
    href: string;
    // Option label, if not provided will be set with value
    label?: string;
    startIcon?: IconName;
    value: string;
}

interface ListOption extends NavMenuOption {
    id: string;
    focusIndex: number;
    ref: RefObject<HTMLAnchorElement>;
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
    const device = useDeviceContext();
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const list: ListOption[] = useMemo((): ListOption[] => options.map((option, index) => ({
        ...option,
        id: `${id}_${option.value}`,
        focused: false,
        focusIndex: index,
        ref: React.createRef<HTMLAnchorElement>(),
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
            as={ordered ? 'ol' : 'ul'}
            className={className}
            data-testid="menu-list"
            id={id}
            ref={ref}
            hidden={hidden}
        >
            {list.map((option) => (
                <li key={option.id}>
                    <ListItemLink
                        data-testid={`listitem-${option.value}`}
                        exact={option.exact}
                        innerRef={option.ref}
                        $device={device}
                        to={option.href}
                        onClick={() => onChange?.(option)}
                        onKeyDown={(event) => handleKeyDown(event, option)}
                    >
                        {option.startIcon && <StartIcon data-testid="start-icon" name={option.startIcon} />}
                        <Label>{option.label || option.value}</Label>
                        {option.endIcon && <EndIcon data-testid="end-icon" name={option.endIcon} />}
                    </ListItemLink>
                </li>
            ))}
        </List>
    );
});

NavMenu.displayName = 'NavMenu';
