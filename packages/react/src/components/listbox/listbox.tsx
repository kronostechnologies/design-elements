import {
    forwardRef,
    ForwardRefExoticComponent,
    KeyboardEvent,
    Ref,
    RefAttributes,
    type RefObject,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import styled, { css } from 'styled-components';
import { useId } from '../../hooks/use-id';
import { useListCursor } from '../../hooks/use-list-cursor';
import { useScrollIntoView } from '../../hooks/use-scroll-into-view';
import { unique } from '../../utils/array';
import { IGNORE_CLICK_OUTSIDE } from '../../utils/component-classes';
import { focus } from '../../utils/css-state';
import { sanitizeId } from '../../utils/dom';
import { mergeRefs } from '../../utils/react-merge-refs';
import { useDeviceContext } from '../device-context-provider';
import { Icon } from '../icon';
import { findOptionsByValue } from './listbox-option';

type Value = string | string[];

export interface ListboxOption {
    disabled?: boolean;
    value: string;
    label?: string;
    caption?: string;
}

export interface ListboxProps {
    ariaLabelledBy?: string;
    id?: string;
    options: ListboxOption[];
    className?: string;
    containerRef?: RefObject<HTMLElement>;
    /**
     * The default selected option. You may specify an array of strings when using multiselect feature.
     */
    defaultValue?: Value;
    /**
     * Set to false to prevent the listbox from receiving focus
     * @default true
     */
    focusable?: boolean;
    /**
     * Set to true to enable keyboard navigation managed by the listbox
     * @default Same value as focusable
     */
    keyboardNav?: boolean;
    /**
     * Activates multiple selection feature
     * @default false
     */
    multiselect?: boolean;
    /**
     * Sets the current focused element in the listbox
     */
    focusedValue?: string;
    /**
     * Sets the selected value (controlled input)
     */
    value?: Value;

    /**
     * Callback function, invoked when an option is selected
     */
    onChange?(options: ListboxOption | ListboxOption[]): void;

    /**
     * Callback function, invoked when a key is pressed
     */
    onKeyDown?(event: KeyboardEvent): void;

    /**
     * Callback function, invoked when focused value changes
     */
    onFocusChange?(option?: ListboxOption): void;

    /**
     * Callback function, invoked when an option is clicked
     */
    onOptionClick?(option?: ListboxOption): void;
}

interface ContainerProps {
    $focusable: boolean;
}

interface ListItemProps {
    $disabled?: boolean;
    $isMobile: boolean;
    $selected: boolean;
    $focused: boolean;
    $multiselect: boolean;
}

const Container = styled.div<ContainerProps>`
    background-color: ${({ theme }) => theme.component['listbox-background-color']};
    border: 1px solid ${({ theme }) => theme.component['listbox-border-color']};
    border-radius: var(--border-radius);
    box-shadow: 0 10px 20px 0 ${({ theme }) => theme.component['listbox-box-shadow-depth-color']};
    display: flex;
    max-height: 160px;
    overflow-y: auto;
    padding: var(--spacing-half) 0;
    position: relative;
    z-index: 1000;

    ${({ $focusable }) => $focusable && focus};
`;

const List = styled.ul`
    height: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
`;

const CheckMarkIcon = styled(Icon).attrs({ name: 'check' })`
    color: ${({ theme }) => theme.component['checkbox-checked-icon-color']};
    height: 100%;
    width: 100%;
`;

const CustomCheckbox = styled.span<{ checked?: boolean, disabled?: boolean }>`
    align-items: center;
    background-color: ${({ disabled, theme }) => (disabled ? theme.component['checkbox-disabled-background-color'] : theme.component['checkbox-unchecked-background-color'])};
    border: 1px solid ${({ disabled, theme }) => (disabled ? theme.component['checkbox-disabled-border-color'] : theme.component['checkbox-unchecked-border-color'])};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    height: var(--size-1x);
    justify-content: center;
    margin-right: var(--spacing-1x);
    width: var(--size-1x);

    &:hover {
        background-color: ${({ disabled, theme }) => (disabled ? theme.component['checkbox-disabled-background-color'] : theme.component['checkbox-hover-background-color'])};
        border: 1px solid ${({ disabled, theme }) => (disabled ? theme.component['checkbox-disabled-border-color'] : theme.component['checkbox-hover-border-color'])};
    }

    ${({ checked }) => (!checked && css`
        > ${CheckMarkIcon} {
            display: none;
        }
    `)}
`;

const ListItem = styled.li<ListItemProps>`
    align-items: center;
    color: ${({ $disabled, theme }) => ($disabled ? theme.component['listbox-item-disabled-text-color'] : theme.component['listbox-item-text-color'])};
    display: flex;
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};
    font-weight: ${({ $selected }) => ($selected ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    line-height: var(--size-1halfx);
    min-height: var(--size-1halfx);
    padding: var(--spacing-half) var(--spacing-2x);
    position: relative;

    ${({ $isMobile }) => (!$isMobile && css`
        padding-right: var(--spacing-1x);
    `)}

    user-select: none;

    &:hover {
        background-color: ${({ theme, $disabled }) => ($disabled ? theme.component['listbox-item-disabled-background-color'] : theme.component['listbox-item-hover-background-color'])};
    }

    ${({ $focused, $disabled, theme }) => ($focused && css`
        outline: 2px solid ${$disabled ? 'transparent' : theme.component['focus-outside-border-color']};
        outline-offset: -2px;
    `)}

    ${({ $selected }) => ($selected && css`
        & ${CustomCheckbox} {
            background-color: ${({ theme }) => theme.component['checkbox-checked-background-color']};
            border: 1px solid ${({ theme }) => theme.component['checkbox-checked-border-color']};
        }
    `)}

    ${({ $selected, $multiselect }) => (!$multiselect && $selected && css`
        &::before {
            background-color: ${({ theme }) => theme.component['listbox-item-indicator-selected-color']};
            content: '';
            display: block;
            height: 100%;
            left: 0;
            position: absolute;
            width: 4px;
        }
    `)}
`;

const ListItemTextContainer = styled.span`
    display: flex;
    flex-direction: column;
`;

const ListItemCaption = styled.span<{ $disabled?: boolean, $isMobile: boolean }>`
    color: ${({ $disabled, theme }) => ($disabled ? theme.component['listbox-item-subcontent-disabled-text-color'] : theme.component['listbox-item-subcontent-text-color'])};
    display: block;
    font-size: ${({ $isMobile }) => ($isMobile ? '0.875rem' : '0.75rem')};
`;

const optionPredicate: (option: ListboxOption) => boolean = (option) => !option.disabled;

export interface ListboxRef extends HTMLDivElement {
    focusFirstOption(): void;

    focusLastOption(): void;
}

export const Listbox: ForwardRefExoticComponent<ListboxProps & RefAttributes<ListboxRef>> = forwardRef(({
    ariaLabelledBy,
    id: providedId,
    className,
    containerRef: providedContainerRef,
    defaultValue,
    focusable = true,
    focusedValue,
    keyboardNav = focusable,
    multiselect = false,
    options,
    onChange,
    onFocusChange,
    onKeyDown,
    onOptionClick,
    value,
}, ref: Ref<ListboxRef>) => {
    const id = useId(providedId);
    const { isMobile } = useDeviceContext();

    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

    const {
        selectedElement: focusedOption,
        setSelectedElement: setFocusedOption,
        selectPrevious: focusPreviousOption,
        selectNext: focusNextOption,
        selectFirst: focusFirstOption,
        selectLast: focusLastOption,
    } = useListCursor({
        elements: options,
        initialElement: findOptionsByValue(options, focusedValue)[0],
        predicate: optionPredicate,
    });

    const [selectedOptions, setSelectedOptions] = useState<ListboxOption[]>(
        () => findOptionsByValue(options, value ?? defaultValue),
    );

    const focusFirstSelectedOrFirst = useCallback(() => {
        const firstSelected: ListboxOption = selectedOptions[0];
        if (firstSelected) {
            setFocusedOption(firstSelected);
        } else {
            focusFirstOption();
        }
    }, [focusFirstOption, selectedOptions, setFocusedOption]);

    useImperativeHandle<HTMLDivElement | null, ListboxRef | null>(
        ref,
        () => {
            if (containerRef.current === null) {
                return null;
            }
            return Object.assign(
                containerRef.current,
                {
                    focusFirstOption: () => {
                        containerRef?.current?.focus();
                    },
                    focusLastOption: () => {
                        containerRef?.current?.focus();
                        focusLastOption();
                    },
                },
            );
        },
        [focusLastOption, containerRef],
    );

    function isOptionSelected(option: ListboxOption): boolean {
        return multiselect ? selectedOptions.includes(option) : selectedOptions[0] === option;
    }

    function isOptionFocused(option: ListboxOption): boolean {
        return option === focusedOption;
    }

    function selectSingleOption(option: ListboxOption): void {
        if (!selectedOptions.includes(option)) {
            setSelectedOptions([option]);
            onChange?.(option);
        }
    }

    function selectMultipleOptions(optionList: ListboxOption[]): void {
        const newSelectedOptions = unique([...selectedOptions, ...optionList.filter(optionPredicate)]);
        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions);
    }

    function toggleOptionSelection(option: ListboxOption, forceSelected?: boolean): void {
        const newSelectedOptions = !selectedOptions.includes(option) || forceSelected
            ? unique([...selectedOptions, option])
            : selectedOptions.filter((opt) => opt !== option);

        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions);
    }

    function toggleAllOptions(): void {
        const enabledOptions = options.filter(optionPredicate);
        const newSelectedOptions = selectedOptions.length === enabledOptions.length ? [] : enabledOptions;

        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions);
    }

    const { scrollIntoView } = useScrollIntoView({
        container: containerRef,
        scrollingContainer: providedContainerRef || containerRef,
    });

    const scrollToOption: (
        option?: ListboxOption,
        forceAlignToTop?: boolean,
    ) => void = useCallback((option?: ListboxOption, forceAlignToTop = false) => {
        if (option) {
            const itemRef = itemRefs.current.get(option.value);

            if (itemRef) {
                scrollIntoView(itemRef, forceAlignToTop);
            }
        }
    }, [scrollIntoView]);

    useLayoutEffect(() => {
        if (focusedOption) {
            scrollToOption(focusedOption);
        }
    }, [focusedOption, options, scrollToOption]);

    useLayoutEffect(() => {
        const initialOption = findOptionsByValue(options, focusedValue ?? defaultValue);

        if (initialOption.length > 0) {
            scrollToOption(initialOption[0], true);
        }
    }, [defaultValue, focusedValue, scrollToOption, options]);

    const [previousFocusedValue, setPreviousFocusedValue] = useState<string | undefined>(focusedValue);

    if (focusedValue !== previousFocusedValue) {
        const targetOption = findOptionsByValue(options, focusedValue)[0];
        setFocusedOption(targetOption);
        setPreviousFocusedValue(focusedValue);
    }

    const [previousValue, setPreviousValue] = useState<Value | undefined>(value);

    if (value !== previousValue) {
        setSelectedOptions(findOptionsByValue(options, value));
        setPreviousValue(value);
    }

    // When the listbox gets the focus, the currently selected option gets the visual focus and
    // is scrolled into view. However, if the focus is obtained with a click, the list scrolls
    // before the click event is dispatched, causing it to have the wrong target. This issue is
    // solved by ignoring the initial visual focus / scroll with click events.
    let focusedWithMouseInteraction = false;

    function handleListItemMouseDown(): void {
        focusedWithMouseInteraction = true;
        document.addEventListener('mouseup', () => {
            focusedWithMouseInteraction = false;
        }, { once: true });
    }

    function handleListboxFocus(): void {
        if (focusable && !focusedOption && selectedOptions.length > 0 && !focusedWithMouseInteraction) {
            setFocusedOption(selectedOptions[0]);
        } else {
            focusFirstSelectedOrFirst();
        }
    }

    function handleListboxBlur(): void {
        setFocusedOption(undefined);
    }

    function handleListItemClick(option: ListboxOption): () => void {
        return () => {
            onOptionClick?.(option);

            if (optionPredicate(option)) {
                if (option !== focusedOption) {
                    setFocusedOption(option);
                    onFocusChange?.(option);
                }

                if (multiselect) {
                    toggleOptionSelection(option);
                } else {
                    selectSingleOption(option);
                }
            }
        };
    }

    function handleListboxKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
        let newFocusedOption: ListboxOption | undefined;

        switch (event.key) {
            case 'Enter':
                event.preventDefault();
                if (focusedOption) {
                    handleListItemClick(focusedOption)();
                }
                break;
            case ' ':
                event.preventDefault();
                if (multiselect && focusedOption) {
                    toggleOptionSelection(focusedOption);
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                newFocusedOption = focusPreviousOption();

                if (newFocusedOption) {
                    onFocusChange?.(newFocusedOption);

                    if (multiselect && event.shiftKey && focusedOption) {
                        toggleOptionSelection(newFocusedOption, true);
                    } else if (!multiselect) {
                        selectSingleOption(newFocusedOption);
                    }
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                newFocusedOption = focusNextOption();

                if (newFocusedOption) {
                    onFocusChange?.(newFocusedOption);

                    if (multiselect && event.shiftKey && focusedOption) {
                        toggleOptionSelection(newFocusedOption, true);
                    } else if (!multiselect) {
                        selectSingleOption(newFocusedOption);
                    }
                }
                break;
            case 'Home':
                event.preventDefault();
                newFocusedOption = focusFirstOption();

                if (newFocusedOption) {
                    onFocusChange?.(newFocusedOption);

                    if (multiselect && event.shiftKey && (event.ctrlKey || event.metaKey) && focusedOption) {
                        selectMultipleOptions(
                            options.slice(options.indexOf(newFocusedOption), options.indexOf(focusedOption) + 1),
                        );
                    } else if (!multiselect) {
                        selectSingleOption(newFocusedOption);
                    }
                }
                break;
            case 'End':
                event.preventDefault();
                newFocusedOption = focusLastOption();

                if (newFocusedOption) {
                    onFocusChange?.(newFocusedOption);

                    if (multiselect && event.shiftKey && (event.ctrlKey || event.metaKey) && focusedOption) {
                        selectMultipleOptions(
                            options.slice(options.indexOf(focusedOption), options.indexOf(newFocusedOption) + 1),
                        );
                    } else if (!multiselect) {
                        selectSingleOption(newFocusedOption);
                    }
                }
                break;
            case 'a':
                if (multiselect && (event.ctrlKey || event.metaKey)) {
                    event.preventDefault();
                    toggleAllOptions();
                }
                break;
        }

        onKeyDown?.(event);
    }

    const containerClassNames = [className, IGNORE_CLICK_OUTSIDE].filter(Boolean).join(' ');

    return (
        <Container
            aria-activedescendant={focusedOption ? sanitizeId(`${id}_${focusedOption.value}`) : undefined}
            aria-labelledby={ariaLabelledBy}
            aria-multiselectable={multiselect ? 'true' : undefined}
            className={containerClassNames}
            data-testid="listbox-container"
            $focusable={focusable}
            id={id}
            onBlur={handleListboxBlur}
            onFocus={handleListboxFocus}
            onKeyDown={keyboardNav ? handleListboxKeyDown : undefined}
            onMouseDown={!focusable ? (event) => event.preventDefault() : undefined}
            ref={mergeRefs(ref, containerRef)}
            role="listbox"
            tabIndex={focusable || keyboardNav ? 0 : -1}
        >
            <List
                data-testid="listbox-list"
                role="presentation"
            >
                {options.map((option) => (
                    <ListItem
                        aria-disabled={option.disabled}
                        aria-selected={isOptionSelected(option) ? 'true' : undefined}
                        className={IGNORE_CLICK_OUTSIDE}
                        data-testid={sanitizeId(`listitem-${option.value}`)}
                        $disabled={option.disabled}
                        $focused={isOptionFocused(option)}
                        id={sanitizeId(`${id}_${option.value}`)}
                        $isMobile={isMobile}
                        key={option.value}
                        onClick={handleListItemClick(option)}
                        onMouseDown={handleListItemMouseDown}
                        ref={(node) => {
                            const map = itemRefs.current;
                            if (node) {
                                map.set(option.value, node);
                            } else {
                                map.delete(option.value);
                            }
                        }}
                        role="option"
                        $selected={isOptionSelected(option)}
                        $multiselect={multiselect}
                    >
                        {multiselect ? (
                            <CustomCheckbox
                                aria-hidden="true"
                                disabled={option.disabled}
                                checked={isOptionSelected(option)}
                            >
                                <CheckMarkIcon />
                            </CustomCheckbox>
                        ) : null}
                        <ListItemTextContainer className={IGNORE_CLICK_OUTSIDE}>
                            {option.label || option.value}
                            {option.caption && (
                                <ListItemCaption
                                    className={IGNORE_CLICK_OUTSIDE}
                                    $disabled={option.disabled}
                                    $isMobile={isMobile}
                                >
                                    {option.caption}
                                </ListItemCaption>
                            )}
                        </ListItemTextContainer>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
});

Listbox.displayName = 'Listbox';
