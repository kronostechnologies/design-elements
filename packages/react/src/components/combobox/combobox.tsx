/* eslint-disable react/jsx-props-no-spreading */
import {
    ChangeEvent,
    type FC,
    FocusEvent,
    KeyboardEvent,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useShadowRoot } from 'react-shadow';
import styled from 'styled-components';
import { useAriaConditionalIds } from '../../hooks/use-aria-conditional-ids';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useDropdown } from '../../hooks/use-dropdown';
import { useId } from '../../hooks/use-id';
import { useListCursor } from '../../hooks/use-list-cursor';
import { useListSelect } from '../../hooks/use-list-select';
import { useTranslation } from '../../i18n/use-translation';
import { type ResolvedTheme } from '../../themes';
import { focus } from '../../utils/css-state';
import { getRootElement, sanitizeId } from '../../utils/dom';
import { stripDiacritics } from '../../utils/string';
import { IconButton } from '../buttons';
import { useDeviceContext } from '../device-context-provider';
import { FieldContainer } from '../field-container';
import { Listbox, ListboxOption } from '../listbox';
import { ListboxTag, TagValue } from '../listbox/listbox-tag';
import { type ToggletipProps } from '../toggletip';
import { type TooltipProps } from '../tooltip';
import {
    addUniqueOption, createCustomOption,
    findOptionsByValue,
    getDefaultOptions,
    getJoinedValues,
    getSelectedOptionValues,
    getValueAsString,
    getValueAsStringArray,
    isOptionEnabled,
    isOptionSelected, optionsAreEqual,
    removeOption,
} from '../listbox/utils';

type Value = string | string[];

export type ComboboxOption = ListboxOption;

interface StyledListboxProps {
    $left?: string;
    $top?: string;
}

interface TagInputContainerProps {
    disabled?: boolean;
    $isMobile: boolean;
    $readOnly?: boolean;
    theme: ResolvedTheme;
    $valid: boolean;
}

interface TextboxProps {
    disabled?: boolean;
    $isMobile: boolean;
    $readOnly?: boolean;
    theme: ResolvedTheme;
    $valid: boolean;
    value: Value;
}

interface MultiSelectInputProps extends TextboxProps {
    $readOnly?: boolean;
    $hasTags?: boolean;
}

function getBackgroundColor({ disabled, $readOnly, theme }: TextboxProps | TagInputContainerProps): string {
    if ($readOnly) {
        return theme.component['combobox-readonly-background-color'];
    }

    if (disabled) {
        return theme.component['combobox-disabled-background-color'];
    }

    return theme.component['combobox-background-color'];
}

function getBorderColor({
    disabled, $readOnly, theme, $valid,
}: TextboxProps | TagInputContainerProps): string {
    if ($readOnly) {
        return theme.component['combobox-readonly-border-color'];
    }

    if (disabled) {
        return theme.component['combobox-disabled-border-color'];
    }

    if (!$valid) {
        return theme.component['combobox-error-border-color'];
    }

    return theme.component['combobox-border-color'];
}

function getTextColor({ disabled, $readOnly, theme }: TextboxProps | TagInputContainerProps): string {
    if ($readOnly) {
        return theme.component['combobox-readonly-text-color'];
    }

    if (disabled) {
        return theme.component['combobox-disabled-text-color'];
    }

    return theme.component['combobox-text-color'];
}

const StyledFieldContainer = styled(FieldContainer)`
    position: relative;
`;

const StyledContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;
`;

const StyledListbox = styled(Listbox)<StyledListboxProps>`
    left: ${(props) => props.$left};
    min-width: 0;
    position: absolute;
    top: ${(props) => props.$top};
    width: 100%;
    z-index: 99998;
`;

const ArrowButton = styled(IconButton)<{ disabled?: boolean, $readOnly?: boolean }>`
    align-items: center;
    background-color: ${({ theme }) => theme.component['combobox-arrow-button-background-color']};
    border: 0;
    color: ${({ disabled, $readOnly, theme }) => theme.component[`combobox-arrow-button${(disabled || $readOnly) ? '-disabled' : ''}-icon-color`]};
    display: ${({ $readOnly }) => ($readOnly ? 'none' : 'flex')};
    height: var(--size-1x);
    padding: var(--spacing-half);
    position: absolute;
    right: 0;
    width: var(--size-1x);

    &:hover {
        background-color: ${({ theme }) => theme.component['combobox-arrow-button-hover-background-color']};
    }
