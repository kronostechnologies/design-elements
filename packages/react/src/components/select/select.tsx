import React, { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';

import { ChooseInput } from '../choose-input/choose-input';
import { FieldContainer } from '../field-container/field-container';
import { Icon } from '../icon/icon';
import { List } from '../list/list';
import { Theme } from '../theme-wrapper/theme-wrapper';

interface Option {
    label: string;
    value: string;
}

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
    border: 1px solid ${props => props.valid ? props.focus ? props.theme.main['primary-1.1'] : props.theme.greys.grey : props.theme.notifications['error-2.1']};
    border-radius: 0.25rem;
    box-sizing: border-box;
    display: flex;
    height: 32px;
    justify-content: space-between;
    margin-top: 8px;
    padding: 0.5rem;
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
    font-size: calc(1rem - 2px);
    letter-spacing: 0.4px;
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
    numberOfItemsVisible,
    placeholder = 'Select an option',
    searchable,
    skipOption,
    valid = true,
    validationErrorMessage = 'You must select an option',
}: SelectProps) => {
    const [focus, setFocus] = useState(false);
    const [open, setOpen] = useState(false);
    const defaultOption = options.filter(option => option.value === defaultValue);
    const [value, setValue] = useState(defaultValue && defaultOption.length > 0 ? defaultOption[0].label : '');
    const [searchValue, setSearchValue] = useState('');
    const [skipSelected, setSkipSelected] =
        useState(skipOption && defaultValue ? defaultValue === skipOption.value : false);
    const [autoFocus, setAutofocus] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const id = uuid();
    const ListOptions = options.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase()));

    useEffect(() => {
        // @ts-ignore
        document.addEventListener('mouseup', handleClickOutside);

        return () => {
            // @ts-ignore
            document.removeEventListener('mouseup', handleClickOutside);
        };
    });

    const handleClick = () => {
        setOpen(!open);
        if (!open) {
            setFocus(true);
            if (searchable) {
                inputRef.current && inputRef.current.focus();
            }
        } else {
            const checkValue = options.filter(option => option.label === value);
            checkValue.length <= 0 && setValue('');
            inputRef.current && inputRef.current.blur();
            setFocus(false);
            setSearchValue('');
        }
    };

    const handleChange = (option: Option): void => {
        setValue(option.label);
        setOpen(false);
        setFocus(false);
        setSearchValue('');
        setSkipSelected(false);
        onChange && onChange(option);
        searchable && setAutofocus(false);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        setSearchValue(event.target.value);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!searchable) event.preventDefault();
        if (event.keyCode === 40 || event.keyCode === 38) {
            setAutofocus(!autoFocus);
        }
        if (event.keyCode === 9 || event.keyCode === 13) {
            handleClick();
        }
    };

    const handleClickOutside = (event: MouseEvent): void => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            if (open) {
                const testValue = options.filter(option => option.label === value);
                testValue.length <= 0 && setValue('');
                inputRef.current && inputRef.current.blur();
                setFocus(false);
                setOpen(false);
                setSearchValue('');
            }
        }
    };

    const handleSkipChange = () => {
        if (!skipSelected) {
            setSkipSelected(true);
            setValue('');
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
                    onClick={disabled ? undefined : handleClick}
                    ref={wrapperRef}
                    valid={valid}
                >
                    <StyledInput
                        disabled={disabled}
                        ref={inputRef}
                        type="text"
                        value={value}
                        name={name}
                        onChange={handleInputChange}
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
                        numberOfItemsVisible={numberOfItemsVisible ? numberOfItemsVisible : undefined}
                        checkIndicator
                        defaultValue={defaultValue}
                        options={searchable ? ListOptions : options}
                        onChange={handleChange}
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
