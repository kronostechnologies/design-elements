import {
    ChangeEvent,
    FocusEvent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    VoidFunctionComponent,
} from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes/theme';
import { focus } from '../../utils/css-state';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { IconButton } from '../buttons/icon-button';
import { Listbox, ListboxOption } from '../listbox/listbox';
import { TooltipProps } from '../tooltip/tooltip';
import { useAriaConditionalIds } from '../../hooks/use-aria-conditional-ids';
import { useId } from '../../hooks/use-id';
import { useListCursor } from '../../hooks/use-list-cursor';
import { sanitizeId } from '../../utils/dom';
import { stripDiacritics } from '../../utils/string';

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
        return theme.greys['mid-grey'];
    }
    if (!$valid) {
        return theme.notifications['alert-2.1'];
    }

    return theme.greys['dark-grey'];
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

const StyledListbox = styled(Listbox)`
    position: absolute;
    width: 100%;
`;

const Textbox = styled.input<TextboxProps>`
    background-color: ${({ disabled, theme }) => (disabled ? theme.greys['light-grey'] : theme.greys.white)};
    border: 1px solid ${getBorderColor};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    ${({ disabled, theme }) => disabled && `color: ${theme.greys['mid-grey']}`};
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};
    height: ${({ $isMobile }) => ($isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
    padding: 0 var(--spacing-1x);
    width: 100%;

    ${({ theme }) => focus({ theme }, true)};
    
    &::placeholder {
        color: ${({ theme }) => theme.greys['mid-grey']};
        font-style: italic;
    }
`;

const ArrowButton = styled(IconButton)<{ disabled?: boolean }>`
    align-items: center;
    background-color: transparent;
    border: 0;
    color: ${({ disabled, theme }) => (disabled ? theme.greys['mid-grey'] : theme.greys['dark-grey'])};
    display: flex;
    height: var(--size-1x);
    padding: var(--spacing-half);
    position: absolute;
    right: 0;
    width: var(--size-1x);
    
    &:hover {
        background-color: transparent;
    }
`;

const ClearButton = styled(IconButton)<{ disabled?: boolean }>`
    align-items: center;
    background-color: transparent;
    border: 0;
    color: ${({ disabled, theme }) => (disabled ? theme.greys['mid-grey'] : theme.greys['dark-grey'])};
    display: flex;
    height: var(--size-1x);
    padding: var(--spacing-half);
    position: absolute;
    right: calc(var(--size-1x) + var(--spacing-1halfx));
    width: var(--size-1x);
    
    &::after {
        border-right: ${({ theme }) => `1px solid ${theme.greys['mid-grey']}`};
        content: '';
        height: calc(var(--size-2x) - var(--spacing-2x));
        margin-left: var(--spacing-1x);
    }
    
    &:hover {
        background-color: transparent;
    }
`;

interface ComboboxProps {
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
}

const optionPredicate: (option: ComboboxOption) => boolean = (option) => !option.disabled;

