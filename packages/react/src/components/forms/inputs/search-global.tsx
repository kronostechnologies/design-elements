import React, { ReactElement } from 'react';

import { SearchInput } from './search-input';

interface SearchInputProps {
    disabled?: boolean;
    initialValue?: string;
    label?: string;
    placeholder?: string;

    onSearch?(value: string): void;
}

export function SearchGlobal({ disabled, initialValue, label, onSearch, placeholder }: SearchInputProps): ReactElement {
    return (
        <SearchInput
            disabled={disabled}
            hasButton
            initialValue={initialValue}
            label={label}
            onSearch={onSearch}
            placeholder={placeholder}
        />
    );
}
