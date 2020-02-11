import React, { ChangeEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { ChooseInput } from '../choose-input/choose-input';
import { FieldContainer } from '../field-container/field-container';
import { Icon } from '../icon/icon';
import { List } from '../list/list';
import { Theme } from '../theme-wrapper/theme-wrapper';

type DeviceType = 'mobile' | 'desktop';

interface InputProps {
    searchable?: boolean;
    device: DeviceType;
    disabled?: boolean;
    theme: Theme;
}

interface InputWrapperProps extends InputProps {
    device: DeviceType;
    focus?: boolean;
    containerOutline: boolean;
    valid: boolean;
}

const StyledFieldContainer = styled(FieldContainer)`
    position: relative;
`;

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

const InputWrapper = styled.div<InputWrapperProps>`
    align-items: center;
    background-color: ${props => props.disabled ? props.theme.greys['light-grey'] : props.theme.greys.white};
    border: 1px solid ${getBorderColor};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    display: flex;
    height: 32px;
    justify-content: space-between;
    margin-top: var(--spacing-half);
    outline: ${props => props.containerOutline ? '-webkit-focus-ring-color auto 5px' : 'none'};
    padding-right: var(--spacing-1x);
    width: 100%;

    &:hover {
        cursor: ${props => props.disabled ? 'default' : 'pointer'};
    }

    svg {
        color: ${props => props.disabled ? props.theme.greys['mid-grey'] : props.theme.greys['dark-grey']};
    }
`;

const StyledInput = styled.input<InputProps>`
    background-color: ${props => props.disabled ? props.theme.greys['light-grey'] : props.theme.greys.white};
    border: none;
    border-radius: var(--border-radius);
    box-sizing: border-box;
    caret-color: ${props => props.searchable ? 'unset' : 'transparent'};
    font-size: ${props => props.device === 'mobile' ? '1rem' : '0.875rem'};
    letter-spacing: 0.4px;
    max-height: 100%;
    outline: none;
    padding: var(--spacing-1x) 0 var(--spacing-1x) var(--spacing-1x);
    width: 100%;

    &:hover {
        cursor: ${props => props.disabled ? 'default' : props.searchable ? 'text' : 'pointer'};
    }

    &::placeholder {
        color: ${props => props.disabled ? props.theme.greys['mid-grey'] : props.theme.greys['dark-grey']};
        font-size: ${props => props.device === 'mobile' ? '1rem' : '0.875rem'};
    }
`;

const ListWrapper = styled.div<{open?: boolean}>`
    display: ${props => props.open ? 'flex' : 'none'};
    position: absolute;
    width: 100%;

    ul {
        border-radius: var(--border-radius);
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.19);
    }
`;

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    defaultValue?: string;
    /**
     * Applies styles according to device
     * @default desktop
     */
    device?: DeviceType;
    /**
     * Disables input
     */
    disabled?: boolean;
    label?: string;
    name?: string;
    numberOfItemsVisible?: number;
    options: Option[];
    placeholder?: string;
    searchable?: boolean;
    skipOption?: { label: string; value?: string };
    valid?: boolean;
    validationErrorMessage?: string;
    onChange?(option: Option): void;
}

