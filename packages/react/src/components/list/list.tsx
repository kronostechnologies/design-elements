import React, { KeyboardEvent, ReactElement, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import uuid from 'uuid/v4';
import { Icon } from '../icon/icon';

type DeviceType = 'mobile' | 'desktop';

export interface Option {
    value: string;
    // Option label, if not provided will be set with value
    label?: string;
}

interface ListOption extends Option {
    id: string;
    focusIndex: number;
    ref: React.RefObject<HTMLLIElement>;
}

interface ListProps {
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
    /**
     * The default selected option
     */
    defaultValue?: string;
    /**
     * Applies styles and sizes according to the device
     * @default desktop
     */
    device?: DeviceType;
    /**
     * Number of visible items in the list before overflow
     * @default 4
     */
    numberOfItemsVisible?: number;
    /**
     * Sets the current focused element in the list
     */
    focusedValue?: string;
    /**
     * Sets the selected value (controlled input)
     */
    value?: string;
    /**
     * onChange callback function, invoked when an option is selected
     */
    onChange?(option: Option): void;
    /**
     * onKeyDown callback function, invoked when a key is pressed
     */
    onKeyDown?(event: KeyboardEvent): void;
}

interface WrapperProps {
    device: DeviceType;
    numberOfItemsVisible: number;
}

interface ItemProps {
    device: DeviceType;
    selected: boolean;
    focused: boolean;
    checkIndicator: boolean;
}

const itemHeightDesktop = 32;
const itemHeightMobile = 40;

const Wrapper = styled.ul<WrapperProps>`
    background-color: ${({ theme }) => theme.greys.white};
    list-style-type: none;
    margin: 0;
    max-height: ${({ numberOfItemsVisible, device }) => numberOfItemsVisible * (device === 'mobile' ? itemHeightMobile : itemHeightDesktop)}px;
    min-width: 200px;
    overflow-y: auto;
    padding: 0;
    width: 100%;
`;

const getItemSidePadding = ({ checkIndicator, selected, device }: ItemProps): string => {
    if (checkIndicator) {
        if (selected) {
            return '0';
        } else if (device === 'mobile') {
            return '40px';
        }
        return '34px';
    }
    return '16px';
};

const Item = styled.li<ItemProps>`
    align-items: center;
    background-color: ${({ focused, theme }) => focused ? theme.greys.grey : 'inherit'};
    color: ${({ theme }) => theme.greys.black};
    cursor: pointer;
    display: flex;
    font-size: ${({ device }) => device === 'mobile' ? '1rem' : '0.875rem'};
    height: ${({ device }) => device === 'mobile' ? itemHeightMobile : itemHeightDesktop}px;
    line-height: ${({ device }) => device === 'mobile' ? itemHeightMobile : itemHeightDesktop}px;
    overflow: hidden;
    padding: 0 ${getItemSidePadding};
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.greys.grey};
    }
`;

const CheckIndicator = styled(Icon)`
    color: ${({ theme }) => theme.greys['dark-grey']};
    padding: 0 var(--spacing-1x);
`;

export function List({
    id = uuid(),
    options,
    onChange,
    onKeyDown,
    checkIndicator = false,
    defaultValue,
    device = 'desktop',
    numberOfItemsVisible = 4,
    autofocus = false,
    focusedValue,
    value,
}: ListProps): ReactElement {
    const listRef = useRef<HTMLUListElement>(null);
    const defaultSelectedIndex = options.findIndex(option => option.value === defaultValue);
    const [selectedFocusIndex, setSelectedFocusIndex] = useState(value || defaultValue ? defaultSelectedIndex : -1);
    const [selectedOptionId, setSelectedOptionId] = useState(
        defaultValue ? `${id}_${defaultValue}` : undefined,
    );
    const list: ListOption[] = useMemo((): ListOption[] =>
        options.map((option, index)  =>
            ({
                ...option,
                id: `${id}_${option.value}`,
                focusIndex: index,
                ref: React.createRef<HTMLLIElement>(),
            }))
    , [options]);

    useEffect(() => {
        if (value && list.length > 0) {
            const newValue = list.find(option => option.value === value);
            newValue && setValue(newValue);
        } else if (value === '') {
            setSelectedOptionId('');
            setSelectedFocusIndex(-1);
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
        setSelectedFocusIndex(selectedOptionId ? options.findIndex(option => option.value === selectedOptionId) : -1);
    }, [autofocus]);

    function isOptionSelected(option: ListOption): boolean {
        return selectedOptionId ? option.id === selectedOptionId : false;
    }

    function isOptionFocused(option: ListOption): boolean {
        return option.focusIndex === selectedFocusIndex;
    }

    function shouldDisplayCheckIndicator(option: ListOption): boolean {
        return checkIndicator && isOptionSelected(option);
    }

    function setValue(option: ListOption): void {
        const optionIndex = options.findIndex(element => element.value === option.value);
        setSelectedOptionId(`${id}_${option.value}`);
        setSelectedFocusIndex(optionIndex);
    }

    function selectOption(option: ListOption): void {
        setSelectedOptionId(option.id);
        setSelectedFocusIndex(option.focusIndex);

        if (onChange) {
            onChange(option);
        }
    }

    function handleSelect(option: ListOption): () => void {
        return () => selectOption(option);
    }

    function handleAutoScroll(option: ListOption, focusedIndex: number): void {
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

        if (!listRef.current || !currentOption || !currentOption.ref.current) {
            return;
        }

        const listRect = listRef.current.getBoundingClientRect();
        const itemRect = currentOption.ref.current.getBoundingClientRect();

        switch (direction) {
            case 'up':
                const isPrevItemHidden = listRect.top - itemRect.top >= 0;

                if (isPrevItemHidden) {
                    listRef.current.scrollTop = listRef.current.scrollTop - itemRect.height;
                }
                break;
            case 'down':
                const isNextItemHidden = listRect.bottom - itemRect.bottom <= 0;

                if (isNextItemHidden) {
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
            case ' ':
                e.preventDefault();

                if (selectedFocusIndex >= 0) {
                    selectOption(list[selectedFocusIndex]);
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevOption = selectedFocusIndex === 0 ? list[list.length - 1] : list[selectedFocusIndex - 1];

                if (prevOption) {
                    setSelectedFocusIndex(prevOption.focusIndex);
                    selectedFocusIndex === 0 ? scrollIntoList('bottom') : scrollIntoList('up');
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                const nextOption = list.length === selectedFocusIndex + 1 ? list[0] : list[selectedFocusIndex + 1];

                if (nextOption) {
                    setSelectedFocusIndex(nextOption.focusIndex);
                    nextOption.focusIndex === 0 ? scrollIntoList('top') : scrollIntoList('down');
                }
                break;
        }
        if (onKeyDown) {
            onKeyDown(e);
        }
    }

    return (
        <Wrapper
            role="listbox"
            device={device}
            tabIndex={0}
            id={id}
            ref={listRef}
            onKeyPress={handleKeyDown}
            numberOfItemsVisible={numberOfItemsVisible}
            aria-activedescendant={selectedOptionId}
            aria-labelledby={selectedOptionId}
            onKeyDown={handleKeyDown}
        >
            {list.map(option => (
                <Item
                    key={option.id}
                    ref={option.ref}
                    role="option"
                    id={option.id}
                    aria-label={option.label || option.value}
                    aria-selected={isOptionSelected(option)}
                    device={device}
                    onClick={handleSelect(option)}
                    selected={isOptionSelected(option)}
                    focused={isOptionFocused(option)}
                    checkIndicator={checkIndicator}
                >
                    <>
                        {shouldDisplayCheckIndicator(option) &&
                            <CheckIndicator name="check" size={device === 'mobile' ? '24' : '18'}/>}
                        {option.label || option.value}
                    </>
                </Item>
            ))}
        </Wrapper>
    );
}
