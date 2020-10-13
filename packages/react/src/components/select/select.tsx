import { useTranslation } from '@design-elements/i18n/i18n';
import React, { ChangeEvent, KeyboardEvent, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { ChooseInput } from '../choose-input/choose-input';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer, FieldContainerProps } from '../field-container/field-container';
import { Icon } from '../icon/icon';
import { Listbox } from '../listbox/listbox';
import { Theme } from '../theme-wrapper/theme-wrapper';

const getBorderColor = ({ disabled, focus, theme, valid }: InputWrapperProps): string => {
    if (disabled) {
        return theme.greys.grey;
    } else {
        if (!valid) {
            return theme.notifications['error-2.1'];
        } else if (focus) {
            return theme.main['primary-1.1'];
        } else {
            return theme.greys['dark-grey'];
        }
    }
};

const StyledFieldContainer = styled(FieldContainer)<FieldContainerProps>`
    position: relative;
`;

const InputWrapper = styled.div<InputWrapperProps>`
    align-items: center;
    background-color: ${({ disabled, theme }) => disabled ? theme.greys['light-grey'] : theme.greys.white};
    border: 1px solid ${getBorderColor};
    border-radius: var(--border-radius);
    box-shadow: ${({ containerOutline, theme }) => containerOutline ? theme.tokens['focus-box-shadow'] : 'none'};
    box-sizing: border-box;
    display: flex;
    height: ${({ isMobile }) => isMobile ? '40px' : '32px'};
    padding-right: var(--spacing-1x);
    width: 100%;

    &:hover {
        cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
    }

    svg {
        color: ${({ disabled, theme }) => disabled ? theme.greys['mid-grey'] : theme.greys['dark-grey']};
    }
`;

const StyledInput = styled.input<InputProps>`
    background-color: ${({ disabled, theme }) => disabled ? theme.greys['light-grey'] : theme.greys.white};
    border: none;
    border-radius: var(--border-radius);
    box-sizing: border-box;
    caret-color: ${({ searchable }) => searchable ? 'unset' : 'transparent'};
    font-size: ${({ isMobile }) => isMobile ? '1rem' : '0.875rem'};
    letter-spacing: 0.4px;
    max-height: 100%;
    min-width: 0;
    outline: none;
    overflow: hidden;
    padding: var(--spacing-1x) 0 var(--spacing-1x) var(--spacing-1x);
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;

    &:hover {
        cursor: ${({ disabled, searchable }) => disabled ? 'default' : searchable ? 'text' : 'pointer'};
    }

    &::placeholder {
        color: ${({ disabled, theme }) => disabled ? theme.greys['mid-grey'] : theme.greys['dark-grey']};
        font-size: ${({ isMobile }) => isMobile ? '1rem' : '0.875rem'};
    }
`;

const Arrow = styled.button<{disabled?: boolean}>`
    align-items: center;
    cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
    display: flex;
`;

const StyledListbox = styled(Listbox)`
    position: absolute;
    width: 100%;
`;

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

export interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    /**
     * Sets input's aria-label
     */
    ariaLabel?: string;
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
     * { value: string; label?: string; }[]
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

