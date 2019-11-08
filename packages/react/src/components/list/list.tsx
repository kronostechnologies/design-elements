import React, { KeyboardEvent, ReactElement, useState } from 'react';

import Check from 'feather-icons/dist/icons/check.svg';
import styled from 'styled-components';

export interface Option {
    value: string;
    // Option label, if not provided will be set with value
    label?: string;
}

interface ListProps {
    options: Option[];
    /**
     * Display check indicator on the selected option
     * @default false
     */
    checkIndicator?: boolean;
    /**
     * The default selected option
     */
    defaultValue?: string;
    /**
     * Number of visible items in the list before overflow
     * @default 4
     */
    numberOfItemsVisible?: number;
    /**
     * OnChange callback function, invoked when an option is selected
     */
    onChange?(option: Option): void;
}

interface WrapperProps {
    numberOfItemsVisible: number;
}

interface ItemProps {
    selected: boolean;
    checkIndicator: boolean;
}

const itemHeight = 32;

const Wrapper = styled.ul<WrapperProps>`
  background-color: #fff;
  list-style-type: none;
  margin: 0;
  max-height: ${({ numberOfItemsVisible }) => numberOfItemsVisible * itemHeight}px;
  min-width: 200px;
  overflow-y: auto;
  padding: 0;
  width: 100%;
`;

const Item = styled.li<ItemProps>`
  color: #000;
  cursor: pointer;
  font-size: 0.875rem;
  height: ${itemHeight}px;
  line-height: ${itemHeight}px;
  overflow: hidden;
  padding: 0 ${({ checkIndicator, selected }) => (checkIndicator ? (selected ? 0 : 28) : 16)}px;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover,
  &:focus {
    background-color: #d9dde2;
  }
`;

const CheckIndicator = styled(Check)`
  color: #637282;
  height: 12px;
  padding: 0 8px;
  width: 12px;
`;

export function List({
    options,
    onChange,
    checkIndicator = false,
    defaultValue,
    numberOfItemsVisible = 4,
}: ListProps): ReactElement {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);

    function isOptionSelected({ value }: Option): boolean {
        return value === selectedValue;
    }

    function shouldDisplayCheckIndicator(option: Option): boolean {
        return checkIndicator && isOptionSelected(option);
    }

    function selectOption(option: Option): void {
        setSelectedValue(option.value);

        if (onChange) {
            onChange(option);
        }
    }

    function handleSelect(option: Option): () => void {
        return () => selectOption(option);
    }

    function handleKeyDown(option: Option): (e: KeyboardEvent<HTMLLIElement>) => void {
        return (e: KeyboardEvent<HTMLLIElement>) => {
            if (e.keyCode === 13) {
                selectOption(option);
            }
        };
    }

    return (
        <Wrapper role="listbox" numberOfItemsVisible={numberOfItemsVisible}>
            {options.map((option, index) => (
                <Item
                    key={`${option.value}-${index}`}
                    role="option"
                    aria-label={option.label || option.value}
                    onClick={handleSelect(option)}
                    onKeyDown={handleKeyDown(option)}
                    selected={isOptionSelected(option)}
                    tabIndex={0}
                    checkIndicator={checkIndicator}
                >
                    <>
                        {shouldDisplayCheckIndicator(option) && <CheckIndicator />}
                        {option.label || option.value}
                    </>
                </Item>
            ))}
        </Wrapper>
    );
}
