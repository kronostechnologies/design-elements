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
} from 'react';
import styled, { css } from 'styled-components';
import { Theme } from '../../themes';
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

interface ListProps {
    isMobile: boolean;
    numberOfItemsVisible: number;
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
}

const itemHeightDesktop = 2;
const itemHeightMobile = 2.5;

const Box = styled.div<BoxProps>`
    display: flex;
    position: ${(props) => (props.isDropdown ? 'absolute' : 'unset')};
    width: ${(props) => (props.isDropdown ? '100%' : 'unset')};
`;

function getListMaxHeight({ numberOfItemsVisible, isMobile }: ListProps): number {
    return numberOfItemsVisible * (isMobile ? itemHeightMobile : itemHeightDesktop);
}

const List = styled.ul<ListProps>`
    background-color: ${({ theme }) => theme.greys.white};
    border-radius: var(--border-radius);
    box-shadow: 0 0 0 1px ${({ theme }) => theme.greys.grey}, 0 10px 20px 0 rgb(0 0 0 / 19%);
    list-style-type: none;
    margin: 0;
    max-height: ${getListMaxHeight}rem;
    overflow-y: auto;
    padding: 4px 0;
    position: relative;
    width: 100%;
    z-index: 1000;

    &:focus {
        box-shadow: ${({ theme }) => theme.tokens['focus-border-box-shadow']}, 0 10px 20px 0 rgb(0 0 0 / 19%);
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

const checkboxWidth = 'var(--size-1x)';

const iconStyles = css`
    color: ${({ theme }) => theme.greys.white};
    display: none;
    height: 100%;
    left: 0;
    position: absolute;
    width: 100%;
`;

const CheckMarkIcon = styled(Icon).attrs({ name: 'check' })`
    ${iconStyles}
`;

const CustomCheckbox = styled.span<{ disabled?: boolean }>`
    align-self: center;
    background-color: ${({ disabled, theme }) => (disabled ? theme.greys['light-grey'] : theme.greys.white)};
    border: 1px solid ${({ disabled, theme }) => (disabled ? theme.greys.grey : theme.greys['dark-grey'])};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    display: inline-block;
    height: var(--size-1x);
    left: 0;
    margin-right: var(--spacing-1x);
    position: relative;
    width: ${checkboxWidth};

    &:hover {
        border: 1px solid ${({ disabled, theme }) => (disabled ? theme.greys.grey : theme.main['primary-1.1'])};
    }
