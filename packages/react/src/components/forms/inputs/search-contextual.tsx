import React, { ChangeEvent, ReactElement } from 'react';
import { SearchInput  } from './search-input';

interface SearchInputProps {
    disabled?: boolean;
    label?: string;
    placeholder?: string;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export function SearchContextual({ disabled, label, onChange, placeholder }: SearchInputProps): ReactElement {
    return (
        <SearchInput
            disabled={disabled}
            label={label}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}
