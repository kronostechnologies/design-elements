import { focus } from '@design-elements/utils/css-state';
import React, { forwardRef, KeyboardEvent, ReactElement, Ref, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';

export interface Option {
    value: string;
    // Option label, if not provided will be set with value
    label?: string;
}

interface ListboxOption extends Option {
    id: string;
    focusIndex: number;
    ref: React.RefObject<HTMLLIElement>;
}

interface ListboxProps {
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
    /**
     * The default selected option
     */
    defaultValue?: string;
    /**
     * Add this if its used as a dropdown (Adds absolute positioning)
     * @default false
     */
    dropdown?: boolean;
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
    value?: string;
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
    hasFocusedOption: boolean;
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
    list-style-type: none;
    margin: 0;
    max-height: ${({ numberOfItemsVisible, isMobile }) => numberOfItemsVisible * (isMobile ? itemHeightMobile : itemHeightDesktop)}px;
    min-width: fit-content;
    ${focus}
    overflow-y: auto;
    padding: 0;
    width: 100%;

    &:focus {
        box-shadow: ${({ hasFocusedOption, theme }) => hasFocusedOption ? '0 10px 20px 0 rgba(0, 0, 0, 0.19)' : `${theme.tokens['focus-box-shadow']}, 0 10px 20px 0 rgba(0, 0, 0, 0.19)`};
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
    overflow: hidden;
    padding: 0 ${({ isMobile }) => isMobile ? 16 : 8}px 0 ${getListItemSidePadding};
    text-overflow: ellipsis;
    white-space: nowrap;

    &:focus {
        outline: none;
    }
`;

const CheckIndicator = styled(Icon)`
    color: ${({ theme }) => theme.greys['dark-grey']};
    padding: 0 var(--spacing-1x);
`;

export const Listbox = forwardRef(({
    ariaLabelledBy,
    id = uuid(),
    options,
    onChange,
    onFocusedValueChange,
    onKeyDown,
    checkIndicator = false,
    defaultValue,
    dropdown = false,
    numberOfItemsVisible = 4,
    autofocus = false,
    focusedValue,
    value,
    visible = true,
}: ListboxProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const listRef = useRef<HTMLUListElement>(null);
    const defaultSelectedIndex = options.findIndex(option => option.value === defaultValue);
    const [selectedFocusIndex, setSelectedFocusIndex] = useState(value || defaultValue ? defaultSelectedIndex : -1);
    const [selectedOptionId, setSelectedOptionId] = useState(
        defaultValue ? `${id}_${defaultValue}` : undefined,
    );
    const list: ListboxOption[] = useMemo((): ListboxOption[] =>
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

    function isOptionSelected(option: ListboxOption): boolean {
        return selectedOptionId ? option.id === selectedOptionId : false;
    }

    function isOptionFocused(option: ListboxOption): boolean {
        return option.focusIndex === selectedFocusIndex;
    }

    function shouldDisplayCheckIndicator(option: ListboxOption): boolean {
        return checkIndicator && isOptionSelected(option);
    }

    function setValue(option: ListboxOption): void {
        const optionIndex = options.findIndex(element => element.value === option.value);
        setSelectedOptionId(`${id}_${option.value}`);
        setSelectedFocusIndex(optionIndex);
    }

    function selectOption(option: ListboxOption): void {
        setSelectedOptionId(option.id);
        setSelectedFocusIndex(option.focusIndex);

        if (onChange) {
            onChange(option);
        }
    }

    function handleListItemClick(option: ListboxOption): () => void {
        return () => selectOption(option);
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

    function handleBlur(): void {
        setSelectedFocusIndex(-1);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLUListElement>): void {
        // ' ' is the space bar key
        switch (e.key) {
            case 'Enter':
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
            visible={visible}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={selectedOptionId}
            aria-labelledby={ariaLabelledBy || selectedOptionId}
            isDropdown={dropdown}
            ref={ref}
        >
            <List
                hasFocusedOption={selectedFocusIndex >= 0}
                role="presentation"
                isMobile={isMobile}
                tabIndex={0}
                id={id}
                ref={listRef}
                numberOfItemsVisible={numberOfItemsVisible}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyDown}
            >
                {list.map(option => (
                    <ListItem
                        key={option.id}
                        ref={option.ref}
                        role="option"
                        id={option.id}
                        aria-label={option.label || option.value}
                        aria-selected={isOptionSelected(option)}
                        isMobile={isMobile}
                        onClick={handleListItemClick(option)}
                        onMouseMove={() => handleListItemMouseMove(option)}
                        selected={isOptionSelected(option)}
                        focused={isOptionFocused(option)}
                        checkIndicator={checkIndicator}
                    >
                        <>
                            {shouldDisplayCheckIndicator(option) &&
                                <CheckIndicator name="check" size={isMobile ? '24' : '16'}/>}
                            {option.label || option.value}
                        </>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
});
