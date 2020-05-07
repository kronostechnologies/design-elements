import React, { ChangeEvent, FocusEvent, KeyboardEvent, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { ChooseInput } from '../choose-input/choose-input';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { Icon } from '../icon/icon';
import { List } from '../list/list';
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

const StyledFieldContainer = styled(FieldContainer)`
    position: relative;
`;

const InputWrapper = styled.div<InputWrapperProps>`
    align-items: center;
    background-color: ${({ disabled, theme }) => disabled ? theme.greys['light-grey'] : theme.greys.white};
    border: 1px solid ${getBorderColor};
    border-radius: var(--border-radius);
    box-shadow: ${({ containerOutline }) => containerOutline ? '0 0 0 2px rgba(0, 128, 165, 0.4)' : 'none'};
    box-sizing: border-box;
    display: flex;
    height: ${({ isMobile }) => isMobile ? '40px' : '32px'};
    justify-content: space-between;
    margin-top: var(--spacing-half);
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
    outline: none;
    padding: var(--spacing-1x) 0 var(--spacing-1x) var(--spacing-1x);
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

const StyledList = styled(List)`
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

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    /**
     * The default selected option
     */
    defaultValue?: string;
    /**
     * Disables input
     */
    disabled?: boolean;
    label?: string;
    name?: string;
    /**
     * Number of visible items in the list before overflow
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
     * OnChange callback function, invoked when an option is selected
     */
    onChange?(option: Option): void;
}

export function Select({
    defaultValue,
    disabled,
    label,
    onChange,
    options,
    name,
    numberOfItemsVisible = 4,
    placeholder = 'Select an option',
    required,
    searchable,
    skipOption,
    valid = true,
    validationErrorMessage = 'You must select an option',
}: SelectProps): ReactElement {
    const { device, isMobile } = useDeviceContext();
    const id = useMemo(uuid, []);
    const defaultOption = options.find(option => option.value === defaultValue);

    const [autoFocus, setAutofocus] = useState(false);
    const [containerOutline, setContainerOutline] = useState(false);
    const [focus, setFocus] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [focusedValue, setFocusedValue] = useState();
    const [selectedOptionValue, setSelectedOptionValue] = useState(defaultValue);
    const [skipSelected, setSkipSelected] =
        useState(skipOption && defaultValue ? defaultValue === skipOption.value : false);
    const [inputValue, setInputValue] = useState(defaultValue && defaultOption ? defaultOption.label : '');

    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const filteredOptions = filterOptions(options, searchValue);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);
        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [open]);

    function filterOptions(optionsArray: Option[], value: string): Option[] {
        return optionsArray.filter(option => option.label.toLowerCase().startsWith(value.toLowerCase()));
    }

    function findOption(optionsArray: Option[], value: string): Option | undefined {
        return optionsArray.find(option => option.label.toLowerCase() === value.toLowerCase());
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
        }
    }

    function handleArrowClick(): void {
        handleOpen();
        matchInputValueToOption();
    }

    function handleBlur(event: FocusEvent<HTMLInputElement>): void {
        const checkSearchValue = findOption(options, event.target.value);
        if (checkSearchValue && checkSearchValue.value !== selectedOptionValue) {
            setSelectedOptionValue(checkSearchValue.value);
            onChange && onChange(checkSearchValue);
        }
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
        const shouldClose =
            wrapperRef.current === null ||
            wrapperRef.current && !wrapperRef.current.contains(event.target as Node);
        if (shouldClose && open) {
            handleOpen();
            inputRef.current && inputRef.current.blur();
        }
    }

    function handleFocus(): void {
        setFocus(true);
        setContainerOutline(true);
    }

    function handleFocusedValueChange(value: string | undefined): void {
        value && setInputValue(value);
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
        switch (event.keyCode) {
            case 40 /* ArrowDown */:
                if (!open) {
                    handleOpen();
                    if (searchable || !selectedOptionValue) {
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
            case 38 /* ArrowUp */:
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
            case 13 /* Enter */:
                event.preventDefault();
                if (searchValue !== '' && filteredOptions.length > 0 && open) {
                    handleChange(filteredOptions[0]);
                } else if (!open && !searchable) {
                    handleOpen();
                    setTimeout(() => setFocusedValue(selectedOptionValue), 10);
                }
                break;
            case 32 /* Spacebar */:
                if (!open) {
                    event.preventDefault();
                    handleOpen();
                    if (!searchable) {
                        setTimeout(() => setFocusedValue(selectedOptionValue), 10);
                    }
                }
                break;
            case 27 /* Escape */:
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

    function handleListKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
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
        } else if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown' && searchable) {
            setAutofocus(false);
            setFocusedValue('');
            inputRef.current && inputRef.current.focus();
        } else if (event.keyCode > 64 && event.keyCode < 91) /* Check if key is a character */ {
            const suggestOption =
                options.find(option => option.label.toLowerCase().startsWith(event.key.toLowerCase()));
            if (suggestOption) {
                setFocusedValue(suggestOption.value);
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
                device={device}
                fieldId={id}
                label={label}
                valid={valid}
                validationErrorMessage={validationErrorMessage}
            >
                <InputWrapper
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    aria-owns={`listbox_${id}`}
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
                        aria-activedescendant={selectedOptionValue ? `${id}_${selectedOptionValue}` : undefined}
                        aria-autocomplete={searchable ? 'both' : 'list'}
                        aria-controls={`listbox_${id}`}
                        aria-multiline="false"
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
                        type="button"
                        tabIndex={-1}
                        onClick={disabled ? undefined : handleArrowClick}
                        disabled={disabled}
                    >
                        <Icon name={open ? 'chevronUp' : 'chevronDown'} size={device === 'mobile' ? '32' : '24'}/>
                    </Arrow>
                </InputWrapper>
                <StyledList
                    autofocus={searchable ? autoFocus : open}
                    visible={open}
                    checkIndicator
                    data-testid="list"
                    defaultValue={defaultValue}
                    focusedValue={focusedValue}
                    id={id}
                    numberOfItemsVisible={numberOfItemsVisible}
                    onChange={handleChange}
                    onFocusedValueChange={searchable ? undefined : handleFocusedValueChange}
                    onKeyDown={handleListKeyDown}
                    options={filteredOptions}
                    value={selectedOptionValue}
                    dropdown
                />
            </StyledFieldContainer>
            {skipOption && (
                <ChooseInput
                    checked={skipSelected}
                    data-testid="select-skip-option"
                    groupName={`${id}_skip`}
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