`;

const ListItem = styled.li<ListItemProps>`
    align-items: center;
    color: ${({ disabled, theme }) => (disabled ? theme.greys['mid-grey'] : theme.greys.black)};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    display: flex;
    font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.875rem')};
    font-weight: ${({ selected }) => (selected ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    line-height: ${({ isMobile }) => (isMobile ? 1.5 : 1.72)};
    padding: ${({ isMobile }) => (isMobile ? 4 : 4)}px ${({ isMobile }) => (isMobile ? 16 : 8)}px ${({ isMobile }) => (isMobile ? 4 : 4)}px ${getListItemSidePadding};
    padding-left: ${({ checkIndicator }) => (checkIndicator && '16px')};
    &:hover {
        background-color: ${({ theme }) => theme.greys.grey};
    }

    &:focus:not(:hover) {
        outline: 2px solid ${({ theme }) => theme.main['primary-1.1']};
        outline-offset: -2px;
    }

    &[aria-selected='true'] ${CustomCheckbox} {
        background-color: ${({ theme }) => theme.main['primary-1.1']};
        border: 1px solid ${({ theme }) => theme.main['primary-1.1']};

        > ${CheckMarkIcon} {
            display: block;
        }
    }
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
    const [listRef, setListRef] = useState<HTMLUListElement>();
    const listRefCallback = useCallback((node: HTMLUListElement) => setListRef(node), []);
    const [selectedOptionValue, setSelectedOptionValue] = useState(toArray(value || defaultValue));
    const [selectedFocusIndex, setSelectedFocusIndex] = useState(() => (!multiselect
        ? options.findIndex((option) => option.value === selectedOptionValue[0])
        : -1));

    const list: ListOption[] = useMemo((): ListOption[] => options.map(
        (option, index) => ({
            ...option,
            id: `${id}_${option.value}`,
            focusIndex: index,
            ref: createRef<HTMLLIElement>(),
        }),
    ), [id, options]);

    const setValue: (newValue: Value) => void = useCallback((newValue) => {
        setSelectedOptionValue(toArray(newValue));
        if (Array.isArray(newValue) && newValue.length === 0) {
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
            listRef.scrollTop = (itemRect.height * (focusedIndex + 1)) - listRect.height;
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
            const focusedValueIndex = options.findIndex((option) => option.value === focusedValue);
            const currentOption = list[focusedValueIndex];
            setSelectedFocusIndex(focusedValueIndex);
            handleAutoScroll(currentOption, focusedValueIndex);
        } else {
            setSelectedFocusIndex(-1);
        }
    }, [focusedValue, list, options, handleAutoScroll]);

    useEffect(() => {
        if (autofocus && listRef) {
            listRef.focus();
        }

        if (selectedOptionValue && !multiselect) {
            const newSelectedFocusIndex = options.findIndex((option) => option.value === selectedOptionValue[0]);
            if (newSelectedFocusIndex !== -1) {
                setSelectedFocusIndex(newSelectedFocusIndex);
            }
        }
    }, [autofocus, multiselect, options, selectedOptionValue, listRef]);

    const isOptionSelected: (option: ListOption) => boolean = useCallback((option) => {
        if (multiselect) {
            return selectedOptionValue.includes(option.value);
        }
        return selectedOptionValue.length > 0 && selectedOptionValue[0] === option.value;
    }, [multiselect, selectedOptionValue]);

    const isOptionFocused: (option: ListOption) => boolean = useCallback(
        (option) => option.focusIndex === selectedFocusIndex,
        [selectedFocusIndex],
    );

    /* const shouldDisplayCheckIndicator: (option: ListOption) => boolean = useCallback(
        (option) => checkIndicator && isOptionSelected(option),
        [checkIndicator, isOptionSelected],
    ); */

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

    const getPrevSelectableOption = useCallback((focusIndex: number): ListOption | undefined => {
        const enabledItems: ListOption[] = list.filter((x) => !x.disabled);
        return getPreviousElementInArray(enabledItems, enabledItems.findIndex((x) => x.focusIndex === focusIndex));
    }, [list]);

    const getNextSelectableOption = useCallback((focusIndex: number): ListOption | undefined => {
        const enabledItems: ListOption[] = list.filter((x) => !x.disabled);
        return getNextElementInArray(enabledItems, enabledItems.findIndex((x) => x.focusIndex === focusIndex));
    }, [list]);

    const handleListItemClick: (option: ListOption) => () => void = useCallback(
        (option) => () => {
            selectOption(option);
        },
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
        const focusedValueIndex = options.findIndex((option) => option.value === focusedValue);
        if (focusedValueIndex !== -1 && listRef) {
            setSelectedFocusIndex(focusedValueIndex);
        }
    }, [options, focusedValue, listRef]);

    const handleKeyDown: (e: KeyboardEvent<HTMLUListElement>) => void = useCallback((e) => {
        switch (e.key) {
            case ' ': {
                e.preventDefault();

                /* const listItem = e.target as HTMLLIElement;
                    const option = list.find((item) => item.id === listItem.id);
                    if (option && option.focusIndex < 0 ) {
                        console.log("not selected",selectedFocusIndex, listItem, option);
                        selectOption(option);

                    }else{
                        console.log("selected",selectedFocusIndex, listItem, option)
                } */

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

                    const prevItem = list[prevOption.focusIndex];
                    if (!multiselect) { selectOption(prevItem); }
                    prevItem.ref.current?.focus();
                }

                break;
            }
            case 'ArrowDown': {
                e.preventDefault();

                if (document.activeElement instanceof HTMLUListElement) {
                    list[selectedFocusIndex].ref.current?.focus();
                } else {
                    const nextOption = getNextSelectableOption(selectedFocusIndex);

                    if (nextOption) {
                        setSelectedFocusIndex(nextOption.focusIndex);
                        if (onFocusedValueChange) {
                            onFocusedValueChange(list[nextOption.focusIndex]);
                        }

                        const nextItem = list[nextOption.focusIndex];
                        if (!multiselect) { selectOption(nextItem); }
                        nextItem.ref.current?.focus();
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
        multiselect,
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
            ref={ref}
            role="listbox"
            tabIndex={-1}
        >
            <List
                data-testid="listbox-list"
                id={id}
                isMobile={isMobile}
                numberOfItemsVisible={numberOfItemsVisible}
                onBlur={() => {
                    const prevItemRef = list[selectedFocusIndex]?.ref;
                    if (prevItemRef && prevItemRef.current) {
                        prevItemRef.current.classList.remove('focused');
                    }
                    setSelectedFocusIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyDown}
                ref={listRefCallback}
                role="presentation"
                tabIndex={0}
            >
                {list.map((option) => (
                    <ListItem
                        aria-disabled={option.disabled}
                        aria-label={option.label || option.value}
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
                        tabIndex={-1}
                    >
                        {checkIndicator ? (
                            <CustomCheckbox disabled={option.disabled} aria-hidden="true">
                                <CheckMarkIcon />
                            </CustomCheckbox>
                        ) : null}
                        {option.label || option.value}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
});

Listbox.displayName = 'Listbox';
