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
import styled from 'styled-components';
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
    padding: 0;
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

const ListItem = styled.li<ListItemProps>`
    align-items: center;
    color: ${({ disabled, theme }) => (disabled ? theme.greys['mid-grey'] : theme.greys.black)};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    display: flex;
    font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.875rem')};
    font-weight: ${({ selected }) => (selected ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    height: ${({ isMobile }) => (isMobile ? itemHeightMobile : itemHeightDesktop)}rem;
    line-height: ${({ isMobile }) => (isMobile ? itemHeightMobile : itemHeightDesktop)}rem;
    //padding: 4px ${({ isMobile }) => (isMobile ? 16 : 8)}px 4px ${getListItemSidePadding};
    padding: 0 ${({ isMobile }) => (isMobile ? 16 : 8)}px 0 ${getListItemSidePadding};
    position: relative;
    white-space: nowrap;

    &:hover {
        background-color: ${({ theme }) => theme.greys.grey};
    }

    &.focused:not(:hover) {
        border: 2px solid ${({ theme }) => theme.main['primary-1.1']};
        outline: none;
    }

     /* Tooltip styles */
    &.ellipsis-text {
        span {
            background-color: #60666E; 
            border-radius: 4px;
            color: #fff; 
            display: none; 
            font-size: 12px;
            left: 6%;
            line-height: 20px;
            padding: 1px 8px 2px 8px; 
            position: fixed;
            top: -20px; 
            white-space: nowrap;
            z-index: 1000;

            &::after {
                border-top: 12px solid #60666E;
                border-right: 9px solid transparent;
                border-left: 9px solid transparent;
                content: "";
                left: 40%;
                margin-left: 14.6px;
                position: absolute;
                bottom: -16px;
                transform: translate(0, -50%);
            }
        }

        &:hover span,
        &:hover span {
            display: block;
        }
       

       /*&::before {
            content: attr(data-full-text); 
            position: absolute;
        }

        &::after {
            border-top: 8px solid transparent;
            border-right: 8px solid #60666E;
            border-bottom: 8px solid transparent;
            display: none;
            content: "";
            left: 47%;
            margin-left: 14.6px;
            position: absolute;
            top: 20px;
            transform: translate(0, -50%);
        }

        &:hover::before,
        &:hover::after {
            display: block;
        }*/
    }
`;

const ListItemWrapper = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
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

    const shouldDisplayCheckIndicator: (option: ListOption) => boolean = useCallback(
        (option) => checkIndicator && isOptionSelected(option),
        [checkIndicator, isOptionSelected],
    );

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
            const prevItemRef = list[selectedFocusIndex]?.ref;
            if (prevItemRef && prevItemRef.current) {
                prevItemRef.current.classList.remove('focused');
            }
            selectOption(option);
        },
        [list, selectedFocusIndex, selectOption],
    );

    const handleListItemMouseMove: (option: ListOption) => void = useCallback((option) => {
        const prevFocusIndex = selectedFocusIndex;
        setSelectedFocusIndex(option.focusIndex);

        const prevItemRef = list[prevFocusIndex]?.ref;
        if (prevItemRef && prevItemRef.current) {
            prevItemRef.current.classList.remove('focused');
        }
    }, [list, selectedFocusIndex]);

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

    const [containerWidth, setContainerWidth] = useState(0);

    useLayoutEffect(() => {
        const updateContainerWidth = () => {
            const itemRefs = list.map((option) => option.ref);
            const itemWidths = itemRefs
                .filter((ref) => ref.current) // Filter out null refs
                .map((ref) => ref.current?.clientWidth || 0); // Get clientWidth of each item
    
            // Calculate the maximum width of the list items
            const containerWidth = Math.max(...itemWidths);
    
            setContainerWidth(containerWidth);
        };
    
        // Call the function once to initialize containerWidth
        updateContainerWidth();
    
        // Attach a resize event listener to update containerWidth on window resize
        window.addEventListener('resize', updateContainerWidth);
    
        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', updateContainerWidth);
        };
    }, [list]);

    const handleKeyDown: (e: KeyboardEvent<HTMLUListElement>) => void = useCallback((e) => {
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

                    const prevItemRef = list[selectedFocusIndex]?.ref;
                    if (prevItemRef && prevItemRef.current) {
                        prevItemRef.current.classList.remove('focused');
                    }

                    const newItemRef = list[prevOption.focusIndex]?.ref;
                    if (prevOption.focusIndex >= 0 && newItemRef && newItemRef.current) {
                        newItemRef.current.classList.add('focused');
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

                    const prevItemRef = list[selectedFocusIndex]?.ref;
                    if (prevItemRef && prevItemRef.current) {
                        prevItemRef.current.classList.remove('focused');
                    }

                    const newItemRef = list[nextOption.focusIndex]?.ref;
                    if (nextOption.focusIndex >= 0 && newItemRef && newItemRef.current) {
                        newItemRef.current.classList.add('focused');
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

    function shouldHaveEllipsis(containerWidth: number, textWidth: number) {
        return textWidth > containerWidth;
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
                {list.map((option) => {
                    let textWidth = 0;

                    if (option.ref.current) {
                        const listItemWrapper = option.ref.current.firstChild as HTMLElement;
                        textWidth = listItemWrapper.getBoundingClientRect().width + option.ref.current.getBoundingClientRect().left;
                    }

                    // Determine if the item should have ellipsis
                    const ellipsis = shouldHaveEllipsis(containerWidth, textWidth);
                    
                    return (
                        <ListItem
                            data-full-text={option.label || option.value}
                            className={ellipsis ? 'ellipsis-text' : ''}
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
                        >
                            {shouldDisplayCheckIndicator(option) && (
                                <CheckIndicator data-testid="check-icon" name="check" size={isMobile ? '24' : '16'} />
                            )}
                            <ListItemWrapper>
                                {option.label || option.value}
                                <span>{option.label || option.value}</span>
                            </ListItemWrapper>
                           
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    );
});

Listbox.displayName = 'Listbox';
