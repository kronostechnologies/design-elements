import {
    ChangeEvent,
    type FC,
    FocusEvent,
    KeyboardEvent,
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
import { Listbox, type ListboxOption } from '../listbox';
import { type ToggletipProps } from '../toggletip';
import { type TooltipProps } from '../tooltip';

interface TextboxProps {
    disabled?: boolean;
    $isMobile: boolean;
    theme: ResolvedTheme;
    $valid: boolean;
    value: string;
}

export type ComboboxOption = ListboxOption;

function getBorderColor({ disabled, theme, $valid }: TextboxProps): string {
    if (disabled) {
        return theme.component['combobox-disabled-border-color'];
    }
    if (!$valid) {
        return theme.component['combobox-error-border-color'];
    }

    return theme.component['combobox-border-color'];
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

interface StyledListboxProps {
    $left?: string;
    $top?: string;
}

const StyledListbox = styled(Listbox)<StyledListboxProps>`
    left: ${(props) => props.$left};
    position: absolute;
    top: ${(props) => props.$top};
    z-index: 99998;
`;

const Textbox = styled.input<TextboxProps>`
    background-color: ${({ disabled, theme }) => (disabled ? theme.component['combobox-disabled-background-color'] : theme.component['combobox-background-color'])};
    border: 1px solid ${getBorderColor};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${({ disabled, theme }) => disabled && theme.component['combobox-disabled-text-color']};
    font-family: inherit;
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};
    height: ${({ $isMobile }) => ($isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
    padding: 0 var(--spacing-1x);
    width: 100%;

    ${focus};

    &::placeholder {
        color: ${({ theme }) => theme.component['combobox-placeholder-text-color']};
        font-style: italic;
    }
`;

const ArrowButton = styled(IconButton)<{ disabled?: boolean }>`
    align-items: center;
    background-color: ${({ theme }) => theme.component['combobox-arrow-button-background-color']};
    border: 0;
    color: ${({ disabled, theme }) => theme.component[`combobox-arrow-button${disabled ? '-disabled' : ''}-icon-color`]};
    display: flex;
    height: var(--size-1x);
    padding: var(--spacing-half);
    position: absolute;
    right: 0;
    width: var(--size-1x);

    &:hover {
        background-color: ${({ theme }) => theme.component['combobox-arrow-button-hover-background-color']};
    }
`;

const ClearButton = styled(IconButton)<{ disabled?: boolean }>`
    align-items: center;
    background-color: transparent;
    border: 0;
    color: ${({ disabled, theme }) => (disabled ? theme.component['combobox-clear-button-disabled-icon-color'] : theme.component['combobox-clear-button-icon-color'])};
    display: flex;
    height: var(--size-1x);
    padding: var(--spacing-half);
    position: absolute;
    right: calc(var(--size-1x) + var(--spacing-1halfx));
    width: var(--size-1x);

    &::after {
        border-right: ${({ theme }) => `1px solid ${theme.component['combobox-clear-button-border-right-color']}`};
        content: '';
        height: calc(var(--size-2x) - var(--spacing-2x));
        margin-left: var(--spacing-1x);
    }

    &:hover {
        background-color: transparent;
    }
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
    className?: string;
    /**
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * The default value and selected option
     */
    defaultValue?: string;
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
    name?: string;
    options: ComboboxOption[];
    placeholder?: string;
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
    value?: string;
    hint?: string;

    /**
     * OnChange callback function, invoked when the value is changed
     */
    onChange?(value: string): void;

    onInputChange?(value: string): void;
}

const optionPredicate: (option: ComboboxOption) => boolean = (option) => !option.disabled;

export const Combobox: FC<ComboboxProps> = ({
    allowCustomValue = false,
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
    onChange,
    onInputChange,
    options,
    placeholder,
    name,
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

    const arrowButtonRef = useRef<HTMLButtonElement>(null);
    const clearButtonRef = useRef<HTMLButtonElement>(null);

    const shadowRoot = useShadowRoot();
    const [open, setOpen] = useState(defaultOpen);
    const {
        x,
        y,
        update,
        refs: { reference: textboxRef, floating: listboxRef, ...refs },
    } = useDropdown<HTMLInputElement>({ open, width: 'reference' });
    const rootElement = getRootElement(shadowRoot) as HTMLElement;

    const findOptionByValue = useCallback(
        (searchValue?: string): ComboboxOption | undefined => options.find(
            (option) => option.value.toLowerCase() === searchValue?.toLowerCase(),
        ),
        [options],
    );

    const findOptionByLabelOrValue = useCallback(
        (searchValue?: string): ComboboxOption | undefined => options.find((option) => {
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
        if (allowCustomValue && defaultValue && !findOptionByValue(defaultValue)) {
            return defaultValue;
        }
        const defaultOption = findOptionByValue(value) ?? findOptionByValue(defaultValue ?? '');
        return getInputValueFromOption(defaultOption);
    }

    const [inputValue, setInputValue] = useState(getInitialInputValue);

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
            (option) => getInputValueFromOption(option).toLowerCase().startsWith(inputValue.toLowerCase()),
        );

        if (filtered.length === 1 && getInputValueFromOption(filtered[0]) === inputValue) {
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
        allowCustomValue,
        getInputValueFromOption,
        disableListFiltering,
        getEmptyListMessage,
        inputValue,
        isLoading,
        options,
        update,
        t,
    ]);

    const [suggestedInputValue, setSuggestedInputValue] = useState('');

    function getSuggestedOption(searchValue: string): ComboboxOption | undefined {
        return options.find(
            (option) => stripDiacritics(getInputValueFromOption(option))
                .toLowerCase()
                .startsWith(stripDiacritics(searchValue).toLowerCase()),
        );
    }

    const findInitialSelectedOption: () => ListboxOption | undefined = () => findOptionByValue(value ?? defaultValue);
    const {
        currentSelectedElement: selectedOption,
        previousSelectedElement: previousSelectedOption,
        selectElement: selectOption,
        clearSelection: clearSelectedOptions,
        revertPreviousSelectedElement: revertPreviousSelectedOption,
    } = useListSelect<ComboboxOption>(
        (option: ComboboxOption, optionToCompare: ComboboxOption) => option.value === optionToCompare.value,
        findInitialSelectedOption,
    );

    const changeInputValue: (newOption: ComboboxOption | undefined) => void = useCallback((newOption) => {
        setInputValue(getInputValueFromOption(newOption));
        setSuggestedInputValue('');

        const newValue: string | undefined = newOption?.value;
        const existingOption: ListboxOption | undefined = findOptionByValue(newValue);
        const isNotAlreadySelectedOption = existingOption !== undefined && selectedOption?.value !== newValue;
        if (allowCustomValue || newOption === undefined || isNotAlreadySelectedOption) {
            onChange?.(newValue || '');
        }
    }, [allowCustomValue, findOptionByValue, getInputValueFromOption, onChange, selectedOption?.value]);

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
        initialElement: selectedOption,
        predicate: optionPredicate,
        wrapAround: true,
    });

    const [previousValue, setPreviousValue] = useState<string | undefined>(value);

    if (value !== previousValue) {
        const newOption = findOptionByValue(value);

        if (newOption) {
            setInputValue(getInputValueFromOption(newOption));
            selectOption(newOption);
            setSuggestedInputValue('');
            setFocusedOption(newOption);
        } else if (allowCustomValue) {
            setInputValue(value ?? '');
        } else {
            setInputValue('');
        }

        setPreviousValue(value);
    }

    function openListbox(): void {
        if (disabled) {
            return;
        }

        if (selectedOption && (!focusedOption || !filteredOptions.includes(focusedOption))) {
            setFocusedOption(selectedOption);
        }

        setOpen(true);
    }

    const closeListbox: () => void = useCallback(() => {
        setFocusedOption(undefined);
        setOpen(false);
    }, [setFocusedOption]);

    if (open && filteredOptions.length === 0) {
        closeListbox();
    }

    const handleComponentBlur: () => void = useCallback(() => {
        if (
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
    ]);

    const componentTargets = [textboxRef, listboxRef, arrowButtonRef, clearButtonRef];

    function handleTextboxBlur(event: FocusEvent): void {
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
    }

    function handleTextboxClick(): void {
        if (open) {
            closeListbox();
        } else {
            openListbox();
        }
    }

    function handleArrowButtonClick(): void {
        if (open) {
            closeListbox();
        } else {
            openListbox();
        }

        textboxRef.current?.focus();
    }

    function handleClearButtonClick(): void {
        changeInputValue(undefined);
        setFocusedOption(undefined);
        clearSelectedOptions();

        textboxRef.current?.focus();
    }

    function handleListboxOptionClick(option: ComboboxOption): void {
        if (optionPredicate(option)) {
            if (option !== focusedOption) {
                setFocusedOption(option);
            }

            if (option !== selectedOption) {
                changeInputValue(option);
                selectOption(option);
            }

            closeListbox();
        }

        textboxRef.current?.focus();
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
                if (focusedOption) {
                    if (focusedOption !== selectedOption || inputValue !== getInputValueFromOption(focusedOption)) {
                        changeInputValue(focusedOption);
                        selectOption(focusedOption);
                    }
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
                    clearSelectedOptions();
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
            selectOption(matchingOption);
        } else if (allowCustomValue || newInputValue === '') {
            clearSelectedOptions();
        }
    }

    useEffect(() => {
        if (suggestionSource.current !== 'textbox') {
            return;
        }

        if (suggestedInputValue.length > inputValue.length) {
            textboxRef.current?.setSelectionRange(inputValue.length, suggestedInputValue.length);
        } else if (textboxRef.current?.selectionStart === inputValue.length || suggestedInputValue.length === 0) {
            textboxRef.current?.setSelectionRange(inputValue.length, inputValue.length);
        }
    }, [inputValue.length, suggestedInputValue.length, textboxRef]);

    const ariaDescribedBy = useAriaConditionalIds([
        { id: `${id}_hint`, include: !!hint },
        { id: `${id}_invalid`, include: !valid },
    ]);

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
                <Textbox
                    aria-label={!label ? ariaLabel || t('inputAriaLabel') : undefined}
                    aria-activedescendant={open && focusedOption
                        ? sanitizeId(`${id}_${focusedOption.value}`)
                        : undefined}
                    aria-autocomplete={inlineAutoComplete ? 'both' : 'list'}
                    aria-controls={`${id}_listbox`}
                    aria-describedby={ariaDescribedBy}
                    aria-expanded={open}
                    aria-invalid={!valid ? 'true' : 'false'}
                    aria-required={required ? 'true' : 'false'}
                    data-testid="textbox"
                    id={id}
                    $isMobile={isMobile}
                    disabled={disabled}
                    name={name}
                    onBlur={handleTextboxBlur}
                    onChange={handleTextboxChange}
                    onClick={handleTextboxClick}
                    onKeyDown={handleTextboxKeyDown}
                    placeholder={placeholder}
                    ref={refs.setReference}
                    role="combobox"
                    tabIndex={0}
                    $valid={valid}
                    value={suggestedInputValue || inputValue}
                    {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                />
                {inputValue !== '' && !disabled && (
                    <ClearButton
                        aria-label={t('clearInput')}
                        buttonType="tertiary"
                        data-testid="clear"
                        focusable={false}
                        iconName="x"
                        onClick={handleClearButtonClick}
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
                    onOptionClick={handleListboxOptionClick}
                    options={filteredOptions}
                    value={selectedOption ? [selectedOption.value] : undefined}
                    $left={`${x}px`}
                    $top={`${y}px`}
                />,
                rootElement,
            )}
        </StyledFieldContainer>
    );
};
