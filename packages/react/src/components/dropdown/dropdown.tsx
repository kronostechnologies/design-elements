import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { Icon } from '../icon//icon';
import { List } from '../list/list';
import { Theme } from '../theme-wrapper/theme-wrapper';

interface InputWrapperProps {
    disabled?: boolean;
    focus?: boolean;
    theme: Theme;
}

const InputWrapper = styled.div<InputWrapperProps>`
  align-items: center;
  background-color: ${props => props.disabled ? props.theme.greys['light-grey'] : props.theme.greys.white};
  border: 1px solid ${props => props.focus ? props.theme.main['primary-1.1'] : props.theme.greys.grey};
  border-radius: 0.25rem;
  box-sizing: border-box;
  display: flex;
  height: 32px;
  justify-content: space-between;
  padding: 0.5rem;
  width: 100%;

  svg {
    color: ${props => props.disabled ? props.theme.greys['mid-grey'] : props.theme.greys['dark-grey']};
  }
`;

const StyledInput = styled.input`
  background-color: ${props => props.disabled ? props.theme.greys['light-grey'] : props.theme.greys.white};
  border: none;
  font-size: calc(1rem - 2px);
  width: 100%;

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

  ul {
    border-radius: 0.25rem;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.19);
    outline: none;
  }
`;

const options = [
    {
        label: 'Option A',
        value: 'optionA',
    },
    {
        label: 'Option B',
        value: 'optionB',
    },
    {
        label: 'Option C',
        value: 'optionC',
    },
    {
        label: 'Option D',
        value: 'optionD',
    },
];

interface DropdownProps {
    disabled?: boolean;
}

export const Dropdown = ({ disabled }: DropdownProps) => {
    const [focus, setFocus] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        setOpen(!open);
        if (!open) {
            setFocus(true);
        } else setFocus(false);
    };

    const handleChange = (option: any) => {
        setValue(option.label);
        setOpen(!open);
        setFocus(!focus);
    };

    return (
        <>
            <InputWrapper onClick={disabled ? undefined : handleClick} focus={focus} disabled={disabled}>
                <StyledInput
                    disabled={disabled}
                    ref={inputRef}
                    type="text"
                    value={value}
                    placeholder="Select an option"
                    readOnly
                />
                <Icon name={open ? 'chevronUp' : 'chevronDown'} />
            </InputWrapper>
            <ListWrapper open={open}>
                <List
                    options={options}
                    onChange={handleChange}
                />
            </ListWrapper>
        </>
    );
};
