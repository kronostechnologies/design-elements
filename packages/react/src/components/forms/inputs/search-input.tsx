import SearchIcon from 'feather-icons/dist/icons/search.svg';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import XIcon from 'feather-icons/dist/icons/x.svg';

import { VisuallyHidden } from '../../a11y/visuallyhidden';
import { SearchButton } from '../../buttons/search-button';

import { Label } from '../label';
import { inputsStyle } from '../styles/inputs';

const SearchWrapper = styled.div`
  display: flex;

  label {
    bottom: 0.5rem;
    color: rgb(99, 114, 130);
    display: inline-block;
    height: 1rem;
    left: 0.5rem;
    margin: auto;
    position: absolute;
    top: 0.5rem;
    width: 1rem;
  }
`;

const InnerWrapper = styled.div`
  flex: 1 1 auto;
  position: relative;
`;

type IcoSearchProps = Pick<SearchInputProps, 'disabled'>;
const IcoSearch = styled(SearchIcon)`
  color: ${(props: IcoSearchProps) => (props.disabled ? 'rgb(156, 167, 180)' : 'rgb(99, 114, 130)')};
  height: 1rem;
  width: 1rem;
`;

const IcoReset = styled(XIcon)`
  color: black;
  height: 0.75rem;
  width: 0.75rem;
`;

const Input = styled.input`
  ${inputsStyle} /* Must be the first rule */
  border-radius: ${(props: SearchInputProps) => (props.hasButton && '0.25rem 0 0 0.25rem')};
  line-height: 1;
  padding: 0.5rem 1.75rem 0.5rem 2rem;

  label + & {
    margin-top: 0;
  }

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;

const Reset = styled.button`
  appearance: none;
  background: transparent;
  border: 0;
  bottom: 0.5rem;
  cursor: pointer;
  display: none;
  height: 0.75rem;
  margin: auto;
  padding: 0;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  width: 0.75rem;

  input:valid + & {
    display: inline-block;
  }
`;

const SearchSubmit = styled(SearchButton)`
  border-left: 0;
  border-radius: 0 0.25rem 0.25rem 0;
  position: relative;
`;

export interface SearchInputProps {
    disabled?: boolean;
    hasButton?: boolean;
    label?: string;
    initialValue?: string;
    placeholder?: string;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;

    onSearch?(value: string): void;
}

export const SearchInput = ({ initialValue, onChange, onSearch, ...props }: SearchInputProps) => {
    const [{ value }, setValue] = useState({ value: initialValue || '' });
    const id = uuid();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        setValue({ value: newValue });

        if (onChange) {
            onChange(event);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (onSearch && event.keyCode === 13) {
            onSearch(value);
        }
    };

    const handleReset = () => {
        setValue({ value: '' });
    };

    const handleSearchButtonClick = () => {
        if (onSearch) {
            onSearch(value);
        }
    };

    const { disabled, hasButton, label, placeholder } = props;

    return (
        <SearchWrapper>
            <InnerWrapper>
                <Label forId={id}>
                    <IcoSearch disabled={disabled} />
                    <VisuallyHidden>{label}</VisuallyHidden>
                </Label>

                <Input
                    autoComplete="on"
                    disabled={disabled}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    hasButton={hasButton}
                    id={id}
                    placeholder={placeholder}
                    type="search"
                    value={value}
                />

                <Reset data-testid="resetButton" onClick={handleReset}>
                    <IcoReset />
                    <VisuallyHidden>Reset</VisuallyHidden>
                </Reset>
            </InnerWrapper>
            {
                hasButton &&
                (
                    <SearchSubmit
                        disabled={disabled}
                        className="primary"
                        label={label}
                        onClick={handleSearchButtonClick}
                    />
                )
            }
        </SearchWrapper>
    );
};