export const Select = ({
    defaultValue,
    disabled,
    label,
    onChange,
    options,
    name,
    numberOfItemsVisible = 4,
    placeholder = 'Select an option',
    searchable,
    skipOption,
    valid = true,
    validationErrorMessage = 'You must select an option',
}: SelectProps) => {
    const [focus, setFocus] = useState(false);
    const [containerOutline, setContainerOutline] = useState(false);
    const [open, setOpen] = useState(false);
    const defaultOption = options.find(option => option.value === defaultValue);
    const [inputValue, setInputValue] = useState(defaultValue && defaultOption ? defaultOption.label : '');
    const [searchValue, setSearchValue] = useState('');
    const [focusedValue, setFocusedValue] = useState();
    const [selectedOptionValue, setSelectedOptionValue] = useState();
    const [skipSelected, setSkipSelected] =
        useState(skipOption && defaultValue ? defaultValue === skipOption.value : false);
    const [autoFocus, setAutofocus] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const id = useMemo(uuid, []);

    const filterOptions = (optionsArray: Option[], value: string) => {
        return optionsArray.filter(option => option.label.toLowerCase().startsWith(value.toLowerCase()));
    };
    const filteredOptions = filterOptions(options, searchValue);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);
        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [open]);

    const handleClick = () => {
        const checkSearchValue = options.find(option =>
            option.label.toLowerCase() === inputValue.toLowerCase());
        if (!open) {
            setFocus(true);
            if (searchable && inputRef.current) {
                inputRef.current.focus();
            }
        } else {
            checkSearchValue && setSelectedOptionValue(checkSearchValue.value);
            inputRef.current && inputRef.current.focus();
            setAutofocus(false);
        }
        setOpen(!open);
    };

    const handleChange = (option: Option): void => {
        setOpen(false);
        setFocus(false);
        setSkipSelected(false);
        setInputValue(option.label);
        setSelectedOptionValue(option.value);
        onChange && onChange(option);
        if (searchable) {
            setAutofocus(false);
            setSearchValue(option.label);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (searchable) {
            const optionsArray = filterOptions(options, event.target.value);

            if (event.target.value !== '' && optionsArray.length > 0) {
                setFocusedValue(optionsArray[0].value);
            } else {
                setSelectedOptionValue('');
                setFocusedValue('');
            }
            setInputValue(event.target.value);
            setSearchValue(event.target.value);
        }
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
                open && setAutofocus(true);
                break;
            case 'Enter':
                event.preventDefault();
                if (searchValue !== '' && filteredOptions.length > 0 && open) {
                    handleChange(filteredOptions[0]);
                }
                handleClick();
                break;
            case 'Escape':
                setInputValue('');
                setSearchValue('');
                setFocusedValue('');
                setSelectedOptionValue('');
                break;
            default:
                break;
        }
    };

    const handleListKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Escape') {
            setInputValue('');
            setSearchValue('');
            setFocusedValue('');
            handleClick();
            setSelectedOptionValue('');
        } else if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown' && searchable) {
            setAutofocus(false);
            setFocusedValue('');
            inputRef.current && inputRef.current.focus();
        }
    };

    const handleClickOutside = (event: MouseEvent): void => {
        const shouldClose =
            wrapperRef.current === null ||
            wrapperRef.current && !wrapperRef.current.contains(event.target as Node);
        if (shouldClose && open) {
            handleClick();
            inputRef.current && inputRef.current.blur();
        }
    };

    const handleSkipChange = () => {
        if (!skipSelected) {
            setSkipSelected(true);
            setInputValue('');
        }
    };

    const handleFocus = () => {
        setFocus(true);
        setContainerOutline(true);
    };

    const handleBlur = () => {
        !open && setFocus(false);
        setContainerOutline(false);
    };

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
                    device={device}
                    disabled={disabled}
                    focus={focus}
                    onClick={disabled ? undefined : handleClick}
                    ref={wrapperRef}
                    role="combobox"
                    valid={valid}
                >
                    <StyledInput
                        aria-activedescendant={selectedOptionValue ? `${id}_${selectedOptionValue}` : undefined}
                        aria-autocomplete="list"
                        aria-controls={`listbox_${id}`}
                        aria-multiline="false"
                        device={device}
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
                    <Icon name={open ? 'chevronUp' : 'chevronDown'} size={device === 'mobile' ? '32' : '24'}/>
                </InputWrapper>
                <ListWrapper open={open}>
                    <List
                        autofocus={searchable ? autoFocus : open}
                        checkIndicator
                        data-testid="list"
                        defaultValue={defaultValue}
                        device={device}
                        focusedValue={focusedValue}
                        id={id}
                        numberOfItemsVisible={numberOfItemsVisible}
                        onChange={handleChange}
                        onKeyDown={handleListKeyDown}
                        options={filteredOptions}
                        value={selectedOptionValue}
                    />
                </ListWrapper>
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
};
