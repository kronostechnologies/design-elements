import {
    createRef,
    forwardRef,
    ForwardRefExoticComponent,
    KeyboardEvent,
    Ref,
    RefAttributes,
    RefObject,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
    useImperativeHandle,
} from 'react';
import styled from 'styled-components';
import { Theme } from '../../themes';

import { ListGroupLabel } from '../list-group-label/list-group-label';
import { getNextElementInArray, getPreviousElementInArray } from '../../utils/array';
import { v4 as uuid } from '../../utils/uuid';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';

type Value = string | string[];

export interface ListboxOption {
    disabled?: boolean;
    value: string;
    // Option label, if not provided will be set with value
    label?: string;
}

interface ListOption extends ListboxOption {
    id: string;
    focusIndex: number;
    ref: RefObject<HTMLLIElement>;
}

export interface ListboxGroup {
    label?: string;
    options: ListboxOption[];
}

interface ListboxProps {
    ariaLabelledBy?: string;
    id?: string;
    /**
     * { value: string; label?: string; }[]
     */
    options: ListboxOption[] | ListboxGroup[];
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
    onFocusedValueChange?(option?: ListboxOption): void;
}

interface ListItemProps {
    disabled?: boolean;
    isMobile: boolean;
    selected: boolean;
    focused: boolean;
    checkIndicator: boolean;
    theme: Theme;
}

interface BoxProps {
    isDropdown: boolean;
    isMobile: boolean;
    numberOfItemsVisible: number;
    groups: ListboxGroup[],
    onKeyPress?(e: KeyboardEvent<HTMLDivElement>): void;
    onKeyDown?(e: KeyboardEvent<HTMLDivElement>): void;
    onBlur?(): void;
}

const itemHeightDesktop = 32;
const itemHeightMobile = 40;

const separatorHeight = 17;
const separatorLabelHeight = 16.5;
function getListMaxHeight({ numberOfItemsVisible, groups, isMobile }: BoxProps): string | null {
    if (!numberOfItemsVisible) {
        return null;
    }

    let items = 0;
    const separatorsHeight = groups.reduce((total, group) => {
        const labelHeight = group.label ? separatorLabelHeight : 0;
        items += group.options.length;
        return items < numberOfItemsVisible ? total + separatorHeight + labelHeight : total + labelHeight;
    }, 0);

    return `${(numberOfItemsVisible * (isMobile ? itemHeightMobile : itemHeightDesktop)) + separatorsHeight}px`;
}

const Box = styled.div<BoxProps>`
    border-radius: var(--border-radius);
    box-shadow: 0 0 0 1px ${({ theme }) => theme.greys.grey}, 0 10px 20px 0 rgba(0 0 0 / 19%);
    display: flex;
    flex-direction: column;
    max-height: ${getListMaxHeight};
    overflow-y: auto;
    position: ${(props) => (props.isDropdown ? 'absolute' : 'unset')};
    width: ${(props) => (props.isDropdown ? '100%' : 'unset')};

    &:focus {
        box-shadow: ${({ theme }) => theme.tokens['focus-border-box-shadow']}, 0 10px 20px 0 rgba(0 0 0 / 19%);
        outline: none;
    }
`;

const ListGroup = styled.ul`
    background-color: ${({ theme }) => theme.greys.white};
    list-style-type: none;
    margin: 0;
    min-width: fit-content;
    padding: 0;
    width: 100%;

    &:not(:last-child)::after {
        border-bottom: solid 1px ${({ theme }) => theme.greys.grey};
        content: "";
        display: block;
        margin: var(--spacing-base);
        position: relative;
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

function getListItemBackgroundColor({ disabled, focused, theme }: ListItemProps): string {
    if (disabled) {
        return theme.greys.white;
    }
    if (focused) {
        return theme.greys.grey;
    }
    return 'inherit';
}

function isListOption(options: ListboxOption[] | ListboxGroup[]): options is ListboxOption[] {
    return 'value' in options[0];
}

const ListItem = styled.li<ListItemProps>`
    align-items: center;
    background-color: ${getListItemBackgroundColor};
    color: ${({ disabled, theme }) => (disabled ? theme.greys['mid-grey'] : theme.greys.black)};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
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

