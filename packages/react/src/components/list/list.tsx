import React, { KeyboardEvent, ReactElement, useEffect, useRef, useState } from 'react';

import Check from 'feather-icons/dist/icons/check.svg';
import styled from 'styled-components';

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
     * Number of visible items in the list before overflow
     * @default 4
     */
    numberOfItemsVisible?: number;
    /**
     * OnChange callback function, invoked when an option is selected
     */
    onChange?(option: Option): void;
}

interface WrapperProps {
    numberOfItemsVisible: number;
}

interface ItemProps {
    selected: boolean;
    focused: boolean;
    checkIndicator: boolean;
}

const itemHeight = 32;

const Wrapper = styled.ul<WrapperProps>`
    background-color: #fff;
    list-style-type: none;
    margin: 0;
    max-height: ${({ numberOfItemsVisible }) => numberOfItemsVisible * itemHeight}px;
    min-width: 200px;
    overflow-y: auto;
    padding: 0;
    width: 100%;
`;

const Item = styled.li<ItemProps>`
    background-color: ${({ focused }) => focused ? '#d9dde2' : 'inherit'};
    color: #000;
    cursor: pointer;
    font-size: 0.875rem;
    height: ${itemHeight}px;
    line-height: ${itemHeight}px;
    overflow: hidden;
    padding: 0 ${({ checkIndicator, selected }) => (checkIndicator ? (selected ? 0 : 28) : 16)}px;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover,
    &:focus {
        background-color: #d9dde2;
    }
`;

const CheckIndicator = styled(Check)`
    color: #637282;
    height: 12px;
    padding: 0 var(--spacing-1x);
    width: 12px;
`;

export function List({
    options,
    onChange,
    checkIndicator = false,
    defaultValue,
    numberOfItemsVisible = 4,
    autofocus = false,
}: ListProps): ReactElement {
    const listRef = useRef<HTMLUListElement>(null);

    const defaultSelectedIndex = options.findIndex(option => option.value === defaultValue);
    const [selectedOptionId, setSelectedOptionId] = useState(
        defaultValue ? `${defaultValue}-${defaultSelectedIndex}` : undefined,
    );

    const [selectedFocusIndex, setSelectedFocusIndex] = useState(defaultValue ? defaultSelectedIndex : -1);

    const list: ListOption[] | [] =
        options.map((option, index)  =>
            ({ ...option, id: `${option.value}`, focusIndex: index, ref: React.createRef<HTMLLIElement>() }));

    function isOptionSelected(option: ListOption): boolean {
        return selectedOptionId ? option.id === selectedOptionId : false;
    }

    function isOptionFocused(option: ListOption): boolean {
        return option.focusIndex === selectedFocusIndex;
    }

    function shouldDisplayCheckIndicator(option: ListOption): boolean {
        return checkIndicator && isOptionSelected(option);
    }

    function selectOption(option: ListOption): void {
        const { id, focusIndex, value, label } = option;

        setSelectedOptionId(id);
        setSelectedFocusIndex(focusIndex);

        if (onChange) {
            onChange({ value, label });
        }
    }

    function handleSelect(option: ListOption): () => void {
        return () => selectOption(option);
    }

    function scrollIntoList(direction: 'up' | 'down'): void {
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

                const prevOption = list[selectedFocusIndex - 1];

                if (prevOption) {
                    setSelectedFocusIndex(prevOption.focusIndex);
                    scrollIntoList('up');
                }
                break;
            case 'ArrowDown':
                e.preventDefault();

                const nextOption = list[selectedFocusIndex + 1];

                if (nextOption) {
                    setSelectedFocusIndex(nextOption.focusIndex);
                    scrollIntoList('down');
                }
                break;
        }
    }

    useEffect(() => {
        if (autofocus && listRef.current) {
            listRef.current.focus();
        }
        setSelectedFocusIndex(selectedOptionId ? options.findIndex(option => option.value === selectedOptionId) : -1);
    }, [autofocus, options.length]);

    return (
        <Wrapper
            role="listbox"
            tabIndex={0}
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
                    onClick={handleSelect(option)}
                    selected={isOptionSelected(option)}
                    focused={isOptionFocused(option)}
                    checkIndicator={checkIndicator}
                >
                    <>
                        {shouldDisplayCheckIndicator(option) && <CheckIndicator />}
                        {option.label || option.value}
                    </>
                </Item>
            ))}
        </Wrapper>
    );
}
