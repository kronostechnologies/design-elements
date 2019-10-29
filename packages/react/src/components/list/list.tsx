import React, { KeyboardEvent, ReactElement, useState } from 'react';

import Check from 'feather-icons/dist/icons/check.svg';
import styled from 'styled-components';

interface Option {
    /**
     * Option value
     */
    value: string;
    /**
     * Option label, if not provided will be set with value
     */
    label?: string;
}

interface ListProps {
    /**
     * Array of options
     */
    options: Option[];
    /**
     * With/without check indicator on the selected option
     * @default false
     */
    withCheck?: boolean;
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
    withCheck: boolean;
}

const itemHeight = 32;

const Wrapper = styled.ul<WrapperProps>`
    width: 100%;
    min-width: 200px;
    border-radius: 4px;
    overflow: hidden;
    list-style-type: none;
    background-color: #fff;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.19);
    margin: 0;
    padding: 0;
    max-height: ${({ numberOfItemsVisible }) => numberOfItemsVisible * itemHeight}px;
    overflow-y: auto;
`;

const Item = styled.li<ItemProps>`
    height: ${itemHeight}px;
    line-height: ${itemHeight}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.875rem;
    padding: 0 ${({ withCheck, selected }) => (withCheck ? (selected ? 0 : 28) : 16)}px;
    cursor: pointer;

    &:hover,
    &:focus {
        background-color: #d9dde2;
    }
`;

const CheckIndicator = styled(Check)`
    color: #637282;
    width: 12px;
    height: 12px;
    padding: 0 8px;
`;

export function List({
    options,
    onChange,
    withCheck = false,
    defaultValue,
    numberOfItemsVisible = 4,
    ...props
}: ListProps): ReactElement {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);

    function isOptionSelected({ value }: Option): boolean {
        return value === selectedValue;
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
        <Wrapper role="listbox" numberOfItemsVisible={numberOfItemsVisible} {...props}>
            {options.map((option, index) => (
                <Item
                    key={index}
                    role="option"
                    aria-label={option.label || option.value}
                    onClick={handleSelect(option)}
                    onKeyDown={handleKeyDown(option)}
                    selected={isOptionSelected(option)}
                    tabIndex={0}
                    withCheck={withCheck}
                >
                    <>
                        {withCheck && isOptionSelected(option) && <CheckIndicator />}
                        {option.label || option.value}
                    </>
                </Item>
            ))}
        </Wrapper>
    );
}