export const Listbox: ForwardRefExoticComponent<ListboxProps & RefAttributes<HTMLDivElement>> = forwardRef(({
    ariaLabelledBy,
    id: providedId,
    options,
    onChange,
    onFocusedValueChange,
    onKeyDown,
    checkIndicator = false,
    className,
    defaultValue,
    dropdown = false,
    multiselect = false,
    numberOfItemsVisible = 4,
    autofocus = false,
    focusedValue,
    value,
}, ref: Ref<HTMLDivElement>) => {
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const { isMobile } = useDeviceContext();
    const [listRef, setListRef] = useState<HTMLDivElement>();
    const [groups] = useState<ListboxGroup[]>(() => (
        isListOption(options) ? [{ options }] : options
    ));
    const [selectedOptionValue, setSelectedOptionValue] = useState(toArray(value || defaultValue));
    const listRefCallback = useCallback((node: HTMLDivElement) => setListRef(node), []);
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => listRef || null);
    const list: ListOption[] = useMemo((): ListOption[] => {
        const optionMapper = (option: ListboxOption, index: number): ListOption => ({
            ...option,
            id: `${id}_${option.value}`,
            focusIndex: index,
            ref: createRef<HTMLLIElement>(),
        });

        if (isListOption(options)) {
            return options.map((option, index) => optionMapper(option, index));
        }

        let listOptions: ListOption[] = [];
        let currentIndex = 0;
        options.forEach((group) => {
            listOptions = listOptions.concat(group.options.map(
                (option, index) => optionMapper(option, currentIndex + index),
            ));
            currentIndex += group.options.length;
        });

        return listOptions;
    }, [id, options]);

    const [selectedFocusIndex, setSelectedFocusIndex] = useState(() => (!multiselect
        ? list.findIndex((option) => option.value === selectedOptionValue[0])
        : -1));

    const setValue: (newValue: Value) => void = useCallback((newValue) => {
        setSelectedOptionValue(toArray(newValue));
        if (Array.isArray(newValue) && newValue.length === 0) {
            setSelectedFocusIndex(-1);
        } else if (list.length > 0 && !multiselect) {
            setSelectedFocusIndex(list.findIndex((option) => option.value === newValue[0]));
        }
    }, [list, multiselect]);

    useEffect(() => {
        if (value !== undefined) {
            setValue(value);
        }
    }, [setValue, value]);

    const handleAutoScroll: (option?: ListOption, focusedIndex?: number) => void = useCallback((
        option,
        focusedIndex,
    ) => {
        const itemRef: HTMLLIElement | null | undefined = option?.ref.current;
        if (!listRef || !option || !itemRef || focusedIndex === undefined) {
            return;
        }

        const listRect = listRef.getBoundingClientRect();
        const itemRect = itemRef.getBoundingClientRect();

        if (itemRef.offsetTop >= listRef.scrollTop + listRect.height) {
            listRef.scrollTop = (itemRect.height * (focusedIndex + 1)) - listRect.height + 64;
        } else if (listRect.top - itemRect.top >= 0) {
            const spaceDif = listRect.top - itemRect.top;
            const numberOfItemsToScroll = spaceDif / itemRect.height;

            listRef.scrollTop -= (itemRect.height * numberOfItemsToScroll);
        } else {
            listRef.scrollTop = itemRef.offsetTop;
        }
    }, [listRef]);

    useEffect(() => {
        if (focusedValue) {
            const focusedValueIndex = list.findIndex((option) => option.value === focusedValue);
            const currentOption = list[focusedValueIndex];
            setSelectedFocusIndex(focusedValueIndex);
            handleAutoScroll(currentOption, focusedValueIndex);
        } else {
            setSelectedFocusIndex(-1);
        }
    }, [focusedValue, list, handleAutoScroll]);

    useEffect(() => {
        if (autofocus && listRef) {
            listRef.focus();
        }

        if (selectedOptionValue && !multiselect) {
            const newSelectedFocusIndex = list.findIndex((option) => option.value === selectedOptionValue[0]);
            if (newSelectedFocusIndex !== -1) {
                setSelectedFocusIndex(newSelectedFocusIndex);
            }
        }
    }, [autofocus, multiselect, list, selectedOptionValue, listRef]);

    const isOptionSelected: (option: ListOption) => boolean = useCallback((option) => {
        if (multiselect) {
            return selectedOptionValue.includes(option.value);
        }
        return selectedOptionValue.length > 0 && selectedOptionValue[0] === option.value;
    }, [multiselect, selectedOptionValue]);

    const isOptionFocused: (option: ListOption) => boolean = useCallback((option) => (
        option.focusIndex === selectedFocusIndex
    ), [selectedFocusIndex]);

    const shouldDisplayCheckIndicator: (option: ListOption) => boolean = useCallback((option) => (
        checkIndicator && isOptionSelected(option)
    ), [checkIndicator, isOptionSelected]);

    const selectOption: (option: ListOption) => void = useCallback((option) => {
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

        onChange?.(option);
    }, [multiselect, onChange, selectedOptionValue]);

    const getGroupElements: (groupIndex: number) => ListOption[] = useCallback((groupIndex) => {
        const previousGroupLength = groupIndex > 0 ? groups[groupIndex - 1].options.length : 0;
        return list.slice(previousGroupLength, previousGroupLength + groups[groupIndex].options.length);
    }, [list, groups]);

    const getPrevSelectableOption = useCallback((focusIndex: number): ListOption | undefined => {
        const enabledItems: ListOption[] = list.filter((x) => !x.disabled);
        return getPreviousElementInArray(enabledItems, enabledItems.findIndex((x) => x.focusIndex === focusIndex));
    }, [list]);

    const getNextSelectableOption = useCallback((focusIndex: number): ListOption | undefined => {
        const enabledItems: ListOption[] = list.filter((x) => !x.disabled);
        return getNextElementInArray(enabledItems, enabledItems.findIndex((x) => x.focusIndex === focusIndex));
    }, [list]);

    const handleListItemClick: (option: ListOption) => () => void = useCallback(
        (option) => () => selectOption(option),
        [selectOption],
    );

    const handleListItemMouseMove: (option: ListOption) => void = useCallback((option) => {
        setSelectedFocusIndex(option.focusIndex);
    }, []);

    useLayoutEffect(() => {
        const currentOption = list[selectedFocusIndex];

        if (!listRef || !currentOption?.ref?.current) {
            return;
        }

        const listRect = listRef.getBoundingClientRect();
        const itemRect = currentOption.ref.current.getBoundingClientRect();
        const currentView = { from: listRect.y, to: listRect.y + listRect.height };
        const currentItem = { from: itemRect.y, to: itemRect.y + itemRect.height };

        let scrollDirection: 'up' | 'down' | null = null;
        if (currentItem.from >= currentView.from && currentItem.to <= currentView.to) {
            scrollDirection = null;
        } else if (currentItem.from <= currentView.from) {
            scrollDirection = 'up';
        } else if (currentItem.to >= currentView.to) {
            scrollDirection = 'down';
        }

        switch (scrollDirection) {
            case 'up': {
                handleAutoScroll(list[selectedFocusIndex], selectedFocusIndex);
                break;
            }
            case 'down': {
                handleAutoScroll(list[selectedFocusIndex], selectedFocusIndex);
                break;
            }
            case null: {
                break;
            }
        }
    }, [list, numberOfItemsVisible, selectedFocusIndex, handleAutoScroll, listRef]);

    useEffect(() => {
        const focusedValueIndex = list.findIndex((option) => option.value === focusedValue);
        if (focusedValueIndex !== -1 && listRef) {
            setSelectedFocusIndex(focusedValueIndex);
        }
    }, [list, focusedValue, listRef]);

    const handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void = useCallback((e) => {
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
                const prevOption = getPrevSelectableOption(selectedFocusIndex);

                if (prevOption) {
                    setSelectedFocusIndex(prevOption.focusIndex);

                    if (onFocusedValueChange) {
                        onFocusedValueChange(list[prevOption.focusIndex]);
                    }
                }
                break;
            }
            case 'ArrowDown': {
                e.preventDefault();
                const nextOption = getNextSelectableOption(selectedFocusIndex);

                if (nextOption) {
                    setSelectedFocusIndex(nextOption.focusIndex);

                    if (onFocusedValueChange) {
                        onFocusedValueChange(list[nextOption.focusIndex]);
                    }
                }
                break;
            }
        }

        onKeyDown?.(e);
    }, [
        list,
        onFocusedValueChange,
        onKeyDown,
        selectedFocusIndex,
        selectOption,
        getPrevSelectableOption,
        getNextSelectableOption,
    ]);

    function getAriaActiveDescendant(optionIndex: number): string | undefined {
        if (optionIndex >= 0 && list[optionIndex]) {
            return `${id}_${list[optionIndex].value}`;
        }
        return undefined;
    }

    return (
        <Box
            aria-activedescendant={getAriaActiveDescendant(selectedFocusIndex)}
            aria-labelledby={ariaLabelledBy}
            aria-multiselectable={multiselect}
            className={className}
            isDropdown={dropdown}
            isMobile={isMobile}
            numberOfItemsVisible={numberOfItemsVisible}
            ref={listRefCallback}
            role="listbox"
            tabIndex={0}
            groups={groups}
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyDown}
            onBlur={() => setSelectedFocusIndex(-1)}
        >
            {groups.map((group, index) => (
                <ListGroup
                    aria-labelledby={`group-${index}`}
                    data-testid="listbox-list"
                    role="group"
                >
                    {group.label && <ListGroupLabel isMobile={isMobile} label={group.label} />}
                    {getGroupElements(index).map((option) => (
                        <ListItem
                            aria-disabled={option.disabled}
                            aria-selected={isOptionSelected(option)}
                            checkIndicator={checkIndicator}
                            data-testid={`listitem-${option.value}`}
                            disabled={option.disabled}
                            focused={isOptionFocused(option)}
                            id={option.id}
                            isMobile={isMobile}
                            key={option.id}
                            onClick={!option.disabled ? handleListItemClick(option) : undefined}
                            onMouseMove={() => handleListItemMouseMove(option)}
                            ref={option.ref}
                            role="option"
                            selected={isOptionSelected(option)}
                        >
                            {shouldDisplayCheckIndicator(option) && (
                                <CheckIndicator data-testid="check-icon" name="check" size={isMobile ? '24' : '16'} />
                            )}
                            {option.label || option.value}
                        </ListItem>
                    ))}
                </ListGroup>
            ))}
        </Box>
    );
});

Listbox.displayName = 'Listbox';
