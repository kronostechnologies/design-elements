import React, { forwardRef, KeyboardEvent, ReactElement, Ref, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled, { css } from 'styled-components';
import uuid from 'uuid/v4';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';

type Value = string | string[];

export interface Option {
    href?: string;
    // Option label, if not provided will be set with value
    label?: string;
    value: string;
    onSelect?(option?: Option): void;
}

interface ListboxOption extends Option {
    id: string;
    focusIndex: number;
    ref: RefObject<HTMLLIElement>;
    anchorRef?: RefObject<HTMLAnchorElement>;
}

export interface ListboxProps {
    ariaLabelledBy?: string;
    id?: string;
    /**
     * { value: string; label?: string; }[]
     */
    options: Option[];
    /**
     * Autofocus
     * @default false
     */
    autofocus?: boolean;
    /**
     * Display check indicator on the selected option
     * @default false
     */
    checkIndicator?: boolean;
    className?: string;
    /**
     * The default selected option. You may specify an array of strings when using multiselect feature.
     */
    defaultValue?: Value;
    /**
     * Add this if its used as a dropdown (Adds absolute positioning)
     * @default false
     */
    dropdown?: boolean;
    /** Sets menu accessibility attributes */
    menu?: boolean;
    /**
     * Activates mutliple selection feature
     * @default false
     */
    multiselect?: boolean;
    /**
     * Number of visible items in the listbox before overflow
     * @default 4
     */
    numberOfItemsVisible?: number;
    /**
     * Sets the current focused element in the listbox
     */
    focusedValue?: string;
    /**
     * Sets the selected value (controlled input)
     */
    value?: Value;
    /**
     * @default true
     */
    visible?: boolean;
    /**
     * onChange callback function, invoked when an option is selected
     */
    onChange?(option: Option): void;
    /**
     * onKeyDown callback function, invoked when a key is pressed
     */
    onKeyDown?(event: KeyboardEvent): void;
    /**
     * onFocusedValueChange callback function, invoked when focused value changes
     */
    onFocusedValueChange?(value: string | undefined): void;
}

interface ListProps {
    isMobile: boolean;
    numberOfItemsVisible: number;
}

interface ListItemProps {
    isMobile: boolean;
    selected: boolean;
    focused: boolean;
    checkIndicator: boolean;
}

interface BoxProps {
    visible: boolean;
    isDropdown: boolean;
}

const itemHeightDesktop = 32;
const itemHeightMobile = 40;

const Box = styled.div<BoxProps>`
    display: ${props => props.visible ? 'flex' : 'none'};
    position: ${props => props.isDropdown ? 'absolute' : 'unset'};
    width: ${props => props.isDropdown ? '100%' : 'unset'};
`;

const List = styled.ul<ListProps>`
    background-color: ${({ theme }) => theme.greys.white};
    border-radius: var(--border-radius);
    box-shadow: 0 0 0 1px ${({ theme }) => theme.greys['dark-grey']}, 0 10px 20px 0 rgba(0, 0, 0, 0.19);
    list-style-type: none;
    margin: 0;
    max-height: ${({ numberOfItemsVisible, isMobile }) => numberOfItemsVisible * (isMobile ? itemHeightMobile : itemHeightDesktop)}px;
    overflow-y: auto;
    padding: 0;
    width: 100%;

    &:focus {
        box-shadow: ${({ theme }) => theme.tokens['focus-border-box-shadow']}, 0 10px 20px 0 rgba(0, 0, 0, 0.19);
        outline: none;
    }
`;

const getListItemSidePadding = ({ checkIndicator, selected, isMobile }: ListItemProps): string => {
    if (checkIndicator) {
        if (selected) {
            return '0';
        } else if (isMobile) {
            return 'var(--spacing-5x)';
        }
        return 'var(--spacing-4x)';
    }
    return 'var(--spacing-2x)';
};

const ellipsisStyles = css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ListItem = styled.li<ListItemProps>`
    align-items: center;
    background-color: ${({ focused, theme }) => focused ? theme.greys.grey : 'inherit'};
    color: ${({ theme }) => theme.greys.black};
    cursor: pointer;
    display: flex;
    font-size: ${({ isMobile }) => isMobile ? '1rem' : '0.875rem'};
    font-weight: ${({ selected }) => selected ? 'var(--font-semi-bold)' : 'var(--font-normal)'};
    height: ${({ isMobile }) => isMobile ? itemHeightMobile : itemHeightDesktop}px;
    line-height: ${({ isMobile }) => isMobile ? itemHeightMobile : itemHeightDesktop}px;
    min-width: 0;
    padding: 0 ${({ isMobile }) => isMobile ? 'var(--spacing-2x)' : 'var(--spacing-1x)'} 0 ${getListItemSidePadding};

    > span {
        ${ellipsisStyles}
    }

    &:focus {
        outline: none;
    }

    :active {
        background-color: ${({ theme }) => theme.greys.grey};
    }
`;

const ListItemLink = styled(Link)<LinkProps>`
    color: ${({ theme }) => theme.greys.black};
    ${ellipsisStyles}
    text-decoration: none;

    &:focus {
        outline: none;
    }
`;

const CheckIndicator = styled(Icon)`
    color: ${({ theme }) => theme.greys['dark-grey']};
    flex-shrink: 0;
    padding: 0 var(--spacing-1x);
`;

export const Listbox = forwardRef(({
    ariaLabelledBy,
    className,
    id = useMemo(uuid, []),
    options,
    onChange,
    onFocusedValueChange,
    onKeyDown,
    checkIndicator = false,
    defaultValue,
    dropdown = false,
    menu,
    multiselect = false,
    numberOfItemsVisible = 4,
    autofocus = false,
    focusedValue,
    value,
    visible = true,
}: ListboxProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const listRef = useRef<HTMLUListElement>(null);
    const [selectedOptionValue, setSelectedOptionValue] = useState(toArray(defaultValue));
    const [selectedFocusIndex, setSelectedFocusIndex] =
        useState(() => !multiselect ? options.findIndex(option =>  option.value === selectedOptionValue[0]) : -1);
    const list: ListboxOption[] = useMemo((): ListboxOption[] =>
        options.map((option, index)  =>
            ({
                ...option,
                id: `${id}_${option.value}`,
                focusIndex: index,
                ref: React.createRef<HTMLLIElement>(),
                anchorRef: option.href ? React.createRef<HTMLAnchorElement>() : undefined,
            }))
    , [options]);

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

        if (selectedOptionValue && !multiselect) {
            setSelectedFocusIndex(options.findIndex(option => option.value === selectedOptionValue[0]));
        }
    }, [autofocus]);

    function isOptionSelected(option: ListboxOption): boolean {
        if (multiselect) {
            return selectedOptionValue.includes(option.value);
        } else {
            return selectedOptionValue.length > 0 && selectedOptionValue[0] === option.value;
        }
    }

    function isOptionFocused(option: ListboxOption): boolean {
        return option.focusIndex === selectedFocusIndex;
    }

    function shouldDisplayCheckIndicator(option: ListboxOption): boolean {
        return checkIndicator && isOptionSelected(option);
    }

    function setValue(newValue: Value): void {
        setSelectedOptionValue(toArray(newValue));
        if (newValue === []) {
            setSelectedFocusIndex(-1);
        } else if (list.length > 0 && !multiselect) {
            setSelectedFocusIndex(options.findIndex(option => option.value === newValue[0]));
        }
    }

    function selectOption(option: ListboxOption): void {
        setSelectedFocusIndex(option.focusIndex);

        if (multiselect) {
            if (selectedOptionValue.includes(option.value)) {
                setSelectedOptionValue(selectedOptionValue.filter(opt => opt !== option.value));
            } else {
                setSelectedOptionValue([...selectedOptionValue, option.value]);
            }
        } else {
            setSelectedOptionValue([option.value]);
        }

        if (onChange) {
            onChange(option);
        }
    }

    function handleListItemClick(option: ListboxOption): void {
        selectOption(option);

        if (option.onSelect) {
            option.onSelect(option);
        }
    }

    function handleListItemMouseMove(option: ListboxOption): void {
        setSelectedFocusIndex(option.focusIndex);
    }

    function handleAutoScroll(option: ListboxOption, focusedIndex: number): void {
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

                    handleListItemClick(currentOption);
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
        <Box
            aria-activedescendant={list[selectedFocusIndex]?.id}
            aria-labelledby={ariaLabelledBy}
            aria-multiselectable={multiselect}
            className={className}
            isDropdown={dropdown}
            ref={ref}
            role="listbox"
            tabIndex={-1}
            visible={visible}
        >
            <List
                data-testid="listbox-list"
                id={id}
                isMobile={isMobile}
                numberOfItemsVisible={numberOfItemsVisible}
                onBlur={() => setSelectedFocusIndex(-1)}
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyDown}
                tabIndex={0}
                ref={listRef}
                role={menu ? 'menu' : 'presentation'}
            >
                {list.map(option => (
                    <ListItem
                        aria-label={option.label || option.value}
                        aria-selected={isOptionSelected(option)}
                        checkIndicator={checkIndicator}
                        data-testid={`listitem-${option.value}`}
                        focused={isOptionFocused(option)}
                        id={option.id}
                        isMobile={isMobile}
                        key={option.id}
                        onClick={() => handleListItemClick(option)}
                        onMouseMove={() => handleListItemMouseMove(option)}
                        ref={option.ref}
                        role={option.href ? undefined : (menu ? 'menuitem' : 'option')}
                        selected={isOptionSelected(option)}
                    >
                        {shouldDisplayCheckIndicator(option) &&
                            <CheckIndicator data-testid="check-icon" name="check" size={isMobile ? '24' : '16'}/>}
                        {option.href ? (
                            <ListItemLink
                                innerRef={option.anchorRef}
                                role={menu ? 'menuitem' : 'option'}
                                to={option.href}
                            >
                                {option.label || option.value}
                            </ListItemLink>
                        ) : <span>{option.label || option.value}</span>}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
});

function toArray(val?: Value): string[] {
    if (!val) {
        return [];
    }

    if (Array.isArray(val)) {
        return val;
    }

    return [val];
}
