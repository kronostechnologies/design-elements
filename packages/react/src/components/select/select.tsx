import {
    ChangeEvent,
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
import { Theme } from '../../themes';
import { eventIsInside } from '../../utils/events';
import { isLetterOrNumber } from '../../utils/regex';
import { v4 as uuid } from '../../utils/uuid';
import { ChooserButton } from '../chooser-button/chooser-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer, FieldContainerProps } from '../field-container/field-container';
import { Icon } from '../icon/icon';
import { Listbox, ListboxOption } from '../listbox/listbox';
import { TooltipProps } from '../tooltip/tooltip';

interface InputProps {
    searchable?: boolean;
    isMobile: boolean;
    disabled?: boolean;
    theme: Theme;
}

interface InputWrapperProps extends InputProps {
    isMobile: boolean;
    focus?: boolean;
    containerOutline: boolean;
    valid: boolean;
}

export interface Option extends ListboxOption {
    label: string;
}

function getBorderColor({
    disabled, focus, theme, valid,
}: InputWrapperProps): string {
    if (disabled) {
        return theme.greys.grey;
    }
    if (!valid) {
        return theme.notifications['alert-2.1'];
    }
    if (focus) {
        return theme.main['primary-1.1'];
    }

    return theme.greys['dark-grey'];
}

const StyledFieldContainer = styled(FieldContainer)<FieldContainerProps>`
    position: relative;
`;

const InputWrapper = styled.div<InputWrapperProps>`
    align-items: center;
    background-color: ${({ disabled, theme }) => (disabled ? theme.greys['light-grey'] : theme.greys.white)};
    border: 1px solid ${getBorderColor};
    border-radius: var(--border-radius);
    box-shadow: ${({ containerOutline, theme }) => (containerOutline ? theme.tokens['focus-box-shadow'] : 'none')};
    box-sizing: border-box;
    display: flex;
    height: ${({ isMobile }) => (isMobile ? '2.5rem' : '2rem')};
    padding-right: var(--spacing-1x);
    width: 100%;

    &:hover {
        cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    }

    svg {
        color: ${({ disabled, theme }) => (disabled ? theme.greys['mid-grey'] : theme.greys['dark-grey'])};
    }
`;

function getInputCursor({ disabled, searchable }: InputProps): string {
    if (disabled) {
        return 'default';
    }
    if (searchable) {
        return 'text';
    }
    return 'pointer';
}

function filterOptions(optionsArray: Option[], filterValue: string): Option[] {
    return optionsArray.filter((option) => option.label.toLowerCase().startsWith(filterValue.toLowerCase()));
}

const StyledInput = styled.input<InputProps>`
    background-color: ${({ disabled, theme }) => (disabled ? theme.greys['light-grey'] : theme.greys.white)};
    border: none;
    border-radius: var(--border-radius);
    box-sizing: border-box;
    caret-color: ${({ searchable }) => (searchable ? 'unset' : 'transparent')};
    font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.875rem')};
    letter-spacing: 0.025rem;
    max-height: 100%;
    min-width: 0;
    outline: none;
    overflow: hidden;
    padding: var(--spacing-1x) 0 var(--spacing-1x) var(--spacing-1x);
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;

    &:hover {
        cursor: ${getInputCursor};
    }

    &::placeholder {
        color: ${({ disabled, theme }) => (disabled ? theme.greys['mid-grey'] : theme.greys['dark-grey'])};
        font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.875rem')};
    }
`;

const Arrow = styled.button<{ disabled?: boolean }>`
    align-items: center;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    display: flex;

    > svg {
        height: var(--size-1x);
        width: var(--size-1x);
    }
`;

interface SelectProps {
    /**
     * Sets input's aria-label
     */
    ariaLabel?: string;
    className?: string;
    /**
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * The default selected option
     */
    defaultValue?: string;
    /**
     * Disables input
     */
    disabled?: boolean;
    /** Disables default margin */
    noMargin?: boolean;
    id?: string;
    label?: string;
    name?: string;
    /**
     * Number of visible items in the listbox before overflow
     * @default 4
     */
    numberOfItemsVisible?: number;
    /**
     * { disabled?: boolean, value: string; label: string; }[]
     */
    options: Option[];
    placeholder?: string;
    required?: boolean;
    /**
     * Adds search functionality with autocomplete
     */
    searchable?: boolean;
    /**
     * Adds a skip button
     */
    skipOption?: { label: string; value?: string };
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
     * Set the selected value
     */
    value?: string;
    hint?: string;

    /**
     * OnChange callback function, invoked when an option is selected
     */
    onChange?(option: Option): void;
}

export const Select: VoidFunctionComponent<SelectProps> = ({
    ariaLabel,
    className,
    defaultOpen = false,
    defaultValue,
    disabled,
    noMargin,
    id,
    label,
    onChange,
    options,
    name,
    numberOfItemsVisible = 4,
    placeholder,
    required,
    searchable,
    skipOption,
    tooltip,
    valid = true,
    validationErrorMessage,
    value,
    hint,
    ...otherProps
}) => {
    const { t } = useTranslation('select');
    const { device, isMobile } = useDeviceContext();
    const fieldId = useMemo(() => id || uuid(), [id]);
    const dataAttributes = useDataAttributes(otherProps);

    const [autoFocus, setAutofocus] = useState(false);
    const [containerOutline, setContainerOutline] = useState(false);
    const [focus, setFocus] = useState(false);
    const [open, setOpen] = useState(defaultOpen);
    const [searchValue, setSearchValue] = useState('');
    const [focusedValue, setFocusedValue] = useState<string>();
    const [selectedOptionValue, setSelectedOptionValue] = useState(defaultValue || value);
    const skipSelected = useMemo(
        () => skipOption && skipOption.value === selectedOptionValue,
        [selectedOptionValue, skipOption],
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const [shouldFilterOptions, setShouldFilterOptions] = useState<boolean | undefined>(searchable);
    const filteredOptions = useMemo(
        () => {
            if (!shouldFilterOptions) {
                return options;
            }
            return filterOptions(options, searchValue);
        },
        [options, searchValue, shouldFilterOptions],
    );

    const findOptionByValue: (needle?: string) => Option | undefined = useCallback(
        (needle) => options.find((option) => option.value === needle),
        [options],
    );
    const [inputValue, setInputValue] = useState(() => findOptionByValue(selectedOptionValue)?.label ?? '');

    useEffect(() => {
        const wantedOption = findOptionByValue(value);
        if (wantedOption) {
            setSelectedOptionValue(wantedOption.value);
            setInputValue(wantedOption.label);
        } else if (skipOption && skipOption.value === value) {
            setSelectedOptionValue(skipOption.value);
            setInputValue('');
        }
    }, [findOptionByValue, options, skipOption, skipSelected, value]);

    const handleOpen: () => void = useCallback(() => {
        if (!disabled) {
            if (!open) {
                setFocus(true);
                if (searchable && inputRef.current) {
                    inputRef.current.focus();
                    setFocusedValue('');
                } else {
                    setFocusedValue(selectedOptionValue);
                }
            } else {
                inputRef.current?.focus();
                setAutofocus(false);
                setFocusedValue('');
            }
            setOpen(!open);
        }
    }, [disabled, open, searchable, selectedOptionValue]);

    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !eventIsInside(event, wrapperRef.current, listboxRef.current);
        const shouldClose = (wrapperRef.current === null || clickIsOutside) && open;

        if (shouldClose) {
            handleOpen();
            inputRef.current?.blur();
        }
    }, [open, handleOpen]);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);
        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [handleClickOutside, open]);

    function findOption(optionsArray: Option[], findValue: string): Option | undefined {
        return optionsArray.find((option) => option.label.toLowerCase() === findValue.toLowerCase());
    }

    function focusFirstElementFromArray(array: Option[]): void {
        const firstArrayElement = array.find((element) => !element.disabled);

        if (firstArrayElement) {
            setFocusedValue(firstArrayElement.value);
        }
    }

    function focusLastElementFromArray(array: Option[]): void {
        const lastArrayElement = [...array].reverse().find((element) => !element.disabled);

        if (lastArrayElement) {
            setFocusedValue(lastArrayElement.value);
        }
    }

    function resetField(): void {
        setFocusedValue('');
        setInputValue('');
        setSelectedOptionValue('');
        setSearchValue('');
    }

    const matchInputValueToOption: () => void = useCallback(() => {
        const matchingOption = findOption(options, inputValue);

        if (matchingOption) {
            setSelectedOptionValue(matchingOption.value);
            setInputValue(matchingOption.label);
        }
    }, [inputValue, options]);

    function handleSkipChange(): void {
        if (!skipSelected && skipOption) {
            setSelectedOptionValue(skipOption.value);
            setInputValue('');
            onChange?.({ label: skipOption.label, value: skipOption.value ?? skipOption.label });
        }
    }

    function handleArrowClick(): void {
        handleOpen();
        matchInputValueToOption();
    }

    function handleBlur(): void {
        matchInputValueToOption();
        if (!open) {
            setFocus(false);
        }
        setContainerOutline(false);
    }

    const handleChange: (option: Option) => void = useCallback((option) => {
        setOpen(false);
        setFocus(false);
        setFocusedValue('');
        setInputValue(option.label);
        setSelectedOptionValue(option.value);
        setShouldFilterOptions(false);
        onChange?.(option);
        if (searchable) {
            setAutofocus(false);
            setSearchValue(option.label);
        }
        inputRef.current?.focus();
    }, [onChange, searchable]);

    function handleFocus(): void {
        setFocus(true);
        setContainerOutline(true);
    }

    const handleFocusedValueChange: (option?: Option) => void = useCallback((option) => {
        if (option) {
            setInputValue(option.label);
        }
    }, []);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        if (searchable) {
            const newValue = event.currentTarget.value;
            const newFilteredOptions = filterOptions(options, newValue);
            if (inputValue !== newValue) {
                setShouldFilterOptions(true);
            }

            if (newValue === '') {
                setFocusedValue('');
                setSearchValue('');
                setInputValue(newValue);
                setOpen(false);
                setSelectedOptionValue('');
            } else {
                setInputValue(newValue);
                setSearchValue(newValue);
                setOpen(newFilteredOptions.length >= 1);
            }
        }
    }

    useEffect(() => {
        if (open && (!focusedValue || !filteredOptions.find((option) => option.value === focusedValue))) {
            if (filteredOptions.length > 0) {
                focusFirstElementFromArray(filteredOptions);
            } else {
                setSelectedOptionValue('');
                setFocusedValue('');
            }
        }
    }, [focusedValue, filteredOptions, open]);

    const handleInputClick: () => void = useCallback(() => {
        if (searchable) {
            setFocusedValue('');
        } else {
            handleOpen();
            matchInputValueToOption();
        }
        setAutofocus(false);
    }, [handleOpen, matchInputValueToOption, searchable]);

    const handleInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void = useCallback((event) => {
        switch (event.key) {
            case 'ArrowDown':
                if (!open) {
                    handleOpen();
                    if (searchable || !selectedOptionValue) {
                        focusFirstElementFromArray(filteredOptions);
                    } else {
                        setFocusedValue(selectedOptionValue);
                    }
                } else if (searchable) {
                    if (searchValue !== '') {
                        const optionToSelect = filteredOptions.length > 1 ? filteredOptions[1] : filteredOptions[0];
                        setTimeout(() => setFocusedValue(optionToSelect.value), 10);
                    } else {
                        setTimeout(() => focusFirstElementFromArray(filteredOptions), 10);
                    }
                }
                setAutofocus(true);
                break;
            case 'ArrowUp':
                if (!open) {
                    handleOpen();
                    if (searchable || !selectedOptionValue) {
                        focusLastElementFromArray(filteredOptions);
                    } else {
                        setTimeout(() => setFocusedValue(selectedOptionValue), 10);
                    }
                } else if (searchable) {
                    setTimeout(() => focusLastElementFromArray(filteredOptions), 10);
                } else if (autoFocus) {
                    setAutofocus(false);
                }
                setAutofocus(true);
                break;
            case 'Enter':
                event.preventDefault();
                if (searchValue !== '' && filteredOptions.length > 0 && open) {
                    const optionToSelect = findOptionByValue(focusedValue);
                    if (optionToSelect) {
                        handleChange(optionToSelect);
                    }
                } else if (!open && !searchable) {
                    handleOpen();
                    setTimeout(() => setFocusedValue(selectedOptionValue), 10);
                }
                break;
            case ' ':
                if (!open) {
                    event.preventDefault();
                    handleOpen();
                    if (!searchable) {
                        setTimeout(() => setFocusedValue(selectedOptionValue), 10);
                    }
                }
                break;
            case 'Escape':
                if (searchable) {
                    resetField();
                }
                if (open) {
                    handleOpen();
                    matchInputValueToOption();
                }
                break;
            default:
                break;
        }
    }, [
        autoFocus,
        filteredOptions,
        handleChange,
        handleOpen,
        matchInputValueToOption,
        open,
        searchValue,
        searchable,
        selectedOptionValue,
        findOptionByValue,
        focusedValue,
    ]);

    const handleListboxKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void = useCallback((event) => {
        if (event.key === 'Escape') {
            if (searchable) {
                resetField();
            } else {
                matchInputValueToOption();
            }
            setFocusedValue('');
            handleOpen();
        } else if (event.key === 'ArrowUp' && !focusedValue) {
            focusLastElementFromArray(options);
        } else if (isLetterOrNumber(event.key)) /* Check if key is a character */ {
            if (searchable) {
                setAutofocus(false);
                setFocusedValue('');
                inputRef.current?.focus();
            } else {
                const suggestOption = options.find((option) => option.label.toLowerCase()
                    .startsWith(event.key.toLowerCase()));
                if (suggestOption) {
                    setFocusedValue(suggestOption.value);
                }
            }
        }
    }, [focusedValue, handleOpen, matchInputValueToOption, options, searchable]);

    return (
        <>
            <StyledFieldContainer
                className={className}
                noMargin={noMargin}
                fieldId={fieldId}
                label={label}
                tooltip={tooltip}
                valid={valid}
                validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
                hint={hint}
            >
                <InputWrapper
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    aria-owns={`listbox_${fieldId}`}
                    data-testid="input-wrapper"
                    containerOutline={containerOutline}
                    isMobile={isMobile}
                    disabled={disabled}
                    focus={focus}
                    ref={wrapperRef}
                    role={searchable ? 'combobox' : undefined}
                    valid={valid}
                    onClick={handleInputClick}
                >
                    <StyledInput
                        aria-label={ariaLabel || label || t('inputAriaLabel')}
                        aria-activedescendant={selectedOptionValue ? `${fieldId}_${selectedOptionValue}` : undefined}
                        aria-autocomplete={searchable ? 'both' : 'list'}
                        aria-controls={`listbox_${fieldId}`}
                        aria-multiline="false"
                        data-testid="input"
                        id={fieldId}
                        isMobile={isMobile}
                        disabled={disabled}
                        name={name}
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onKeyDown={handleInputKeyDown}
                        placeholder={placeholder}
                        ref={inputRef}
                        required={required}
                        searchable={searchable}
                        type="text"
                        value={inputValue}
                        {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                    />
                    <Arrow
                        aria-labelledby={fieldId}
                        type="button"
                        data-testid="arrow"
                        tabIndex={-1}
                        onClick={disabled ? undefined : handleArrowClick}
                        disabled={disabled}
                    >
                        <Icon name={open ? 'chevronUp' : 'chevronDown'} size={device === 'mobile' ? '24' : '16'} />
                    </Arrow>
                </InputWrapper>
                {open && (
                    <Listbox
                        ariaLabelledBy={fieldId}
                        autofocus={searchable ? autoFocus : open}
                        ref={listboxRef}
                        checkIndicator
                        data-testid="listbox"
                        defaultValue={defaultValue}
                        focusedValue={focusedValue}
                        id={`listbox_${fieldId}`}
                        numberOfItemsVisible={numberOfItemsVisible}
                        onChange={handleChange}
                        onFocusedValueChange={searchable ? undefined : handleFocusedValueChange}
                        onKeyDown={handleListboxKeyDown}
                        options={filteredOptions}
                        value={selectedOptionValue}
                        dropdown
                    />
                )}
            </StyledFieldContainer>
            {skipOption && (
                <ChooserButton
                    checked={skipSelected}
                    data-testid="select-skip-option"
                    groupName={`${fieldId}_skip`}
                    onChange={handleSkipChange}
                    type="radio"
                    value={skipOption.value}
                >
                    {skipOption.label}
                </ChooserButton>
            )}
        </>
    );
};