export function Select({
    ariaLabel,
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
    valid = true,
    validationErrorMessage,
    value,
    hint,
}: SelectProps): ReactElement {
    const { t } = useTranslation('select');
    const { device, isMobile } = useDeviceContext();
    const fieldId = id || useMemo(uuid, []);
    const defaultOption = options.find(option => option.value === defaultValue);

    const [autoFocus, setAutofocus] = useState(false);
    const [containerOutline, setContainerOutline] = useState(false);
    const [focus, setFocus] = useState(false);
    const [open, setOpen] = useState(defaultOpen);
    const [searchValue, setSearchValue] = useState('');
    const [focusedValue, setFocusedValue] = useState<string>();
    const [selectedOptionValue, setSelectedOptionValue] = useState(defaultValue);
    const [skipSelected, setSkipSelected] =
        useState(skipOption && defaultValue ? defaultValue === skipOption.value : false);
    const [inputValue, setInputValue] = useState(defaultValue && defaultOption ? defaultOption.label : '');

    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const filteredOptions = filterOptions(options, searchValue);

    useEffect(() => {
        const WantedOption = options.find(option => option.value === value);
        if (WantedOption) {
            setSelectedOptionValue(WantedOption.value);
            setInputValue(WantedOption.label);
        }
    }, [value]);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);
        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [open]);

    function filterOptions(optionsArray: Option[], filterValue: string): Option[] {
        return optionsArray.filter(option => option.label.toLowerCase().startsWith(filterValue.toLowerCase()));
    }

    function findOption(optionsArray: Option[], findValue: string): Option | undefined {
        return optionsArray.find(option => option.label.toLowerCase() === findValue.toLowerCase());
    }

    function focusFirstElementFromArray(array: Option[]): void {
        setFocusedValue(array[0].value);
    }

    function focusLastElementFromArray(array: Option[]): void {
        setFocusedValue(array[array.length - 1].value);
    }

    function resetField(): void {
        setFocusedValue('');
        setInputValue('');
        setSelectedOptionValue('');
        setSearchValue('');
    }

    function matchInputValueToOption(): void {
        const matchingOption = findOption(options, inputValue);

        if (matchingOption) {
            setSelectedOptionValue(matchingOption.value);
            setInputValue(matchingOption.label);
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

    function handleChange(option: Option): void {
        setOpen(false);
        setFocus(false);
        setSkipSelected(false);
        setFocusedValue('');
        setInputValue(option.label);
        setSelectedOptionValue(option.value);
        onChange && onChange(option);
        if (searchable) {
            setAutofocus(false);
            setSearchValue(option.label);
        } else {
            inputRef.current && inputRef.current.focus();
        }
    }

    function handleClickOutside(event: MouseEvent): void {
        const clickIsOutside = (
            !wrapperRef.current?.contains(event.target as Node) &&
            !listboxRef.current?.contains(event.target as Node)
        );
        const shouldClose = (wrapperRef.current === null || clickIsOutside) && open;

        if (shouldClose) {
            handleOpen();
            inputRef.current && inputRef.current.blur();
        }
    }

    function handleFocus(): void {
        setFocus(true);
        setContainerOutline(true);
    }

    function handleFocusedValueChange(focusValue: string | undefined): void {
        focusValue && setInputValue(focusValue);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        if (searchable) {
            const currentValue = event.target.value;
            const optionsArray = filterOptions(options, currentValue);

            if (currentValue === '') {
                setFocusedValue('');
                setSearchValue('');
                setInputValue(currentValue);
                setOpen(false);
                setSelectedOptionValue('');
            } else {
                setInputValue(currentValue);
                setSearchValue(currentValue);
                setOpen(optionsArray.length >= 1);

                if (optionsArray.length > 0) {
                    focusFirstElementFromArray(optionsArray);
                } else {
                    setSelectedOptionValue('');
                    setFocusedValue('');
                }
            }
        }
    }

    function handleInputClick(): void {
        if (searchable) {
            setFocusedValue('');
        } else {
            handleOpen();
            matchInputValueToOption();
        }
        setAutofocus(false);
    }

    function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
        switch (event.key) {
            case 'ArrowDown':
                if (!open) {
                    handleOpen();
                    if (searchable || !selectedOptionValue) {
                        setTimeout(() => focusFirstElementFromArray(filteredOptions), 10);
                    } else {
                        setTimeout(() => setFocusedValue(selectedOptionValue), 10);
                    }
                } else if (searchable) {
                    if (searchValue !== '') {
                        setTimeout(() => setFocusedValue(filteredOptions[1].value), 10);
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
                        setTimeout(() => focusLastElementFromArray(filteredOptions), 10);
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
                    handleChange(filteredOptions[0]);
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
    }

    function handleListboxKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
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
        } else if (/^[\p{L}\p{N}]$/iu.test(event.key)) /* Check if key is a character */ {
            if (searchable) {
                setAutofocus(false);
                setFocusedValue('');
                inputRef.current && inputRef.current.focus();
            } else {
                const suggestOption =
                options.find(option => option.label.toLowerCase().startsWith(event.key.toLowerCase()));
                if (suggestOption) {
                    setFocusedValue(suggestOption.value);
                }
            }
        }
    }

    function handleOpen(): void {
        if (!disabled) {
            if (!open) {
                setFocus(true);
                if (searchable && inputRef.current) {
                    inputRef.current.focus();
                    setFocusedValue('');
                } else {
                    setTimeout(() => setFocusedValue(selectedOptionValue), 10);
                }
            } else {
                inputRef.current && inputRef.current.focus();
                setAutofocus(false);
                setFocusedValue('');
            }
            setOpen(!open);
        }
    }

    function handleSkipChange(): void {
        if (!skipSelected) {
            setSkipSelected(true);
            setInputValue('');
        }
    }

    return (
        <>
            <StyledFieldContainer
                noMargin={noMargin}
                fieldId={fieldId}
                label={label}
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
                    />
                    <Arrow
                        aria-labelledby={fieldId}
                        type="button"
                        data-testid="arrow"
                        tabIndex={-1}
                        onClick={disabled ? undefined : handleArrowClick}
                        disabled={disabled}
                    >
                        <Icon name={open ? 'chevronUp' : 'chevronDown'} size={device === 'mobile' ? '24' : '16'}/>
                    </Arrow>
                </InputWrapper>
                <StyledListbox
                    ariaLabelledBy={fieldId}
                    autofocus={searchable ? autoFocus : open}
                    ref={listboxRef}
                    visible={open}
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
            </StyledFieldContainer>
            {skipOption && (
                <ChooseInput
                    checked={skipSelected}
                    data-testid="select-skip-option"
                    groupName={`${fieldId}_skip`}
                    onChange={handleSkipChange}
                    type="radio"
                    value={skipOption.value}
                >
                    {skipOption.label}
                </ChooseInput>
            )}
        </>
    );
}
