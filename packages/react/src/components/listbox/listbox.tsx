import React, {
    forwardRef,
    KeyboardEvent,
    ReactElement,
    Ref,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';

type Value = string | string[];

export interface ListboxOption {
    value: string;
    // Option label, if not provided will be set with value
    label?: string;
}

interface ListOption extends ListboxOption {
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
    options: ListboxOption[];
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
     * The default selected option. You may specify an array of strings when using multiselect feature.
     */
    defaultValue?: Value;
    /**
     * Add this if its used as a dropdown (Adds absolute positioning)
     * @default false
     */
    dropdown?: boolean;
    /**
     * Activates multiple selection feature
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
    onChange?(option: ListboxOption): void;
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
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    position: ${(props) => (props.isDropdown ? 'absolute' : 'unset')};
    width: ${(props) => (props.isDropdown ? '100%' : 'unset')};
`;

const List = styled.ul<ListProps>`
    background-color: ${({ theme }) => theme.greys.white};
    border-radius: var(--border-radius);
    box-shadow: 0 0 0 1px ${({ theme }) => theme.greys.grey}, 0 10px 20px 0 rgba(0, 0, 0, 0.19);
    list-style-type: none;
    margin: 0;
    max-height: ${({ numberOfItemsVisible, isMobile }) => numberOfItemsVisible * (isMobile
        ? itemHeightMobile
        : itemHeightDesktop)}px;
    min-width: fit-content;
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
        }
        if (isMobile) {
            return 'var(--spacing-5x)';
        }
        return 'var(--spacing-4x)';
    }
    return 'var(--spacing-2x)';
};

const ListItem = styled.li<ListItemProps>`
    align-items: center;
    background-color: ${({ focused, theme }) => (focused ? theme.greys.grey : 'inherit')};
    color: ${({ theme }) => theme.greys.black};
    cursor: pointer;
    display: flex;
    font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.875rem')};
    font-weight: ${({ selected }) => (selected ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    height: ${({ isMobile }) => (isMobile ? itemHeightMobile : itemHeightDesktop)}px;
    line-height: ${({ isMobile }) => (isMobile ? itemHeightMobile : itemHeightDesktop)}px;
    overflow: hidden;
    padding: 0 ${({ isMobile }) => (isMobile ? 16 : 8)}px 0 ${getListItemSidePadding};
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

function toArray(val?: Value): string[] {
    if (!val) {
        return [];
    }

    if (Array.isArray(val)) {
        return val;
    }

    return [val];
}

export const Listbox = forwardRef(({
    ariaLabelledBy,
    id: providedId,
    options,
    onChange,
    onFocusedValueChange,
    onKeyDown,
    checkIndicator = false,
    defaultValue,
    dropdown = false,
    multiselect = false,
    numberOfItemsVisible = 4,
    autofocus = false,
    focusedValue,
    value,
    visible = true,
}: ListboxProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const { isMobile } = useDeviceContext();
    const listRef = useRef<HTMLUListElement>(null);
    const [selectedOptionValue, setSelectedOptionValue] = useState(toArray(defaultValue));
    const [selectedFocusIndex, setSelectedFocusIndex] = useState(() => (!multiselect
        ? options.findIndex((option) => option.value === selectedOptionValue[0])
        : -1));
    const list: ListOption[] = useMemo((): ListOption[] => options.map(
        (option, index) => ({
            ...option,
            id: `${id}_${option.value}`,
            focusIndex: index,
            ref: React.createRef<HTMLLIElement>(),
        }),
    ), [id, options]);

    const setValue: (newValue: Value) => void = useCallback((newValue) => {
        setSelectedOptionValue(toArray(newValue));
        if (newValue === []) {
            setSelectedFocusIndex(-1);
        } else if (list.length > 0 && !multiselect) {
            setSelectedFocusIndex(options.findIndex((option) => option.value === newValue[0]));
        }
    }, [list.length, multiselect, options]);

    useEffect(() => {
        if (value !== undefined) {
            setValue(value);
        }
    }, [setValue, value]);

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

            listRef.current.scrollTop -= (itemRect.height * numberOfItemsToScroll);
        }
    }

    useEffect(() => {
        if (focusedValue) {
            const focusedValueIndex = options.findIndex((option) => option.value === focusedValue);
            const currentOption = list[focusedValueIndex];
            setSelectedFocusIndex(focusedValueIndex);
            handleAutoScroll(currentOption, focusedValueIndex);
        } else {
            setSelectedFocusIndex(-1);
        }
    }, [focusedValue, list, options]);

    useEffect(() => {
        if (autofocus && listRef.current) {
            listRef.current.focus();
            listRef.current.scrollTop = 0;
        }

        if (selectedOptionValue && !multiselect) {
            setSelectedFocusIndex(options.findIndex((option) => option.value === selectedOptionValue[0]));
        }
    }, [autofocus, multiselect, options, selectedOptionValue]);

    function isOptionSelected(option: ListOption): boolean {
        if (multiselect) {
            return selectedOptionValue.includes(option.value);
        }
        return selectedOptionValue.length > 0 && selectedOptionValue[0] === option.value;
    }

    function isOptionFocused(option: ListOption): boolean {
        return option.focusIndex === selectedFocusIndex;
    }

    function shouldDisplayCheckIndicator(option: ListOption): boolean {
        return checkIndicator && isOptionSelected(option);
    }

    function selectOption(option: ListOption): void {
        setSelectedFocusIndex(option.focusIndex);

        if (multiselect) {
            if (selectedOptionValue.includes(option.value)) {
                setSelectedOptionValue(selectedOptionValue.filter((opt) => opt !== option.value));
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

    function handleListItemClick(option: ListOption): () => void {
        return () => selectOption(option);
    }

    function handleListItemMouseMove(option: ListOption): void {
        setSelectedFocusIndex(option.focusIndex);
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
            case 'up': {
                const isPrevItemHidden = listRect.top - itemRect.top >= 0;
                itemIsOutOfRange = (listRect.top - itemRect.top) <= -(numberOfItemsVisible * itemRect.height)
                    || (listRect.top - itemRect.top) >= itemRect.height;

                if (itemIsOutOfRange) {
                    handleAutoScroll(list[selectedFocusIndex - 1], selectedFocusIndex - 1);
                } else if (isPrevItemHidden) {
                    listRef.current.scrollTop -= itemRect.height;
                }
                break;
            }
            case 'down': {
                const isNextItemHidden = listRect.bottom - itemRect.bottom <= 0;
                itemIsOutOfRange = (listRect.bottom - itemRect.bottom) >= (numberOfItemsVisible * itemRect.height)
                    || (listRect.bottom - itemRect.bottom) <= -itemRect.height;

                if (itemIsOutOfRange) {
                    handleAutoScroll(list[selectedFocusIndex], selectedFocusIndex);
                } else if (isNextItemHidden) {
                    listRef.current.scrollTop += itemRect.height;
                }
                break;
            }
            case 'top': {
                listRef.current.scrollTop = 0;
                break;
            }
            case 'bottom': {
                listRef.current.scrollTop = listRect.bottom;
                break;
            }
        }
    }

    function handleKeyDown(e: KeyboardEvent<HTMLUListElement>): void {
        // ' ' is the space bar key
        switch (e.key) {
            case 'Enter': {
                e.preventDefault();

                if (selectedFocusIndex >= 0) {
                    selectOption(list[selectedFocusIndex]);
                }
                break;
            }
            case 'ArrowUp': {
                e.preventDefault();
                const prevOption = selectedFocusIndex === 0 ? list[list.length - 1] : list[selectedFocusIndex - 1];

                if (prevOption) {
                    setSelectedFocusIndex(prevOption.focusIndex);
                    if (selectedFocusIndex === 0) {
                        scrollIntoList('bottom');
                    } else {
                        scrollIntoList('up');
                    }

                    if (onFocusedValueChange) {
                        onFocusedValueChange(list[prevOption.focusIndex]?.label);
                    }
                }
                break;
            }
            case 'ArrowDown': {
                e.preventDefault();
                const nextOption = list.length === selectedFocusIndex + 1 ? list[0] : list[selectedFocusIndex + 1];

                if (nextOption) {
                    setSelectedFocusIndex(nextOption.focusIndex);
                    if (nextOption.focusIndex === 0) {
                        scrollIntoList('top');
                    } else {
                        scrollIntoList('down');
                    }

                    if (onFocusedValueChange) {
                        onFocusedValueChange(list[nextOption.focusIndex]?.label);
                    }
                }
                break;
            }
        }

        if (onKeyDown) {
            onKeyDown(e);
        }
    }

    function getAriaActiveDescendant(optionIndex: number): string | undefined {
        if (optionIndex >= 0) {
            return `${id}_${list[optionIndex].value}`;
        }
        return undefined;
    }

    return (
        <Box
            aria-activedescendant={getAriaActiveDescendant(selectedFocusIndex)}
            aria-labelledby={ariaLabelledBy}
            aria-multiselectable={multiselect}
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
                ref={listRef}
                role="presentation"
                tabIndex={0}
            >
                {list.map((option) => (
                    <ListItem
                        aria-label={option.label || option.value}
                        aria-selected={isOptionSelected(option)}
                        checkIndicator={checkIndicator}
                        data-testid={`listitem-${option.value}`}
                        focused={isOptionFocused(option)}
                        id={option.id}
                        isMobile={isMobile}
                        key={option.id}
                        onClick={handleListItemClick(option)}
                        onMouseMove={() => handleListItemMouseMove(option)}
                        ref={option.ref}
                        role="option"
                        selected={isOptionSelected(option)}
                    >
                        {shouldDisplayCheckIndicator(option)
                        && <CheckIndicator data-testid="check-icon" name="check" size={isMobile ? '24' : '16'} />}
                        {option.label || option.value}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
});
