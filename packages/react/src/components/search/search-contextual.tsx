import React, { ChangeEvent, ReactElement } from 'react';
import { SearchInput } from './search-input';

interface SearchInputProps {
    disabled?: boolean;
    initialValue?: string;
    label?: string;
    placeholder?: string;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export function SearchContextual(
    { disabled, initialValue, label, onChange, placeholder }: SearchInputProps): ReactElement {
    return (
        <SearchInput
            disabled={disabled}
            initialValue={initialValue}
            label={label}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}
