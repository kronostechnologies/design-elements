import React, {
    forwardRef,
    KeyboardEvent,
    ReactElement,
    Ref,
    RefObject,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled, { css } from 'styled-components';
import uuid from 'uuid/v4';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';

export interface Option {
    href: string;
    // Option label, if not provided will be set with value
    label?: string;
    value: string;
}

interface NavMenuOption extends Option {
    id: string;
    focusIndex: number;
    ref: RefObject<HTMLLIElement>;
    anchorRef?: RefObject<HTMLAnchorElement>;
}

export interface NavMenuProps {
    id?: string;
    options: Option[];
    /**
     * Autofocus
     * @default false
     */
    autofocus?: boolean;
    className?: string;
    /** Number of visible items in the menu before overflow */
    numberOfItemsVisible?: number;
    /** Sets the current focused element in the menu */
    focusedValue?: string;
    /** Sets the selected value (controlled input) */
    value?: string;
    /**
     * @default false
     */
    hidden?: boolean;
    /** onChange callback function, invoked when an option is selected */
    onChange?(option: Option): void;
    /** onKeyDown callback function, invoked when a key is pressed */
    onKeyDown?(event: KeyboardEvent): void;
    /** onFocusedValueChange callback function, invoked when focused value changes */
    onFocusedValueChange?(value: string | undefined): void;
}

interface ListProps {
    device: DeviceContextProps;
    numberOfItemsVisible: number;
}

interface ListItemLinkProps extends LinkProps {
    $device: DeviceContextProps;
    $selected: boolean;
    $focused: boolean;
}

const itemHeightDesktop = 32;
const itemHeightMobile = 40;

const List = styled.ul<ListProps>`
    background-color: ${({ theme }) => theme.greys.white};
    border-radius: var(--border-radius);
    box-shadow: 0 0 0 1px ${({ theme }) => theme.greys['dark-grey']}, 0 10px 20px 0 rgba(0, 0, 0, 0.19);
    list-style-type: none;
    margin: 0;
    max-height: ${({ numberOfItemsVisible, device }) => numberOfItemsVisible * ((device.isTablet || device.isMobile) ? itemHeightMobile : itemHeightDesktop)}px;
    overflow-y: auto;
    padding: 0;
    position: absolute;
    width: 100%;

    &:focus {
        box-shadow: ${({ theme }) => theme.tokens['focus-border-box-shadow']}, 0 10px 20px 0 rgba(0, 0, 0, 0.19);
        outline: none;
    }
`;

const ellipsisStyles = css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ListItem = styled.li`
    &:focus {
        outline: none;
    }
`;

const ListItemLink = styled(Link)<ListItemLinkProps>`
    align-items: center;
    background-color: ${({ $focused, theme }) => $focused ? theme.greys.grey : 'inherit'};
    color: ${({ theme }) => theme.greys.black};
    cursor: pointer;
    display: block;
    font-size: ${({ $device }) => ($device.isTablet || $device.isMobile) ? '1rem' : '0.875rem'};
    font-weight: ${({ $selected }) => $selected ? 'var(--font-semi-bold)' : 'var(--font-normal)'};
    height: ${({ $device }) => ($device.isTablet || $device.isMobile) ? itemHeightMobile : itemHeightDesktop}px;
    line-height: ${({ $device }) => ($device.isTablet || $device.isMobile) ? itemHeightMobile : itemHeightDesktop}px;
    ${ellipsisStyles}
    padding: 0 var(--spacing-2x);
    text-decoration: none;

    &:focus {
        outline: none;
    }

    :active {
        background-color: ${({ theme }) => theme.greys.grey};
    }
`;

export const NavMenu = forwardRef(({
    className,
    id = useMemo(uuid, []),
    options,
    numberOfItemsVisible = options.length,
    autofocus = false,
    focusedValue,
    value,
    hidden = false,
    onChange,
    onFocusedValueChange,
    onKeyDown,
}: NavMenuProps, ref: Ref<HTMLUListElement | null>): ReactElement => {
    const device = useDeviceContext();
    const listRef = useRef<HTMLUListElement>(null);
    const [selectedOptionValue, setSelectedOptionValue] = useState('');
    const [selectedFocusIndex, setSelectedFocusIndex] =
        useState(() => options.findIndex(option =>  option.value === selectedOptionValue[0]));
    const list: NavMenuOption[] = useMemo((): NavMenuOption[] =>
        options.map((option, index)  =>
            ({
                ...option,
                id: `${id}_${option.value}`,
                focusIndex: index,
                ref: React.createRef<HTMLLIElement>(),
                anchorRef: option.href ? React.createRef<HTMLAnchorElement>() : undefined,
            }))
    , [options]);

    useImperativeHandle(ref, () => listRef.current, [listRef]);

    useEffect(() => {
        if (value !== undefined) {
            setValue(value);
        }
    }, [value]);

    useEffect(() => {
        if (focusedValue) {
            const focusedValueIndex = options.findIndex(option => option.value === focusedValue);
            const currentOption = list[focusedValueIndex];
            setSelectedFocusIndex(focusedValueIndex);
            handleAutoScroll(currentOption, focusedValueIndex);
        } else {
            setSelectedFocusIndex(-1);
        }
    }, [focusedValue]);

    useEffect(() => {
        if (autofocus && listRef.current) {
            listRef.current.focus();
            listRef.current.scrollTop = 0;
        }

        if (selectedOptionValue) {
            setSelectedFocusIndex(options.findIndex(option => option.value === selectedOptionValue[0]));
        }
    }, [autofocus]);

    function isOptionSelected(option: NavMenuOption): boolean {
        return selectedOptionValue === option.value;
    }

    function isOptionFocused(option: NavMenuOption): boolean {
        return option.focusIndex === selectedFocusIndex;
    }

    function setValue(newValue: string): void {
        setSelectedOptionValue(newValue);

        if (list.length > 0) {
            setSelectedFocusIndex(options.findIndex(option => option.value === newValue[0]));
        }
    }

    function selectOption(option: NavMenuOption): void {
        setSelectedFocusIndex(option.focusIndex);
        setSelectedOptionValue(option.value);

        if (onChange) {
            onChange(option);
        }
    }

    function handleAutoScroll(option: NavMenuOption, focusedIndex: number): void {
        if (!listRef.current || !option || !option.ref.current) {
            return;
        }

        const listRect = listRef.current.getBoundingClientRect();
        const itemRect = option.ref.current.getBoundingClientRect();

        if (listRect.height < (itemRect.height * (focusedIndex + 1))) {
            listRef.current.scrollTop = itemRect.height * (focusedIndex);
        } else if (listRect.top - itemRect.top >= 0) {
            const spaceDif = listRect.top - itemRect.top;
            const numberOfItemsToScroll = spaceDif / itemRect.height;

            listRef.current.scrollTop = listRef.current.scrollTop - (itemRect.height * numberOfItemsToScroll);
        }
    }

    function scrollIntoList(direction: 'up' | 'down' | 'top' | 'bottom'): void {
        const currentOption = list[selectedFocusIndex];
        let itemIsOutOfRange = false;

        if (!listRef.current || !currentOption || !currentOption.ref.current) {
            return;
        }

        const listRect = listRef.current.getBoundingClientRect();
        const itemRect = currentOption.ref.current.getBoundingClientRect();

        switch (direction) {
            case 'up':
                const isPrevItemHidden = listRect.top - itemRect.top >= 0;
                itemIsOutOfRange =
                    (listRect.top - itemRect.top) <= -(numberOfItemsVisible * itemRect.height)
                    || (listRect.top - itemRect.top) >= itemRect.height;

                if (itemIsOutOfRange) {
                    handleAutoScroll(list[selectedFocusIndex - 1], selectedFocusIndex - 1);
                } else if (isPrevItemHidden) {
                    listRef.current.scrollTop = listRef.current.scrollTop - itemRect.height;
                }
                break;
            case 'down':
                const isNextItemHidden = listRect.bottom - itemRect.bottom <= 0;
                itemIsOutOfRange =
                    (listRect.bottom - itemRect.bottom) >= (numberOfItemsVisible * itemRect.height)
                    || (listRect.bottom - itemRect.bottom) <= -itemRect.height;

                if (itemIsOutOfRange) {
                    handleAutoScroll(list[selectedFocusIndex], selectedFocusIndex);
                } else if (isNextItemHidden) {
                    listRef.current.scrollTop = listRef.current.scrollTop + itemRect.height;
                }
                break;
            case 'top':
                listRef.current.scrollTop = 0;
                break;
            case 'bottom':
                listRef.current.scrollTop = listRect.bottom;
                break;
        }
    }

    function handleKeyDown(e: KeyboardEvent<HTMLUListElement>): void {
        // ' ' is the space bar key
        switch (e.key) {
            case 'Enter':
                e.preventDefault();

                if (selectedFocusIndex >= 0) {
                    const currentOption = list[selectedFocusIndex];

                    selectOption(currentOption);
                    currentOption.href && currentOption.anchorRef?.current?.click();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevOption = selectedFocusIndex === 0 ? list[list.length - 1] : list[selectedFocusIndex - 1];

                if (prevOption) {
                    setSelectedFocusIndex(prevOption.focusIndex);
                    selectedFocusIndex === 0 ? scrollIntoList('bottom') : scrollIntoList('up');

                    if (onFocusedValueChange) {
                        onFocusedValueChange(list[prevOption.focusIndex] ?
                            list[prevOption.focusIndex].label : undefined);
                    }
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                const nextOption = list.length === selectedFocusIndex + 1 ? list[0] : list[selectedFocusIndex + 1];

                if (nextOption) {
                    setSelectedFocusIndex(nextOption.focusIndex);
                    nextOption.focusIndex === 0 ? scrollIntoList('top') : scrollIntoList('down');

                    if (onFocusedValueChange) {
                        onFocusedValueChange(list[nextOption.focusIndex] ?
                            list[nextOption.focusIndex].label : undefined);
                    }
                }
                break;
        }

        if (onKeyDown) {
            onKeyDown(e);
        }
    }

    return (
        <List
            className={className}
            data-testid="menu-list"
            id={id}
            device={device}
            numberOfItemsVisible={numberOfItemsVisible}
            onBlur={() => setSelectedFocusIndex(-1)}
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyDown}
            tabIndex={0}
            ref={listRef}
            hidden={hidden}
        >
            {list.map(option => (
                <ListItem
                    key={option.id}
                    ref={option.ref}
                >
                    <ListItemLink
                        data-testid={`listitem-${option.value}`}
                        innerRef={option.anchorRef}
                        $device={device}
                        to={option.href}
                        $focused={isOptionFocused(option)}
                        $selected={isOptionSelected(option)}
                        onClick={() => selectOption(option)}
                        onMouseMove={() => setSelectedFocusIndex(option.focusIndex)}
                    >
                        {option.label || option.value}
                    </ListItemLink>
                </ListItem>
            ))}
        </List>
    );
});