`;

const ClearButton = styled(IconButton)<{ disabled?: boolean, $readOnly?: boolean }>`
    align-items: center;
    background-color: transparent;
    border: 0;
    color: ${({ disabled, $readOnly, theme }) => ((disabled || $readOnly) ? theme.component['combobox-clear-button-disabled-icon-color'] : theme.component['combobox-clear-button-icon-color'])};
    display: ${({ $readOnly }) => ($readOnly ? 'none' : 'flex')};
    height: var(--size-1x);
    padding: var(--spacing-half);
    position: absolute;
    right: var(--spacing-3halfx);
    width: var(--size-1x);

    &::after {
        border-right: ${({ theme }) => `1px solid ${theme.component['combobox-clear-button-border-right-color']}`};
        content: '';
        height: var(--size-1x);
        margin-left: var(--spacing-1x);
    }

    &:hover {
        background-color: transparent;
    }
`;

const BaseInput = styled.input<TextboxProps>`
    background-color: ${getBackgroundColor};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${getTextColor};
    font-family: inherit;
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};
`;

const Textbox = styled(BaseInput)<TextboxProps>`
    border: 1px solid ${getBorderColor} !important;
    height: ${({ $isMobile }) => ($isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
    padding: 0 var(--spacing-1x);
    width: 100%;

    ${({ theme }) => focus({ theme }, { focusType: 'focus' })};

    &::placeholder {
        color: ${({ theme }) => theme.component['combobox-placeholder-text-color']};
        font-style: italic;
    }
`;

const MultiSelectInput = styled(BaseInput)<MultiSelectInputProps>`
    align-self: flex-start;
    background: transparent;
    border: none;
    flex: 1 1 0;
    height: auto;
    min-height: 30px;
    min-width: 0;
    outline: none;
    padding: 0 ${({ $hasTags }) => ($hasTags ? 'var(--spacing-quarter)' : 'var(--spacing-1x)')};
`;

const TagInputContainer = styled.div<TagInputContainerProps>`
    align-items: flex-start;
    background-color: ${getBackgroundColor};
    border: 1px solid ${getBorderColor};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${getTextColor};
    display: flex;
    flex-wrap: wrap;
    font-family: inherit;
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};
    min-height: 30px;
    padding-right: var(--spacing-2halfx);
    width: 100%;

    ${({ disabled, theme }) => !disabled && focus({ theme }, { focusType: 'focus-within' })};
`;

export interface ComboboxProps {
    /**
     * If true, the input can have a value not included in the list of options
     */
    allowCustomValue?: boolean;
    /**
     * Aria label for the input (used when no visual label is present)
     */
    ariaLabel?: string;
    /**
     * If true, when the input value matches an option, that option is automatically selected
     */
    autoSelectMatchingOption?: boolean;
    className?: string;
    /**
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * The default value and selected option
     */
    defaultValue?: Value;
    /**
     * Disables the input
     */
    disabled?: boolean;
    /**
     * If true, the options won't be filtered.
     * Use when the list of options is filtered externally.
     * @default false
     */
    disableListFiltering?: boolean;
    /**
     * Text to display in the listbox when no options match the input value.
     * Used only when a custom value is not allowed.
     */
    emptyListMessage?: string;
    /**
     * Disables the default margin
     */
    noMargin?: boolean;
    id?: string;
    /**
     * @default false
     */
    inlineAutoComplete?: boolean;
    isLoading?: boolean;
    label?: string;
    /**
     * If true, multiple options can be selected and displayed as tags
     */
    multiselect?: boolean;
    name?: string;
    options: ComboboxOption[];
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    tooltip?: TooltipProps;
    toggletip?: ToggletipProps;
    /**
     * Sets input validity
     */
    valid?: boolean;
    /**
     * Sets error message
     * @default You must select an option
     */
    validationErrorMessage?: string;
    /**
     * Sets the selected value (makes the component controlled)
     */
    value?: Value;
    hint?: string;

    /**
     * OnChange callback function, invoked when value/options change
     */
    onChange?(value: string | ComboboxOption | ComboboxOption[]): void;

    onInputChange?(value: string): void;
}

export const Combobox: FC<ComboboxProps> = ({
    allowCustomValue = false,
    autoSelectMatchingOption = false,
    ariaLabel,
    className,
    defaultOpen = false,
    defaultValue,
    disabled,
    disableListFiltering,
    emptyListMessage,
    noMargin,
    id: providedId,
    inlineAutoComplete = false,
    isLoading = false,
    label,
    multiselect,
    onChange,
    onInputChange,
    options,
    placeholder,
    name,
    readOnly,
    required,
    tooltip,
    toggletip,
    valid = true,
    validationErrorMessage,
    value,
    hint,
    ...otherProps
}) => {
    const { t } = useTranslation('combobox');
    const { isMobile } = useDeviceContext();
    const id = useId(providedId);
    const dataAttributes = useDataAttributes(otherProps);

    const [showAllOptions, setShowAllOptions] = useState(defaultOpen);
    const arrowButtonRef = useRef<HTMLButtonElement>(null);
    const clearButtonRef = useRef<HTMLButtonElement>(null);

    const shadowRoot = useShadowRoot();
    const [open, setOpen] = useState(defaultOpen);
    const {
        x,
        y,
        update,
        refs: { reference: floatingReferenceRef, floating: listboxRef, ...refs },
    } = useDropdown<HTMLInputElement>({ open, width: 'reference' });
    const rootElement = getRootElement(shadowRoot) as HTMLElement;

    let inputRef = useRef<HTMLInputElement>(null);
    if (!multiselect) {
        inputRef = floatingReferenceRef;
    }

    const findOptionByLabelOrValue = useCallback(
        (searchValue?: string): ComboboxOption | undefined => options.find((option: ComboboxOption) => {
            const lowerCaseSearch = searchValue?.toLowerCase();
            return option.label?.toLowerCase() === lowerCaseSearch || option.value.toLowerCase() === lowerCaseSearch;
        }),
        [options],
    );

    const getInputValueFromOption = useCallback(
        (option: ComboboxOption | undefined): string => option?.label ?? option?.value ?? '',
        [],
    );

    function getInitialInputValue(): string {
        if (multiselect) {
            return '';
        }

        if (
            allowCustomValue
            && defaultValue
            && findOptionsByValue(options, defaultValue).length === 0
        ) {
            return getValueAsString(defaultValue);
        }

        const foundOptions = findOptionsByValue(options, value);
        const defaultOptions = foundOptions.length > 0
            ? foundOptions
            : findOptionsByValue(options, defaultValue ?? '');

        return getInputValueFromOption(defaultOptions[0] as ComboboxOption);
    }

    const [inputValue, setInputValue] = useState<string>(getInitialInputValue);

    const getEmptyListMessage: (query: string) => string = useCallback((query) => {
        if (emptyListMessage) {
            return emptyListMessage;
        }

        return query.length > 0 ? t('noResultForQuery', { query }) : t('noResult');
    }, [emptyListMessage, t]);

    const filteredOptions = useMemo(() => {
        if (isLoading) {
            return [{
                disabled: true,
                label: t('loading'),
                value: '',
            }];
        }

        if (options.length === 0 && inputValue === '') {
            return [{
                disabled: true,
                label: getEmptyListMessage(''),
                value: '',
            }];
        }

        update();
        if (inputValue === '' || disableListFiltering) {
            return options;
        }

        const filtered = options.filter(
            (option: ComboboxOption) => getInputValueFromOption(option)
                .toLowerCase()
                .startsWith(inputValue.toLowerCase()),
        );

        if (showAllOptions && filtered.length === 1 && getInputValueFromOption(filtered[0]) === inputValue) {
            return options;
        }

        if (filtered.length === 0 && !allowCustomValue) {
            filtered.push({
                disabled: true,
                label: getEmptyListMessage(inputValue),
                value: '',
            });
        }

        return filtered;
    }, [
        isLoading,
        options,
        inputValue,
        update,
        disableListFiltering,
        showAllOptions,
        getInputValueFromOption,
        allowCustomValue,
        t,
        getEmptyListMessage,
    ]);

    const [suggestedInputValue, setSuggestedInputValue] = useState<string>('');

    function getSuggestedOption(searchValue: string): ComboboxOption | undefined {
        return options.find(
            (option: ComboboxOption) => stripDiacritics(getInputValueFromOption(option))
                .toLowerCase()
                .startsWith(stripDiacritics(searchValue).toLowerCase()),
        );
    }

    const initialSelectedOptions = useMemo(
        () => getDefaultOptions(value ?? defaultValue, options),
        [value, defaultValue, options],
    );

    const {
        clearSelection: clearSelectedOptions,
        currentSelectedElement: selectedOption,
        previousSelectedElement: previousSelectedOption,
        selectElement: selectOption,
        selectedElements: selectedOptions,
        setSelectedElements: setSelectedOptions,
        toggleSelectedElements: toggleSelectedOptions,
        revertPreviousSelectedElement: revertPreviousSelectedOption,
    } = useListSelect<ComboboxOption>(
        optionsAreEqual,
        () => initialSelectedOptions,
        multiselect,
    );

    const changeInputValue: (newOption: ComboboxOption | undefined) => void = useCallback((newOption) => {
        setInputValue(getInputValueFromOption(newOption));
        setSuggestedInputValue('');

        const newValue: string | undefined = newOption?.value;
        const existingOption: ListboxOption | undefined = findOptionsByValue(options, newValue)[0];
        const isNotAlreadySelectedOption = existingOption !== undefined && selectedOption?.value !== newValue;
        if (allowCustomValue || newOption === undefined || isNotAlreadySelectedOption) {
            onChange?.(newValue || '');
        }
    }, [allowCustomValue, getInputValueFromOption, onChange, options, selectedOption?.value]);

    const revertInputValue: () => void = useCallback(() => {
        revertPreviousSelectedOption();
        changeInputValue(previousSelectedOption);
    }, [changeInputValue, previousSelectedOption, revertPreviousSelectedOption]);

    const {
        selectedElement: focusedOption,
        setSelectedElement: setFocusedOption,
        selectPrevious: focusPreviousOption,
        selectNext: focusNextOption,
        selectFirst: focusFirstOption,
        selectLast: focusLastOption,
    } = useListCursor({
        elements: filteredOptions,
        initialElement: multiselect ? undefined : selectedOption,
        predicate: isOptionEnabled,
        wrapAround: true,
    });

    const toggleOptionSelection = useCallback((option: ComboboxOption): void => {
        const newSelectedOptions = !isOptionSelected(option, selectedOptions)
            ? addUniqueOption(option, selectedOptions)
            : removeOption(option, selectedOptions);

        toggleSelectedOptions(option);
        onChange?.(newSelectedOptions);
    }, [onChange, selectedOptions, toggleSelectedOptions]);

    const [previousValue, setPreviousValue] = useState<Value | undefined>(value);

    if (value !== previousValue) {
        const newOptions = findOptionsByValue(options, value);

        if (newOptions && newOptions.length > 0) {
            const newOption = newOptions[0];

            if (multiselect) {
                setInputValue('');
                setSelectedOptions(newOptions);
            } else {
                setInputValue(getInputValueFromOption(newOption));
                selectOption(newOption);
            }

            setSuggestedInputValue('');
            setFocusedOption(newOption);
        } else if (allowCustomValue) {
            if (multiselect) {
                setInputValue('');
                clearSelectedOptions();

                const values = getValueAsStringArray(value);
                const customOptions = values
                    .filter((v) => !selectedOptions.some((opt) => opt.value === v))
                    .map((v) => (createCustomOption(v, v) as ComboboxOption));
                const newSelectedOptions = customOptions.reduce(
                    (acc, customOption) => addUniqueOption(customOption, acc),
                    selectedOptions,
                );
                setSelectedOptions(newSelectedOptions);
            } else {
                setInputValue(getValueAsString(value));
            }
        } else {
            if (multiselect) {
                clearSelectedOptions();
            }
            setInputValue('');
        }

        setPreviousValue(value);
    }

    const openListbox = useCallback((): void => {
        if (disabled || readOnly) {
            return;
        }

        setShowAllOptions(true);

        if (selectedOption && (!focusedOption || !filteredOptions.includes(focusedOption))) {
            setFocusedOption(selectedOption);
        }

        setOpen(true);
    }, [disabled, filteredOptions, focusedOption, readOnly, selectedOption, setFocusedOption]);

    const closeListbox: () => void = useCallback(() => {
        setShowAllOptions(false);
        setFocusedOption(undefined);
        setOpen(false);
    }, [setFocusedOption]);

    if (open && filteredOptions.length === 0) {
        closeListbox();
    }

    const handleComponentBlur: () => void = useCallback(() => {
        if (multiselect) {
            changeInputValue(undefined);
        } else if (
            focusedOption
            && (focusedOption !== selectedOption || inputValue !== getInputValueFromOption(focusedOption))
        ) {
            changeInputValue(focusedOption);
            selectOption(focusedOption);
        } else if (!allowCustomValue && inputValue !== getInputValueFromOption(selectedOption)) {
            revertInputValue();
        }

        if (open) {
            closeListbox();
        }
    }, [
        allowCustomValue,
        changeInputValue,
        closeListbox,
        focusedOption,
        inputValue,
        open,
        revertInputValue,
        selectOption,
        selectedOption,
        getInputValueFromOption,
        multiselect,
    ]);

    const componentTargets = useMemo(
        () => [floatingReferenceRef, listboxRef, arrowButtonRef, clearButtonRef],
        [listboxRef, floatingReferenceRef],
    );

    const handleTextboxBlur = useCallback((event: FocusEvent): void => {
        let outsideComponent = true;

        if (event.relatedTarget !== null) {
            componentTargets.forEach((target) => {
                if (target.current === event.relatedTarget) {
                    outsideComponent = false;
                }
            });
        }

        if (outsideComponent) {
            handleComponentBlur();
        }
    }, [componentTargets, handleComponentBlur]);

    const handleTextboxClick = useCallback((): void => {
        if (open) {
            closeListbox();
        } else {
            openListbox();
        }
    }, [closeListbox, open, openListbox]);

    const handleArrowButtonClick = useCallback((): void => {
        if (open) {
            closeListbox();
        } else {
            openListbox();
        }

        floatingReferenceRef.current?.focus();
    }, [closeListbox, open, openListbox, floatingReferenceRef]);

    const handleClearButtonClick = useCallback((): void => {
        changeInputValue(undefined);
        setFocusedOption(undefined);
        clearSelectedOptions();

        floatingReferenceRef.current?.focus();
    }, [changeInputValue, clearSelectedOptions, setFocusedOption, floatingReferenceRef]);

    const handleTagRemove = useCallback((tag: TagValue): void => {
        const removedOption = selectedOptions?.find((option) => option.value === tag.id);

        if (removedOption !== undefined) {
            toggleOptionSelection(removedOption);
        }
    }, [selectedOptions, toggleOptionSelection]);

    const renderSelectedOptionsTags = (): ReactNode => selectedOptions?.map((option: ComboboxOption) => (
        <ListboxTag
            disabled={disabled}
            key={option.value}
            option={option}
            handleTagRemove={handleTagRemove}
            readOnly={readOnly}
            textboxRef={floatingReferenceRef}
        />
    ));

    function handleListboxOptionClick(option: ComboboxOption): void {
        if (isOptionEnabled(option)) {
            if (multiselect) {
                toggleOptionSelection(option);
                setInputValue('');
            } else {
                if (option !== focusedOption) {
                    setFocusedOption(option);
                }

                if (option !== selectedOption) {
                    changeInputValue(option);
                    selectOption(option);
                }

                closeListbox();
            }
        }

        inputRef.current?.focus();
    }

    // With inline autocomplete, the suggestion gets highlighted only when text is entered in
    // the textbox (not when the user navigates the listbox with the keyboard).
    const suggestionSource = useRef<'listbox' | 'textbox'>();

    // Prevent showing the inline autocomplete when the user is deleting text in the input
    const hideInlineAutoComplete = useRef(false);

    function handleTextboxKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
        let newFocusedOption: ComboboxOption | undefined;
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (!open) {
                    openListbox();
                    focusFirstOption();
                } else {
                    newFocusedOption = focusedOption ? focusNextOption() : focusFirstOption();

                    if (newFocusedOption && inlineAutoComplete) {
                        setSuggestedInputValue(getInputValueFromOption(newFocusedOption));
                        suggestionSource.current = 'listbox';
                    }
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (!open) {
                    openListbox();
                    focusLastOption();
                } else {
                    newFocusedOption = focusedOption ? focusPreviousOption() : focusLastOption();

                    if (newFocusedOption && inlineAutoComplete) {
                        setSuggestedInputValue(getInputValueFromOption(newFocusedOption));
                        suggestionSource.current = 'listbox';
                    }
                }
                break;
            case 'Enter':
                event.preventDefault();

                if (!open && multiselect) {
                    openListbox();
                }

                if (focusedOption) {
                    if (focusedOption !== selectedOption || inputValue !== getInputValueFromOption(focusedOption)) {
                        if (multiselect) {
                            changeInputValue(undefined);
                            toggleOptionSelection(focusedOption);
                        } else {
                            changeInputValue(focusedOption);
                            selectOption(focusedOption);
                        }
                    }

                    if (!multiselect) {
                        closeListbox();
                    }
                } else if (multiselect && allowCustomValue && inputValue.trim() !== '') {
                    const customOption = createCustomOption(inputValue, inputValue) as ComboboxOption;
                    changeInputValue(undefined);
                    toggleOptionSelection(customOption);
                    closeListbox();
                } else if (open && (allowCustomValue || inputValue === '')) {
                    closeListbox();
                }
                break;
            case 'Escape':
                if (open) {
                    closeListbox();
                } else {
                    changeInputValue(undefined);
                    if (!multiselect) {
                        clearSelectedOptions();
                    }
                }
                break;
            case 'Backspace':
            case 'Delete':
                hideInlineAutoComplete.current = true;
                break;
        }
    }

    function handleTextboxChange(event: ChangeEvent<HTMLInputElement>): void {
        if (!open) {
            openListbox();
        }
        setShowAllOptions(false);

        const newInputValue = event.target.value;
        onInputChange?.(newInputValue);
        changeInputValue({ value: newInputValue, label: newInputValue });

        // Always clear the focused option to prevent unwanted selection on textbox blur
        setSuggestedInputValue('');
        setFocusedOption(undefined);

        if (inlineAutoComplete && !hideInlineAutoComplete.current) {
            const newSuggestedOption = getSuggestedOption(newInputValue);
            setSuggestedInputValue(getInputValueFromOption(newSuggestedOption));

            if (newSuggestedOption) {
                suggestionSource.current = 'textbox';
                setFocusedOption(newSuggestedOption);
            }
        } else {
            hideInlineAutoComplete.current = false;
        }

        // Select option if the input text is an exact match
        const matchingOption: ListboxOption | undefined = findOptionByLabelOrValue(newInputValue);

        if (matchingOption) {
            if (autoSelectMatchingOption) {
                if (multiselect) {
                    changeInputValue(undefined);
                    toggleOptionSelection(matchingOption);
                } else {
                    selectOption(matchingOption);
                }
            } else if (multiselect) {
                // If not auto-selecting, focus the matching option in multiselect mode
                setFocusedOption(matchingOption);
            }
        } else if (!multiselect && (allowCustomValue || newInputValue === '')) {
            clearSelectedOptions();
        }
    }

    useEffect(() => {
        if (suggestionSource.current !== 'textbox') {
            return;
        }

        if (suggestedInputValue.length > inputValue.length) {
            inputRef.current?.setSelectionRange(inputValue.length, suggestedInputValue.length);
        } else if (inputRef.current?.selectionStart === inputValue.length || suggestedInputValue.length === 0) {
            inputRef.current?.setSelectionRange(inputValue.length, inputValue.length);
        }
    }, [inputValue.length, suggestedInputValue.length, floatingReferenceRef]);

    const ariaDescribedBy = useAriaConditionalIds([
        { id: `${id}_hint`, include: !!hint },
        { id: `${id}_invalid`, include: !valid },
    ]);

    const sharedInputProps = {
        'aria-label': !label ? ariaLabel || t('inputAriaLabel') : undefined,
        'aria-activedescendant': open && focusedOption ? sanitizeId(`${id}_${focusedOption.value}`) : undefined,
        'aria-autocomplete': (inlineAutoComplete ? 'both' : 'list') as 'both' | 'list',
        'aria-controls': `${id}_listbox`,
        'aria-describedby': ariaDescribedBy,
        'aria-expanded': open,
        'aria-invalid': !valid,
        'aria-readonly': readOnly,
        'aria-required': required,
        'data-testid': 'textbox',
        id,
        $isMobile: isMobile,
        disabled: disabled || readOnly,
        name,
        onBlur: handleTextboxBlur,
        onChange: handleTextboxChange,
        onClick: handleTextboxClick,
        onKeyDown: handleTextboxKeyDown,
        placeholder: !readOnly ? placeholder : undefined,
        $readOnly: readOnly,
        role: 'combobox',
        tabIndex: 0,
        $valid: valid,
        value: suggestedInputValue || inputValue,
        ...dataAttributes,
    };

    return (
        <StyledFieldContainer
            className={className}
            noMargin={noMargin}
            fieldId={id}
            label={label}
            required={required}
            tooltip={tooltip}
            toggletip={toggletip}
            valid={valid}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            hint={hint}
        >
            <StyledContainer>
                {multiselect ? (
                    <TagInputContainer
                        data-testid="tags"
                        disabled={disabled}
                        $isMobile={isMobile}
                        $readOnly={readOnly}
                        ref={refs.setReference}
                        tabIndex={0}
                        $valid={valid}
                    >
                        <input
                            type="hidden"
                            name={name}
                            value={getJoinedValues(selectedOptions)}
                            data-testid="input"
                        />
                        {renderSelectedOptionsTags()}
                        <MultiSelectInput
                            {...sharedInputProps}
                            $hasTags={selectedOptions.length > 0}
                            ref={inputRef}
                        />
                    </TagInputContainer>
                ) : (
                    <Textbox {...sharedInputProps} ref={refs.setReference} />
                )}

                {inputValue !== '' && !disabled && !multiselect && (
                    <ClearButton
                        aria-label={t('clearInput')}
                        buttonType="tertiary"
                        data-testid="clear"
                        focusable={false}
                        iconName="x"
                        onClick={handleClearButtonClick}
                        $readOnly={readOnly}
                        ref={clearButtonRef}
                        type="button"
                    />
                )}

                <ArrowButton
                    aria-label={t('showOptions', { label: label || ariaLabel })}
                    buttonType="tertiary"
                    data-testid="arrow"
                    disabled={disabled}
                    focusable={false}
                    iconName={open ? 'chevronUp' : 'chevronDown'}
                    onClick={handleArrowButtonClick}
                    $readOnly={readOnly}
                    ref={arrowButtonRef}
                    type="button"
                />
            </StyledContainer>

            {open && createPortal(
                <StyledListbox
                    ariaLabelledBy={`${id}_label`}
                    ref={refs.setFloating}
                    data-testid="listbox"
                    focusable={false}
                    focusedValue={focusedOption?.value}
                    id={`${id}_listbox`}
                    multiselect={multiselect}
                    onOptionClick={handleListboxOptionClick}
                    options={filteredOptions}
                    value={getSelectedOptionValues(selectedOptions)}
                    $left={`${x}px`}
                    $top={`${y}px`}
                />,
                rootElement,
            )}
        </StyledFieldContainer>
    );
};
