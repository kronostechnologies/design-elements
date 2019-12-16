import React, { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';

import { ChooseInput } from '../choose-input/choose-input';
import { FieldContainer } from '../field-container/field-container';
import { Icon } from '../icon/icon';
import { List } from '../list/list';
import { Theme } from '../theme-wrapper/theme-wrapper';

interface InputProps {
    searchable?: boolean;
    disabled?: boolean;
    theme: Theme;
}

interface InputWrapperProps extends InputProps {
    focus?: boolean;
    valid: boolean;
}

const StyledFieldContainer = styled(FieldContainer)`
    position: relative;
`;

const InputWrapper = styled.div<InputWrapperProps>`
    align-items: center;
    background-color: ${props => props.disabled ? props.theme.greys['light-grey'] : props.theme.greys.white};
    border:
        1px solid ${props => {
            if (props.valid) {
                if (props.focus) {
                    return props.theme.main['primary-1.1'];
                } else {
                    return props.theme.greys['dark-grey'];
                }
            } else {
                return props.theme.notifications['error-2.1'];
            }
        }};
    border-radius: 0.25rem;
    box-sizing: border-box;
    display: flex;
    height: 32px;
    justify-content: space-between;
    margin-top: 8px;
    ${props => props.disabled ? `border: 1px solid ${props.theme.greys.grey};` : ''}
    padding-right: 0.5rem;
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
    border-radius: 0.25rem;
    box-sizing: border-box;
    caret-color: ${props => props.searchable ? 'unset' : 'transparent'};
    font-size: calc(1rem - 2px);
    letter-spacing: 0.4px;
    max-height: 100%;
    padding: 0.5rem 0 0.5rem 0.5rem;
    width: 100%;

    &:hover {
        cursor: ${props => props.disabled ? 'default' : props.searchable ? 'text' : 'pointer'};
    }

    &::placeholder {
        color: ${props => props.disabled ? props.theme.greys['mid-grey'] : props.theme.greys['dark-grey']};
        font-size: 0.875rem;
    }

    &:focus {
        outline: none;
    }
`;

const ListWrapper = styled.div`
    display: ${(props: {open?: boolean}) => props.open ? 'flex' : 'none'};
    position: absolute;
    width: 100%;

    ul {
        border-radius: 0.25rem;
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.19);
        outline: none;
    }
`;

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    defaultValue?: string;
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
    const [open, setOpen] = useState(false);
    const defaultOption = options.find(option => option.value === defaultValue);
    const [inputValue, setInputValue] = useState(defaultValue && defaultOption ? defaultOption.label : '');
    const [searchValue, setSearchValue] = useState('');
    const [skipSelected, setSkipSelected] =
        useState(skipOption && defaultValue ? defaultValue === skipOption.value : false);
    const [autoFocus, setAutofocus] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const id = useMemo(uuid, []);
    const filteredOptions = options.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase()));

    useEffect(() => {
        // @ts-ignore: MouseEvent type persisting error
        document.addEventListener('mouseup', handleClickOutside);

        return () => {
            // @ts-ignore: MouseEvent type persisting error
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [open]);

    const handleClick = (esc: boolean = false) => {
        const checkSearchValue = options.find(option => option.label === inputValue);
        if (esc) {
            !checkSearchValue && setInputValue('');
            setSearchValue('');
            inputRef.current && inputRef.current.focus();
            setOpen(false);
        } else if (!open) {
            setFocus(true);
            if (searchable) inputRef.current && inputRef.current.focus();
            setOpen(!open);
        } else if (!searchable && open) {
            checkSearchValue && setSearchValue('');
            inputRef.current && inputRef.current.focus();
            setOpen(!open);
        } else {
            checkSearchValue && setSearchValue('');
            inputRef.current && inputRef.current.focus();
            setOpen(!open);
        }
    };

    const handleChange = (option: Option): void => {
        setInputValue(option.label);
        setOpen(false);
        setFocus(false);
        setSearchValue('');
        setSkipSelected(false);
        onChange && onChange(option);
        searchable && setAutofocus(false);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setSearchValue(event.target.value);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 40 || event.keyCode === 38) {
            open && setAutofocus(true);
        } else if (event.keyCode === 13) {
            event.preventDefault();
            handleClick();
        } else if (event.keyCode === 27) {
            handleClick(true);
        }
    };

    const handleClickOutside = (event: MouseEvent): void => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            if (open) {
                const checkSearchValue = options.find(option => option.label === inputValue);
                checkSearchValue && setSearchValue('');
                inputRef.current && inputRef.current.blur();
                setOpen(!open);
            }
            setFocus(false);
        }
    };

    const handleSkipChange = () => {
        if (!skipSelected) {
            setSkipSelected(true);
            setInputValue('');
        }
    };

    return (
        <>
            <StyledFieldContainer
                fieldId={id}
                label={label}
                valid={valid}
                validationErrorMessage={validationErrorMessage}
            >
                <InputWrapper
                    disabled={disabled}
                    focus={focus}
                    onClick={disabled ? undefined : ()  => handleClick(false)}
                    ref={wrapperRef}
                    valid={valid}
                >
                    <StyledInput
                        disabled={disabled}
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        name={name}
                        onBlur={() => setFocus(false)}
                        onChange={handleInputChange}
                        onFocus={() => setFocus(true)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        required={true}
                        searchable={searchable}
                    />
                    <Icon name={open ? 'chevronUp' : 'chevronDown'}/>
                </InputWrapper>
                <ListWrapper open={open}>
                    <List
                        autofocus={searchable ? autoFocus : open}
                        ListId={id}
                        numberOfItemsVisible={numberOfItemsVisible}
                        checkIndicator
                        defaultValue={defaultValue}
                        options={filteredOptions}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </ListWrapper>
            </StyledFieldContainer>
            {skipOption && (
                <ChooseInput
                    groupName={`${id}_skip`}
                    onChange={handleSkipChange}
                    checked={skipSelected}
                    data-testid="select-skip-option"
                    type="radio"
                    value={skipOption.value}
                >
                    {skipOption.label}
                </ChooseInput>
            )}
        </>
    );
};