export const Combobox: VoidFunctionComponent<ComboboxProps> = ({
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
    options,
    placeholder,
    name,
    required,
    tooltip,
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

    const textboxRef = useRef<HTMLInputElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const arrowButtonRef = useRef<HTMLButtonElement>(null);
    const clearButtonRef = useRef<HTMLButtonElement>(null);

    const [open, setOpen] = useState(defaultOpen);

    function findOptionByValue(searchValue?: string): ComboboxOption | undefined {
        return options.find((option) => option.value.toLowerCase() === searchValue?.toLowerCase());
    }

    function validateInputValue(newValue: string): string {
        if (allowCustomValue || newValue === '') {
            return newValue;
        }

        return findOptionByValue(newValue)?.value ?? '';
    }

    function getInitialInputValue(): string {
        return validateInputValue(value ?? defaultValue ?? '');
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

        if (inputValue === '' || disableListFiltering) {
            return options;
        }

        const filtered = options.filter(
            (option) => option.value.toLowerCase().startsWith(inputValue.toLowerCase()),
        );

        if (filtered.length === 1 && filtered[0].value === inputValue) {
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
    }, [allowCustomValue, disableListFiltering, getEmptyListMessage, inputValue, isLoading, options, t]);

    const [suggestedInputValue, setSuggestedInputValue] = useState('');

    function getSuggestedOption(searchValue: string): ComboboxOption | undefined {
        return options.find(
            (option) => stripDiacritics(option.value)
                .toLowerCase()
                .startsWith(
                    stripDiacritics(searchValue).toLowerCase(),
                ),
        );
    }

    const changeInputValue: (newValue: string) => void = useCallback((newValue) => {
        setInputValue(newValue);
        setSuggestedInputValue('');

        onChange?.(newValue);
    }, [onChange]);

    const [selectedOption, setSelectedOption] = useState<ComboboxOption | undefined>(
        () => findOptionByValue(value ?? defaultValue),
    );

    const [previousSelectedOption, setPreviousSelectedOption] = useState<ComboboxOption | undefined>(
        () => findOptionByValue(value ?? defaultValue),
    );

    function selectOption(newOption: ComboboxOption | undefined): void {
        setSelectedOption(newOption);
        setPreviousSelectedOption(newOption);
    }

    const revertInputValue: () => void = useCallback(() => {
        setSelectedOption(previousSelectedOption);
        changeInputValue(previousSelectedOption?.value ?? '');
    }, [changeInputValue, previousSelectedOption]);

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
            setInputValue(newOption.value);
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
        if (focusedOption && (focusedOption !== selectedOption || inputValue !== focusedOption.value)) {
            changeInputValue(focusedOption.value);
            selectOption(focusedOption);
        } else if (!(allowCustomValue || inputValue === '')) {
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
        selectedOption,
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
        changeInputValue('');
        setFocusedOption(undefined);
        selectOption(undefined);

        textboxRef.current?.focus();
    }

    function handleListboxOptionClick(option: ComboboxOption): void {
        if (optionPredicate(option)) {
            if (option !== focusedOption) {
                setFocusedOption(option);
            }

            if (option !== selectedOption) {
                changeInputValue(option.value);
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
                        setSuggestedInputValue(newFocusedOption.value);
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
                        setSuggestedInputValue(newFocusedOption.value);
                        suggestionSource.current = 'listbox';
                    }
                }
                break;
            case 'Enter':
                event.preventDefault();
                if (focusedOption) {
                    if (focusedOption !== selectedOption || inputValue !== focusedOption.value) {
                        changeInputValue(focusedOption.value);
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
                    changeInputValue('');
                    selectOption(undefined);
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
        changeInputValue(newInputValue);

        // Always clear the focused option to prevent unwanted selection on textbox blur
        setSuggestedInputValue('');
        setFocusedOption(undefined);

        if (inlineAutoComplete && !hideInlineAutoComplete.current) {
            const newSuggestedOption = getSuggestedOption(newInputValue);
            setSuggestedInputValue(newSuggestedOption?.value ?? '');

            if (newSuggestedOption) {
                suggestionSource.current = 'textbox';
                setFocusedOption(newSuggestedOption);
            }
        } else {
            hideInlineAutoComplete.current = false;
        }

        // Select option if the input text is an exact match
        const matchingOption = findOptionByValue(newInputValue);

        if (matchingOption) {
            selectOption(matchingOption);
        } else if (allowCustomValue || newInputValue === '') {
            selectOption(undefined);
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
    }, [inputValue.length, suggestedInputValue.length]);

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
            valid={valid}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            hint={hint}
        >
            <StyledContainer>
                <Textbox
                    aria-label={!label ? ariaLabel || t('inputAriaLabel') : undefined}
                    aria-activedescendant={open && focusedOption ? sanitizeId(`${id}_${focusedOption.value}`) : undefined}
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
                    ref={textboxRef}
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

            {open && (
                <StyledListbox
                    ariaLabelledBy={`${id}_label`}
                    ref={listboxRef}
                    data-testid="listbox"
                    focusable={false}
                    focusedValue={focusedOption?.value}
                    id={`${id}_listbox`}
                    onOptionClick={handleListboxOptionClick}
                    options={filteredOptions}
                    value={selectedOption ? [selectedOption.value] : undefined}
                />
            )}
        </StyledFieldContainer>
    );
};
